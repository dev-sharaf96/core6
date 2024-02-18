using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Tameenk.Api.Core;
using Tameenk.Services.Inquiry.Components;
using Tameenk.Security.Services;
using Tameenk.Loggin.DAL;
using Tameenk.Common.Utilities;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using Swashbuckle.Swagger.Annotations;
using Tameenk.Services.Checkout.Components;
using Tameenk.Models.Checkout;
using Tameenk.Core.Domain.Enums;
using System.Globalization;
using Tameenk.Resources.WebResources;
using Tameenk.Leasing.IdentityApi.Output;
using Tameenk.Loggin.DAL.Entities;
using Tameenk.Loggin.DAL.DAL;

namespace Tameenk.Leasing.PolicyApi.Controllers
{
    public class benefitController : BaseApiController
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IAutoleasingInquiryContext _autoleasingInquiryContext;
        public benefitController(IAutoleasingInquiryContext autoleasingInquiryContext, IAuthorizationService authorizationService,ICheckoutContext checkoutContext )
        {
            _autoleasingInquiryContext = autoleasingInquiryContext;
            _authorizationService = authorizationService ?? throw new ArgumentNullException(nameof(authorizationService));
        }
        
        [HttpPost]
        [Route("api/Policy/addBenefit")]
        public IHttpActionResult AddBenefit([FromBody] AddBenefitModel model, string lang)
        {
            Output<Services.Inquiry.Components.AddBenefitOutput> output = new Output<Services.Inquiry.Components.AddBenefitOutput>();
            output.Result = new Services.Inquiry.Components.AddBenefitOutput();

            model.Channel = Channel.Leasing;
            model.MethodName = "AddBenefit";

            LeasingAddBenefitLog log = new LeasingAddBenefitLog();
            log.MethodName = model.MethodName;
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServiceRequest = JsonConvert.SerializeObject(model);
        
            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                    currentUserId = User.Identity.GetUserId();
                log.UserID = currentUserId;

                _autoleasingInquiryContext.SetExistingRefPolicyModificationAsDeleted(model.ReferenceId, CheckoutProviderServicesCodes.PurchaseBenefit);
                var result = _autoleasingInquiryContext.AddBenefit(model, currentUserId, User.Identity.GetUserName(), leasing: true);
                if (result.ErrorCode != Services.Inquiry.Components.AddBenefitOutput.ErrorCodes.Success)
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = result.ErrorDescription;
                    output.ErrorCode = Output<Services.Inquiry.Components.AddBenefitOutput>.ErrorCodes.ServiceException;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    LeasingAddBenefitLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error(result);
                }
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                output.ErrorCode = Output<Services.Inquiry.Components.AddBenefitOutput>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                output.Result = result;
                LeasingAddBenefitLogDataAccess.AddtoServiceRequestLogs(log);
                return Single(output);
            }
            catch (Exception ex)
            {
                output.ErrorCode = Output<Services.Inquiry.Components.AddBenefitOutput>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                LeasingAddBenefitLogDataAccess.AddtoServiceRequestLogs(log);
                return Error(output);
            }
        }
    }
}
