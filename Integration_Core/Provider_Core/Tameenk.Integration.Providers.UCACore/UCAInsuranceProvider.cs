using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Tameenk.Core;
using Tameenk.Core.Configuration;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities.Policies;
using Tameenk.Core.Infrastructure;
using Tameenk.Integration.Core.Providers;
using Tameenk.Integration.Core.Providers.Configuration;
using Tameenk.Integration.Dto.Providers;
using Tameenk.Loggin.DAL;
using Tameenk.Services;
using Tameenk.Services.Core.Http;
using Tameenk.Services.Logging;

namespace Tameenk.Integration.Providers.UCA
{
    public class UCAInsuranceProvider : RestfulInsuranceProvider
    {

        #region Fields
        private readonly IQuotationConfig _quotationConfig;
        private readonly IHttpClient _httpClient;
        private readonly HttpClient httpClient;
        private readonly string _accessTokenBase64;
        private readonly RestfulConfiguration _restfulConfiguration;
        private const string QUOTATION_TPL_URL = "https://localhost:7267/tameenk/v1/api/Quotation";// "http://5.149.133.237:8081/tameenk/v1/api/Quotation";
        private const string QUOTATION_COMPREHENSIVE_URL = "https://localhost:7267/tameenk/v1/api/Quotation";// "http://5.149.133.237:8081/tameenk/v1/api/Quotation";
        private readonly IRepository<PolicyProcessingQueue> _policyProcessingQueueRepository;
        private string _accessTokenForQuotePolicy = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(@"M2MTameenkAppian:TY8xuA_\{((3H(bv~8%/?,Ad"));
        #endregion
        public UCAInsuranceProvider(IQuotationConfig quotationConfig, IRepository<PolicyProcessingQueue> policyProcessingQueueRepository)
             : base(quotationConfig, new RestfulConfiguration
             {
                 GenerateQuotationUrl = "",
                 GeneratePolicyUrl = "http://5.149.133.237:8081/tameenk/v1/api/Policy",
                 SchedulePolicyUrl = "http://212.100.209.210:9090/ords/aman_api/motor/TameenkAgg/PolicyProfile",
                 GenerateClaimRegistrationUrl = "",
                 GenerateClaimNotificationUrl = "",
                 CancelPolicyUrl = "",
                 AccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlNWRlMTc0NS1kOTY3LTQ0MTEtOGM0MC0wNzc3MDEwMTgwYjAifQ.Tw8eSlcw67dsM9u-udP3cZvxhoGPnhxSzGPiGCSQyNE",
                 ProviderName = "UCA"
             }, policyProcessingQueueRepository)
        {
            _restfulConfiguration = Configuration as RestfulConfiguration;
            _accessTokenBase64 = string.IsNullOrWhiteSpace(_restfulConfiguration.AccessToken) ?
                  null : _restfulConfiguration.AccessToken;
            _quotationConfig = quotationConfig;
            _policyProcessingQueueRepository = policyProcessingQueueRepository;
            httpClient =new HttpClient();

        }
        protected override async Task<object> ExecuteQuotationRequest(QuotationServiceRequest quotation, ServiceRequestLog predefinedLogInfo)
        {
            var configuration = Configuration as RestfulConfiguration;
            //change the quotation url to tpl in case product type code = 1
            if (quotation.ProductTypeCode == 1)
            {
                configuration.GenerateQuotationUrl = QUOTATION_TPL_URL;
            }
            else
            {
                configuration.GenerateQuotationUrl = QUOTATION_COMPREHENSIVE_URL;
            }

            return base.ExecuteQuotationRequest(quotation, predefinedLogInfo);
        }

