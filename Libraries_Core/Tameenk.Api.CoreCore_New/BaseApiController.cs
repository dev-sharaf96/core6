using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Runtime.Serialization;
using Tameenk.Api.Core.ActionResults;
using Tameenk.Api.Core.Attributes;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Configuration;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.Core.Http;
using Tameenk.Services.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Http;

namespace Tameenk.Api.Core
{
    [WebApiLanguage]
    //[IpAddressAuthorize]
    //[ClaimsAuthorize(ClaimTypes.Name, "Anonymous")]
    [Authorize]
    public abstract class BaseApiController : ControllerBase
    {
        public BaseApiController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        //private ILogger _logger; By Atheer
        private IHttpClient _httpClient;
        private string _accessToken;
        private TameenkConfig _config;
        private readonly IHttpContextAccessor _httpContextAccessor;

        [NonAction]
        public RawJsonActionResult Ok<T>(T content, int totalCount = 0)
        {
            return new RawJsonActionResult(new CommonResponseModel<T>(content, totalCount).Serialize());
        }
        public IActionResult Single(object result)
        {
            return base.Ok(result);
        }

        [NonAction]
        public RawJsonActionResult Error(IEnumerable<ErrorModel> errors, HttpStatusCode httpStatusCode = HttpStatusCode.BadRequest)
        {
            var commonModel = new CommonResponseModel<bool>(false);
            commonModel.Errors = errors;
            return new RawJsonActionResult(commonModel.Serialize(), httpStatusCode);
        }


        [NonAction]
        public RawJsonActionResult Error(ModelStateDictionary modelState, string errorMessage, HttpStatusCode httpStatusCode = HttpStatusCode.BadRequest)
        {
            TransalateModelStatePropertyName(modelState);
            var commonModel = new CommonResponseModel<ModelStateDictionary>(modelState);
            commonModel.Errors = new List<ErrorModel>() { new ErrorModel(errorMessage) };
            return new RawJsonActionResult(commonModel.Serialize(), httpStatusCode);
        }
        [NonAction]
        public RawJsonActionResult Error(IEnumerable<string> errors, HttpStatusCode httpStatusCode = HttpStatusCode.BadRequest)
        {
            return Error(errors.Select(e => new ErrorModel(e)), httpStatusCode);
        }

        [NonAction]
        public RawJsonActionResult Error(string error, HttpStatusCode httpStatusCode = HttpStatusCode.BadRequest)
        {
            return Error(new List<string> { error }, httpStatusCode);
        }


        [NonAction]
        public RawJsonActionResult Error(Exception ex)
        {
            var logKey = $"api_{DateTime.Now.GetTimestamp()}";
          // Logger.Log($"Api error [Key={logKey}]", ex, LogLevel.Error);
            var error = new ErrorModel
            {
                Code = logKey,
                Description = ex.GetBaseException().Message
            };
            return Error(new List<ErrorModel> { error });
        }

        protected string AuthorizationToken
        {
            get
            {
                try
                {
                    string authorizationHeaderValue = Request.Headers["Authorization"];
                    // Check if the Authorization header is not null and starts with "Bearer "
                    if (string.IsNullOrWhiteSpace(_accessToken) && Request.Headers != null && string.IsNullOrEmpty(authorizationHeaderValue)
                         && authorizationHeaderValue.StartsWith("Bearer "))
                    {
                        // Extract the token part by removing "Bearer " prefix
                        string accessToken = authorizationHeaderValue.Substring("Bearer ".Length);
                        _accessToken = accessToken;
                    }
                    return _accessToken;

                }
                catch (Exception ex)
                {
                    var logId = DateTime.Now.GetTimestamp();
                    //_logger.Log($"Base api controller -> GetAccessToken [key={logId}]", ex); By Atheer
                    return "";
                }
            }
        }



        public class AccessTokenResult
        {
            [JsonProperty("access_token")]
            public string access_token { get; set; }
            [JsonProperty("expires_in")]
            public int expires_in { get; set; }


        }


