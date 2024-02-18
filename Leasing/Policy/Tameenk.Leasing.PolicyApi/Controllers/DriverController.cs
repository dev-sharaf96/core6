using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Tameenk.Api.Core.Models;
using Tameenk.Common.Utilities;
using Tameenk.Security.Services;
using Microsoft.AspNet.Identity;
using Tameenk.Loggin.DAL;
using Newtonsoft.Json;
using Swashbuckle.Swagger.Annotations;
using Tameenk.Services.Inquiry.Components;
using Tameenk.Services.Policy.Components;
using Tameenk.Api.Core;
using Tameenk.Models.Checkout;
using Tameenk.Core.Domain.Enums;
using System.Globalization;
using Tameenk.Services.Checkout.Components;
using Tameenk.Resources.WebResources;

namespace Tameenk.Leasing.PolicyApi.Controllers
{
    public class DriverController : BaseApiController
    {
        private readonly IAutoleasingInquiryContext _autoleasingInquiryContext;
        private readonly IAuthorizationService _authorizationService;

        public DriverController(IAutoleasingInquiryContext autoleasingInquiryContext, IAuthorizationService authorizationService, ICheckoutContext checkoutContext)
        {
            _autoleasingInquiryContext = autoleasingInquiryContext;
            _authorizationService = authorizationService ?? throw new ArgumentNullException(nameof(authorizationService));
        }
        [HttpPost]
        [Route("api/Policy/adddriver")]
        public IHttpActionResult AddDriver([FromBody] AddDriverModel model)
        {
            Services.Inquiry.Components.AddDriverOutput output = new Services.Inquiry.Components.AddDriverOutput();
            LeasingAddDriverLog log = new LeasingAddDriverLog();
            log.PageName = "leasingAddDriver";
            log.MethodName = "AddLeasingDriver";
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServiceRequest = JsonConvert.SerializeObject(model);
            model.Channel = Channel.autoleasing;

            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                    currentUserId = User.Identity.GetUserId();
                log.UserID = currentUserId;
                LeasingAddDriverLogDataAccess.AddtoServiceRequestLogs(log);

                var result = _autoleasingInquiryContext.AddDriver(model, currentUserId, User.Identity.GetUserName(),true, false);
                if (result.ErrorCode != Services.Inquiry.Components.AddDriverOutput.ErrorCodes.Success)
                {
                    log.ErrorCode = (int)result.ErrorCode;
                    log.ErrorDescription = result.ErrorDescription;
                    LeasingAddDriverLogDataAccess.AddtoServiceRequestLogs(log);

                    output.ErrorCode = Services.Inquiry.Components.AddDriverOutput.ErrorCodes.ServiceException;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(model.Language));
                    return Error(result);
                }

                return Single(result);
            }
            catch (Exception ex)
            {
                output.ErrorCode = Services.Inquiry.Components.AddDriverOutput.ErrorCodes.ServiceException;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(model.Language));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                LeasingAddDriverLogDataAccess.AddtoServiceRequestLogs(log);
                return Error(output);
            }
        }
    }
}