        protected override QuotationServiceRequest HandleQuotationRequestObjectMapping(QuotationServiceRequest quotation)
        {
            if (!quotation.VehicleEngineSizeCode.HasValue || quotation.VehicleEngineSizeCode.Value == 0)
                quotation.VehicleEngineSizeCode = 1;

            return quotation;
        }
        protected override async Task<ServiceOutput> SubmitQuotationRequest(QuotationServiceRequest quotation, ServiceRequestLog log)
        {
            ServiceOutput output = new ServiceOutput();
            log.ReferenceId = quotation.ReferenceId;
            if (string.IsNullOrEmpty(log.Channel))
                log.Channel = "Portal";
            log.ServiceURL = _restfulConfiguration.GenerateQuotationUrl;
            log.ServerIP = Tameenk.Core.ServicesUtilities.GetServerIP();
            log.Method = "Quotation";
            log.CompanyName = _restfulConfiguration.ProviderName;

            log.VehicleMaker = quotation?.VehicleMaker;
            log.VehicleMakerCode = quotation?.VehicleMakerCode;
            log.VehicleModel = quotation?.VehicleModel;
            log.VehicleModelCode = quotation?.VehicleModelCode;
            log.VehicleModelYear = quotation?.VehicleModelYear;
            DateTime dtBeforeCalling = DateTime.Now;
            var stringPayload = string.Empty;
            try
            {
                var testMode = _quotationConfig.TestMode;
                if (testMode)
                {
                    const string nameOfFile = ".TestData.quotationTestData.json";
                    string responseData = ReadResource(GetType().Namespace, nameOfFile);
                    HttpResponseMessage message = new HttpResponseMessage();
                    message.Content = new StringContent(responseData);
                    message.StatusCode = System.Net.HttpStatusCode.OK;
                    output.Output = message;
                    output.ErrorCode = ServiceOutput.ErrorCodes.Success;
                    output.ErrorDescription = "Success";
                    return output;
                }

                if (quotation.ProductTypeCode == 1)
                    quotation.DeductibleValue = null;

                log.ServiceRequest = JsonConvert.SerializeObject(quotation);
                dtBeforeCalling = DateTime.Now;
                //var postTask = httpClient.PostAsync(_restfulConfiguration.GenerateQuotationUrl, quotation, _accessTokenForQuotePolicy, authorizationMethod: "Basic");
                //postTask.Wait();
                //response = postTask.Result;
                var requestContent = new StringContent(JsonConvert.SerializeObject(quotation), Encoding.UTF8, "application/json");
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", _accessTokenBase64);
                var postTask = httpClient.PostAsync(_restfulConfiguration.GenerateQuotationUrl, requestContent);
                Task<HttpResponseMessage> response = postTask;
                DateTime dtAfterCalling = DateTime.Now;
                log.ServiceResponseTimeInSeconds = dtAfterCalling.Subtract(dtBeforeCalling).TotalSeconds;
                if (response == null)
                {
                    output.ErrorCode = ServiceOutput.ErrorCodes.NullResponse;
                    output.ErrorDescription = "Service return null";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (response.Result.Content == null)
                {
                    output.ErrorCode = ServiceOutput.ErrorCodes.NullResponse;
                    output.ErrorDescription = "Service response content return null";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (string.IsNullOrEmpty(response.Result.Content.ReadAsStringAsync().Result))
                {
                    output.ErrorCode = ServiceOutput.ErrorCodes.NullResponse;
                    output.ErrorDescription = "Service response content result return null";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                log.ServiceResponse = response.Result.Content.ReadAsStringAsync().Result;
                var quotationServiceResponse = JsonConvert.DeserializeObject<QuotationServiceResponse>(response.Result.Content.ReadAsStringAsync().Result);
                if (quotationServiceResponse != null && quotationServiceResponse.Products == null && quotationServiceResponse.Errors != null)
                {
                    StringBuilder servcieErrors = new StringBuilder();
                    StringBuilder servcieErrorsCodes = new StringBuilder();

                    foreach (var error in quotationServiceResponse.Errors)
                    {
                        servcieErrors.AppendLine("Error Code: " + error.Code + " and the error message : " + error.Message);
                        servcieErrorsCodes.AppendLine(error.Code);

                    }

                    output.ErrorCode = ServiceOutput.ErrorCodes.ServiceError;
                    output.ErrorDescription = "Quotation Service response error is : " + servcieErrors.ToString();
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = servcieErrorsCodes.ToString();
                    log.ServiceErrorDescription = servcieErrors.ToString();
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                output.Output = response.Result.Content.ReadAsStringAsync().Result;
                output.ErrorCode = ServiceOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = output.ErrorDescription;
                log.ServiceErrorCode = log.ErrorCode.ToString();
                log.ServiceErrorDescription = log.ServiceErrorDescription;
                //log.ServiceResponse = response.Content.ReadAsStringAsync().Result;
                //ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
            catch (Exception ex)
            {
                output.ErrorCode = ServiceOutput.ErrorCodes.ServiceException;
                output.ErrorDescription = ex.ToString();
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = output.ErrorDescription;
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
        }

        protected override object ExecuteAutoleasingQuotationRequest(QuotationServiceRequest quotation, ServiceRequestLog predefinedLogInfo)
        {
            var configuration = Configuration as RestfulConfiguration;
            configuration.GenerateQuotationUrl = QUOTATION_COMPREHENSIVE_URL;
            return base.ExecuteAutoleasingQuotationRequest(quotation, predefinedLogInfo);
        }
        protected override ServiceOutput SubmitPolicyRequest(PolicyRequest policy, ServiceRequestLog log)
        {
            ServiceOutput output = new ServiceOutput();

            log.ReferenceId = policy.ReferenceId;
            log.Channel = "Portal";
            log.ServiceURL = _restfulConfiguration.GeneratePolicyUrl;
            log.ServiceRequest = JsonConvert.SerializeObject(policy);
            log.ServerIP = ServicesUtilities.GetServerIP();
            log.Method = "Policy";
            log.CompanyName = _restfulConfiguration.ProviderName;
            var stringPayload = string.Empty;
            var request = _policyProcessingQueueRepository.Table.Where(a => a.ReferenceId == policy.ReferenceId).FirstOrDefault();
            if (request != null)
            {
                request.RequestID = log.RequestId;
                request.CompanyName = log.CompanyName;
                request.CompanyID = log.CompanyID;
                request.InsuranceTypeCode = log.InsuranceTypeCode;
                request.DriverNin = log.DriverNin;
                request.VehicleId = log.VehicleId;
                request.ServiceRequest = log.ServiceRequest;
            }
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var testMode = _quotationConfig.TestMode; //_tameenkConfig.Policy.TestMode; by Atheer 
                if (testMode)
                {
                    const string nameOfFile = ".TestData.policyTestData.json";

                    string responseData = ReadResource(GetType().Namespace, nameOfFile);
                    HttpResponseMessage message = new HttpResponseMessage();
                    message.Content = new StringContent(responseData);
                    message.StatusCode = System.Net.HttpStatusCode.OK;
                    output.Output = message;
                    output.ErrorCode = ServiceOutput.ErrorCodes.Success;
                    output.ErrorDescription = "Success";

                    return output;
                }

                stringPayload = JsonConvert.SerializeObject(policy);
                var httpContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


                DateTime dtBeforeCalling = DateTime.Now;
                //var client = new HttpClient();
                //client.Timeout = TimeSpan.FromMinutes(4);
                //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _accessTokenBase64);
                //var postTask = client.PostAsync(_restfulConfiguration.GeneratePolicyUrl, httpContent);
                var postTask = _httpClient.PostAsync(_restfulConfiguration.GeneratePolicyUrl, httpContent, _accessTokenForQuotePolicy, authorizationMethod: "Basic");

                postTask.Wait();

                response = postTask.Result;
                DateTime dtAfterCalling = DateTime.Now;
                log.ServiceResponseTimeInSeconds = dtAfterCalling.Subtract(dtBeforeCalling).TotalSeconds;
                if (response == null)
                {
                    //update policyProcessingQueue Table;
                    if (request != null)
                    {
                        request.ErrorDescription = " service Return null";
                        _policyProcessingQueueRepository.UpdateAsync(request).Wait();
                    }
                    output.ErrorCode = ServiceOutput.ErrorCodes.NullResponse;
                    output.ErrorDescription = "Service return null";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (response.Content == null)
                {
                    if (request != null)
                    {
                        request.ErrorDescription = " service response content return null";
                        _policyProcessingQueueRepository.UpdateAsync(request).Wait();
                    }
                    output.ErrorCode = ServiceOutput.ErrorCodes.NullResponse;
                    output.ErrorDescription = "Service response content return null";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (string.IsNullOrEmpty(response.Content.ReadAsStringAsync().Result))
                {
                    if (request != null)
                    {
                        request.ErrorDescription = " Service response content result return null";
                        _policyProcessingQueueRepository.UpdateAsync(request).Wait();
                    }
                    output.ErrorCode = ServiceOutput.ErrorCodes.NullResponse;
                    output.ErrorDescription = "Service response content result return null";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                log.ServiceResponse = response.Content.ReadAsStringAsync().Result;
                request.ServiceResponse = log.ServiceResponse;
                var policyServiceResponse = JsonConvert.DeserializeObject<PolicyResponse>(response.Content.ReadAsStringAsync().Result);
                if (policyServiceResponse != null && policyServiceResponse.Errors != null && policyServiceResponse.Errors.Count > 0)
                {
                    StringBuilder servcieErrors = new StringBuilder();
                    StringBuilder servcieErrorsCodes = new StringBuilder();

                    foreach (var error in policyServiceResponse.Errors)
                    {
                        servcieErrors.AppendLine("Error Code: " + error.Code + " and the error message : " + error.Message);
                        servcieErrorsCodes.AppendLine(error.Code);
                    }

                    output.ErrorCode = ServiceOutput.ErrorCodes.ServiceError;
                    output.ErrorDescription = "Policy Service response error is : " + servcieErrors.ToString();
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = servcieErrorsCodes.ToString();
                    log.ServiceErrorDescription = servcieErrors.ToString();
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    if (request != null)
                    {
                        request.ErrorDescription = output.ErrorDescription;
                        _policyProcessingQueueRepository.UpdateAsync(request).Wait();
                    }

                    return output;
                }
                if (string.IsNullOrEmpty(policyServiceResponse.PolicyNo))
                {
                    output.ErrorCode = ServiceOutput.ErrorCodes.ServiceError;
                    output.ErrorDescription = "No  PolicyNo returned from company";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    if (request != null)
                    {
                        request.ErrorDescription = output.ErrorDescription;
                        _policyProcessingQueueRepository.UpdateAsync(request).Wait();
                    }
                    return output;
                }
                if (policyServiceResponse.PolicyNo.ToLower() == "null")
                {
                    output.ErrorCode = ServiceOutput.ErrorCodes.ServiceError;
                    output.ErrorDescription = "PolicyNo returned from company as null";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    if (request != null)
                    {
                        request.ErrorDescription = output.ErrorDescription;
                        _policyProcessingQueueRepository.UpdateAsync(request).Wait();
                    }
                    return output;
                }
                output.Output = response;
                output.ErrorCode = ServiceOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                log.PolicyNo = policyServiceResponse.PolicyNo;
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = output.ErrorDescription;
                log.ServiceErrorCode = log.ErrorCode.ToString();
                log.ServiceErrorDescription = log.ServiceErrorDescription;
                if (request != null)
                {
                    request.ErrorDescription = output.ErrorDescription;
                    _policyProcessingQueueRepository.UpdateAsync(request).Wait();
                }
                ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return output;

            }
            catch (Exception ex)
            {
                output.ErrorCode = ServiceOutput.ErrorCodes.ServiceException;
                output.ErrorDescription = ex.GetBaseException().ToString();
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = output.ErrorDescription;

                ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);

                if (request != null)
                {
                    request.ErrorDescription = output.ErrorDescription;
                    _policyProcessingQueueRepository.UpdateAsync(request).Wait();
                }

                return output;


            }
        }

        protected override QuotationServiceResponse GetQuotationResponseObject(object response, QuotationServiceRequest request)
        {
            QuotationServiceResponse responseValue = new QuotationServiceResponse();
            try
            {
                if (response == null)
                    return null;


                var task = response as Task<object>;
                var httpResponseMessage = task.Result;
                var json = httpResponseMessage.ToString();
                responseValue = JsonConvert.DeserializeObject<QuotationServiceResponse>(json);
                if (responseValue != null && responseValue.Products != null)
                {
                    foreach (var product in responseValue.Products)
                    {
                        if (product != null && product.Benefits != null)
                        {
                            foreach (var benefit in product.Benefits)
                            {
                                if (benefit.BenefitPrice == 0)// added as per waleed 
                                {
                                    benefit.IsReadOnly = true;
                                    benefit.IsSelected = true;
                                }
                            }
                        }
                    }
                }
                return responseValue;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