        //public ILogger Logger
        //{
        //    get
        //    {
        //        _logger = _logger ?? EngineContext.Current.Resolve<ILogger>();
        //        return _logger;
        //    }
        //}By Atheer


        protected IHttpClient HttpClient
        {
            get
            {
                _httpClient = _httpClient ?? EngineContext.Current.Resolve<IHttpClient>();
                return _httpClient;
            }
        }


        protected TameenkConfig Config
        {
            get
            {
                _config = _config ?? EngineContext.Current.Resolve<TameenkConfig>();
                return _config;
            }
        }

        [NonAction]
        private void TransalateModelStatePropertyName(ModelStateDictionary modelState)
        {
            var httpQueryParams = _httpContextAccessor.HttpContext.Request.Query;
            var subParameterIssues = modelState.Keys
                                               .Where(s => s.Contains("."))
                                               .Where(s => modelState[s].Errors.Any())
                                               .GroupBy(s => s.Substring(0, s.IndexOf('.')))
                                               .ToDictionary(g => g.Key, g => g.ToArray());

            foreach (var parameter in httpQueryParams)
            {
                var argument = parameter.Value;

                if (subParameterIssues.ContainsKey(parameter.Key))
                {
                    var subProperties = subParameterIssues[parameter.Key];
                    foreach (var subProperty in subProperties)
                    {
                        var propName = subProperty.Substring(subProperty.IndexOf('.') + 1);
                        var propertyName = $"{subProperty.Split('.')[0]}.{GetPropertyName(propName, parameter.GetType())}";
                        if (!string.IsNullOrWhiteSpace(propertyName) && modelState[subProperty] != null)
                        {
                            if (modelState[propertyName] != null
                                && !subProperty.Equals(propertyName, StringComparison.Ordinal))
                            {
                                var modelErrors = modelState[subProperty].Errors.ToList();

                                modelState.Remove(subProperty);
                                // in case the name was not equal due to case senstivity
                                // the remove will remove modelState[propertyName]
                                if (modelState[propertyName] == null)
                                    modelState.Remove(propertyName);

                                foreach (var error in modelErrors)
                                {
                                    modelState[propertyName].Errors.Add(error);
                                }
                            }
                            else if (modelState[propertyName] == null)
                            {
                                modelState.AddModelError(propertyName, subProperty);
                                modelState.Remove(subProperty);
                            }
                        }
                    }
                }


            }


        }
        private string GetPropertyName(string propertyName, Type type)
        {
            string name = null;
            var parts = propertyName.Split('.');
            if (parts.Length < 1)
            {
                return null;
            }
            string arrayIndex = string.Empty;
            if (parts[0].Contains('['))
            {
                var arrayParts = parts[0].Split('[');
                parts[0] = arrayParts.FirstOrDefault();
                arrayIndex = $"[{arrayParts.LastOrDefault()}";
            }
            var parentProp = type.GetProperty(parts[0]);
            if (parentProp == null) { return propertyName; }
            name = $"{GetParameterName(parentProp)}{arrayIndex}";
            if (parts.Length > 1)
            {
                var childPorpName = GetPropertyName(parts[1], parentProp.PropertyType);
                return $"{name}.{childPorpName}";
            }
            return name;
        }
        private string GetParameterName(PropertyInfo property)
        {
            var dataMemberAttribute = property.GetCustomAttributes<DataMemberAttribute>().FirstOrDefault();
            if (dataMemberAttribute?.Name != null)
            {
                return dataMemberAttribute.Name;
            }

            var jsonProperty = property.GetCustomAttributes<JsonPropertyAttribute>().FirstOrDefault();
            if (jsonProperty?.PropertyName != null)
            {
                return jsonProperty.PropertyName;
            }

            return property.Name;
        }

        public RawJsonActionResult Error<T>(T content, int totalCount = 0)
        {
            return new RawJsonActionResult(new CommonResponseModel<T>(content, totalCount).Serialize());
        }
        public RawJsonActionResult Error2<T>(T content, int totalCount = 0)
        {
            return new RawJsonActionResult(new CommonResponseModel<T>(content, totalCount).Serialize(), HttpStatusCode.BadRequest);
        }

    }
}