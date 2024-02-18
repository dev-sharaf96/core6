using Microsoft.AspNet.Identity;
using System.Web.Http;
using Tameenk.Api.Core;
using Tameenk.Security.Services;
using Tameenk.Services.Core;
using Tameenk.Services.Implementation.Policies;
using Tameenk.Services.Policy.Components;
using Tameenk.Core.Domain.Enums;
using Tameenk.Services.Core.Leasing.Models;

namespace Tameenk.Leasing.PolicyApi.Controllers
{
    public class ClaimsController : BaseApiController
    {
        private readonly IAutoleaseContext _autoleaseContext;
        private readonly IAuthorizationService _authorizationService;
        private readonly IBankService _bankService;
        private readonly ILeasingPolicyService _leasingPolicyService;

        public ClaimsController(IAutoleaseContext autoleaseContext
                                , IAuthorizationService authorizationService
                                , IBankService bankService , ILeasingPolicyService leasingPolicyService)
        {
            _authorizationService = authorizationService;
            _bankService = bankService;
            _autoleaseContext = autoleaseContext;
            _leasingPolicyService = leasingPolicyService;
        }

        //[HttpPost]
        //[Route("api/Policy/SendClaims")]
        //public IHttpActionResult SendClaims(PoliciesForClaimsListingModel model, string lang)
        //{
        //    LeasingPortalLog log = new LeasingPortalLog();
        //    Output<PoliciesForClaimsListingModel> output = new Output<PoliciesForClaimsListingModel>();
        //    try
        //    {
        //        DateTime dtBeforeCalling = DateTime.Now;
        //        log.UserIP = Utilities.GetUserIPAddress();
        //        log.ServerIP = Utilities.GetInternalServerIP();
        //        log.UserAgent = Utilities.GetUserAgent();
        //        log.PageName = "CLaims";
        //        log.PageURL = "/Leasing/claims";
        //        log.ApiURL = Utilities.GetCurrentURL;
        //        log.MethodName = "SendClaims";
        //        log.ServiceRequest = JsonConvert.SerializeObject(model);

        //        if(model == null)
        //        {
        //            output.ErrorCode = Output<PoliciesForClaimsListingModel>.ErrorCodes.EmptyInputParamter;
        //            output.ErrorDescription = WebResources.ResourceManager.GetString("ModelIsEmpty", CultureInfo.GetCultureInfo(lang));
        //            log.ErrorCode = (int)output.ErrorCode;
        //            log.ErrorDescription = "model is null";
        //            LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
        //            return Error(output);
        //        }
        //        if (!model.CompanyId.HasValue)
        //        {
        //            output.ErrorCode = Output<PoliciesForClaimsListingModel>.ErrorCodes.EmptyInputParamter;
        //            output.ErrorDescription = WebResources.ResourceManager.GetString("EmptyInputParameter", CultureInfo.GetCultureInfo(lang));
        //            log.ErrorCode = (int)output.ErrorCode;
        //            log.ErrorDescription = "company id is null";
        //            LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
        //            return Error(output);
        //        }

        //        string currentUserId = _authorizationService.GetUserId(User);
        //        if (string.IsNullOrEmpty(currentUserId))
        //            currentUserId = User.Identity.GetUserId();
        //        log.UserID = currentUserId;

        //        ClaimRegistrationRequest request = new ClaimRegistrationRequest()
        //        {
        //            ReferenceId = model.ReferenceId,
        //            PolicyNo = model.PolicyNo,
        //            AccidentReportNumber = model.AccidentReportNumber,
        //            InsuredId = (!string.IsNullOrEmpty(model.InsuredId)) ? int.Parse(model.InsuredId) : 0,
        //            InsuredMobileNumber = model.InsuredMobileNumber,
        //            InsuredIBAN = model.InsuredIBAN,
        //            InsuredBankCode = model.InsuredBankCode.ToString(),
        //            DriverLicenseTypeCode = model.DriverLicenseTypeCode.ToString(),
        //            DriverLicenseExpiryDate = model.DriverLicenseExpiryDate,
        //            AccidentReport = model.AccidentReport,
        //            IbanFile = model.IbanFile,
        //            Channel = "Leasing",
        //            MethodName = "SendLeasingClaimRegistration"
        //        };

