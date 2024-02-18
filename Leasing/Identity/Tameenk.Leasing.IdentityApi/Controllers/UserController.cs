using Microsoft.AspNet.Identity;
using System;
using System.Web.Http;
using Tameenk.Common.Utilities;
using Tameenk.Leasing.IdentityApi.Output;
using Tameenk.Loggin.DAL;
using Tameenk.Security.Services;
using Tameenk.Services.Core.Leasing;

namespace Tameenk.Leasing.IdentityApi.Controllers
{
    [Authorize]
    public class UserController : IdentityBaseController
    {
        #region Fields

        private readonly IAuthorizationService _authorizationService;
        private readonly ILeasingUserService _leasingUserService;

        #endregion

        public UserController(IAuthorizationService authorizationService, ILeasingUserService leasingUserService)
        {
            _authorizationService = authorizationService ?? throw new ArgumentNullException(nameof(authorizationService));
            _leasingUserService = leasingUserService ?? throw new ArgumentNullException(nameof(leasingUserService));
        }

        [HttpPost]
        [Route("api/users/UpdateUserEmail")]
        public IHttpActionResult UpdateUserEmail(UpdatedUserDataModel updatedUserEmailModel)
        {
            var output = new Output<bool>();
            output.Result = false;

            DateTime startTime = DateTime.Now;
            LoginRequestsLog log = new LoginRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();

            string currentUserId = _authorizationService.GetUserId(User);
            if (string.IsNullOrEmpty(currentUserId))
                currentUserId = User.Identity.GetUserId();

            if (string.IsNullOrEmpty(currentUserId))
            {
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.EmptyInputParamter, "ErrorGeneric", updatedUserEmailModel.lang, "UserId.UserId is empty");
            }

            try
            {
                log.UserID = currentUserId;
                var leasingUser = _leasingUserService.GetUserByIdAndRefId(currentUserId, updatedUserEmailModel.ReferenceId);
                if (leasingUser == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.NotFound, "NotFound", updatedUserEmailModel.lang, "Leasing user is null for Id " + currentUserId);
                }

                log.UserID = leasingUser.Id.ToString();
                log.Email = leasingUser.Email;
                log.Mobile = leasingUser.PhoneNumber;

                string exception = string.Empty;
                leasingUser.UpdatedEmail = updatedUserEmailModel.UpdatedEmail;
                _leasingUserService.UpdateUserInfo(leasingUser, out exception);
                if (!string.IsNullOrEmpty(exception))
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.ExceptionError, "ErrorGeneric", updatedUserEmailModel.lang, exception);
                }

                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.Success, "Success", updatedUserEmailModel.lang);
            }
            catch (Exception ex)
            {
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.ServiceException, "ErrorGeneric", updatedUserEmailModel.lang, ex.ToString());
            }
        }
    }
}