        //        var result = _autoleaseContext.SendClaimRegistrationRequest(request, model.CompanyId.Value, false);
        //        log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
        //        if (result == null)
        //        {
        //            output.ErrorCode = Output<PoliciesForClaimsListingModel>.ErrorCodes.ServiceException;
        //            output.ErrorDescription = WebResources.ResourceManager.GetString("ErrorGeneric", CultureInfo.GetCultureInfo(lang));
        //            log.ErrorCode = (int)output.ErrorCode;
        //            log.ErrorDescription = "Result is null";
        //            LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
        //            return Error(output);
        //        }
        //        if (result.ErrorCode != AutoLeaseOutput.ErrorCodes.Success 
        //            ||
        //            (result.ClaimRegistrationServiceResponse != null && result.ClaimRegistrationServiceResponse.Errors != null && result.ClaimRegistrationServiceResponse.Errors.Count > 0))
        //        {
        //            output.ErrorCode = Output<PoliciesForClaimsListingModel>.ErrorCodes.ServiceException;
        //            output.ErrorDescription = WebResources.ResourceManager.GetString("ErrorGeneric", CultureInfo.GetCultureInfo(lang));

        //            StringBuilder servcieErrors = new StringBuilder();
        //            foreach (var error in result.ClaimRegistrationServiceResponse.Errors)
        //                servcieErrors.AppendLine("Error Code: " + error.Code + " and the error message : " + error.Message);

        //            log.ErrorCode = (int)output.ErrorCode;
        //            log.ErrorDescription = $"Error happend while send claim request, and the error is: {servcieErrors}";
        //            LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
        //            return Error(output);
        //        }

        //        output.ErrorCode = Output<PoliciesForClaimsListingModel>.ErrorCodes.Success;
        //        output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
        //        return Single(output);
        //    }
        //    catch (Exception ex)
        //    {
        //        output.ErrorCode = Output<PoliciesForClaimsListingModel>.ErrorCodes.ExceptionError;
        //        output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
        //        log.ErrorCode = (int)output.ErrorCode;
        //        log.ErrorDescription = ex.ToString();
        //        LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
        //        return Error(output);
        //    }
        //}

        [HttpPost]
        [Route("api/Policy/SendClaims")]
        public IHttpActionResult SendClaims(ClaimRegestrationModel model, string lang)
        {
            string currentUserId = _authorizationService.GetUserId(User);
            if (string.IsNullOrEmpty(currentUserId))
                currentUserId = User.Identity.GetUserId();

            var output = _leasingPolicyService.AddClaimRegestration(model, currentUserId, ClaimRequesterType.PortalUser, ClaimModule.Leasing, lang);
            return Single(output);
        }

        [HttpPost]
        [Route("api/Policy/GetUserClaimsByfilter")]
        public IHttpActionResult GetUserClaimsByfilter(ClaimsFilter model, string lang)
        {
            string currentUserId = _authorizationService.GetUserId(User);
            if (string.IsNullOrEmpty(currentUserId))
                currentUserId = User.Identity.GetUserId();

            var output = _leasingPolicyService.GetUserClaimsData(model, currentUserId, lang);
            return Single(output);
        }

        [HttpPost]
        [Route("api/Policy/GetClaimDetails")]
        public IHttpActionResult GetUserClaimDetails(ClaimsFilter model, string lang)
        {
            string currentUserId = _authorizationService.GetUserId(User);
            if (string.IsNullOrEmpty(currentUserId))
                currentUserId = User.Identity.GetUserId();

            var output = _leasingPolicyService.GetUserClaimDetails(model, currentUserId, lang);
            return Single(output);
        }

        [HttpPost]
        [Route("api/Policy/UpdateClaim")]
        public IHttpActionResult UpdateClaim(ClaimsUpdateModel model, string lang)
        {
            string currentUserId = _authorizationService.GetUserId(User);
            if (string.IsNullOrEmpty(currentUserId))
                currentUserId = User.Identity.GetUserId();

            model.ClaimStatusId = (int)ClaimStatus.DataMissingUpdated;
            var output = _leasingPolicyService.UpdateClaim(model, currentUserId, lang);
            return Single(output);
        }

        [HttpGet]
        [Route("api/Policy/DownloadClaimFilebyFileId")]
        public IHttpActionResult DownloadPolicyFile(int fileId, string lang)
        {
            string currentUserId = _authorizationService.GetUserId(User);
            if (string.IsNullOrEmpty(currentUserId))
                currentUserId = User.Identity.GetUserId();

            var output = _leasingPolicyService.DownloadClaimFilebyFileId(fileId, currentUserId, lang);
            return Single(output);
        }
    }
}
