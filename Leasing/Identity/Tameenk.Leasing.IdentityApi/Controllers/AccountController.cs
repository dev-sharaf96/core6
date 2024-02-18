using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.Cookies;
using System;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Tameenk.Common.Utilities;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Infrastructure;
using Tameenk.Leasing.IdentityApi.App_Start;
using Tameenk.Leasing.IdentityApi.Output;
using Tameenk.Loggin.DAL;
using Tameenk.Resources.Account;
using Tameenk.Security.Services;
using Tameenk.Services.Core.Leasing;
using Tameenk.Services.Core.Notifications;
using Tameenk.Services.Implementation;
using DeviceDetectorNET;
using Newtonsoft.Json;

namespace Tameenk.Leasing.IdentityApi.Controllers
{

    public class AccountController : IdentityBaseController
    {

        #region Fields

        private ClientSignInManager _signInManager;
        private readonly IAuthorizationService _authorizationService;
        private readonly IRepository<LeasingUser> _leasingUserRepository;
        private readonly IRepository<LeasingVerifyUser> _leasingVerifyUserRepository;
        private readonly INotificationService _notificationService;
        private readonly IRepository<LeasingUsersLocationsDeviceInfo> _leasingUsersLocationsDeviceInfoRepository;

        #endregion


        #region Helper Methods

        public ClientSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ClientSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        #endregion


        #region Ctor

        public AccountController(IAuthorizationService authorizationService, IRepository<LeasingUser> leasingUserRepository, IRepository<LeasingVerifyUser> leasingVerifyUserRepository, INotificationService notificationService,
            IRepository<LeasingUsersLocationsDeviceInfo> leasingUsersLocationsDeviceInfoRepository)
        {
            _authorizationService = authorizationService ?? throw new ArgumentNullException(nameof(authorizationService));
            _leasingUserRepository = leasingUserRepository ?? throw new ArgumentNullException(nameof(leasingUserRepository));
            _leasingVerifyUserRepository = leasingVerifyUserRepository ?? throw new ArgumentNullException(nameof(leasingVerifyUserRepository));
            _notificationService = notificationService ?? throw new ArgumentNullException(nameof(notificationService));
            _leasingUsersLocationsDeviceInfoRepository = leasingUsersLocationsDeviceInfoRepository ?? throw new ArgumentNullException(nameof(leasingUsersLocationsDeviceInfoRepository));
        }

        #endregion

        [HttpPost]
        [Route("api/identity/login")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Login(LoginModel model, string returnUrl = null)
        {
            DateTime startTime = DateTime.Now;
            Output<LoginResponseModel> output = new Output<LoginResponseModel>();
            output.Result = new LoginResponseModel() { IsSuccess = false };

            LoginRequestsLog log = new LoginRequestsLog();
            log.Email = string.Empty;
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            try
            {
                SignInManager.AuthenticationManager.SignOut(CookieAuthenticationDefaults.AuthenticationType);
                SignInManager.AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                Request.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

                if (model == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.EmptyInputParamter, "ModelIsEmpty", model.Language, "Model is empty");
                }
                if (string.IsNullOrEmpty(model.NationalId))
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.EmptyInputParamter, "LeasingNationalIsRequired", model.Language, "NationalId is empty");
                }
                if (string.IsNullOrEmpty(model.PhoneNo))
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.EmptyInputParamter, "PhoneNmuberIsNull", model.Language, "Phone is empty");
                }

                var phone = Utilities.ValidatePhoneNumber(model.PhoneNo);
                var leasingUser = _leasingUserRepository.TableNoTracking.Where(a => a.DriverNin == model.NationalId && a.PhoneNumber == phone).FirstOrDefault();
                if (leasingUser == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.NotFound, "NotFound", model.Language, $"Leasing user is null for thi data nationalId: {model.NationalId} and phoneNumber: {model.PhoneNo}");
                }
                if (leasingUser.BankName != model.BankName)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.NotFound, "NotFound", model.Language, $"Leasing user is null for the data bank: {model.BankName}, nationalId: {model.NationalId} and phoneNumber: {model.PhoneNo}");
                }
                //if (leasingUser.BankId == 1)
                //{
                //    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                //    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.NotFound, "NotFound", model.Language, $"Leasing user is null for thi data bank: {model.BankName}, nationalId: {model.NationalId} and phoneNumber: {model.PhoneNo}");
                //}

                var aspNetUser = _authorizationService.GetUserDBByID(leasingUser.UserId);
                if (aspNetUser == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.NotFound, "NotFound", model.Language, "Aspnet user is null for id: " + leasingUser.UserId);
                }

                log.UserID = aspNetUser.Id.ToString();
                log.UserID = aspNetUser.Email;
                log.Mobile = leasingUser.PhoneNumber;
                if (leasingUser.LockoutEndDateUtc > DateTime.UtcNow)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.AccountLocked, "AccountLocked", model.Language, "Account is Locked");
                }
                if (leasingUser.IsDeleted.HasValue && leasingUser.IsDeleted.Value)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.AccountDeleted, "login_incorrect_password_message", model.Language, "Account is deleted");
                }

                var Otp = GenerateRendomCode();
                LeasingVerifyUser verifyData = new LeasingVerifyUser();
                verifyData.CreatedDate = DateTime.Now;
                verifyData.UserId = aspNetUser.Id;
                verifyData.VerificationCode = Otp.ToString();
                verifyData.ExpiryDate = DateTime.Now.AddMinutes(15);
                verifyData.MethodName = "LeasingPortalLogin";
                _leasingVerifyUserRepository.Insert(verifyData);
                string smsMessage = VerificationCodeResource.ResourceManager.GetString("OtpSmsBody_Portal", CultureInfo.GetCultureInfo(model.Language)) + Otp.ToString();
                var smsModel = new SMSModel()
                {
                    PhoneNumber = leasingUser.PhoneNumber,
                    MessageBody = smsMessage,
                    Method = SMSMethod.Leasing.ToString(),
                    Module = Module.Autoleasing.ToString(),
                    Channel = Channel.Leasing.ToString()
                };
                _notificationService.SendSmsBySMSProviderSettings(smsModel);

                output.Result.IsSuccess = true;
                output.Result.Email = aspNetUser.Email;
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.Success, "Success", model.Language);
            }
            catch (Exception ex)
            {
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.ServiceException, "ErrorGeneric", model.Language, ex.ToString());
            }
        }

        [HttpPost]
        [Route("api/identity/verifyOTP")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> VerifyOneTimePassword(VerifyOTPModel model)
        {
            var output = new Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>();
            output.Result = null;

            DateTime startTime = DateTime.Now;
            LoginRequestsLog log = new LoginRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();

            try
            {
                if (model == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.EmptyInputParamter, "ModelIsEmpty", model.Language, "Model is empty");
                }
                if (string.IsNullOrEmpty(model.NationalId))
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.EmptyInputParamter, "LeasingNationalIsRequired", model.Language, "NationalId is empty");
                }
                if (string.IsNullOrEmpty(model.PhoneNo))
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.EmptyInputParamter, "PhoneNmuberIsNull", model.Language, "Phone is empty");
                }

                var phone = Utilities.ValidatePhoneNumber(model.PhoneNo);
                var leasingUser = _leasingUserRepository.TableNoTracking.Where(a => a.DriverNin == model.NationalId && a.PhoneNumber == phone).FirstOrDefault();
                if (leasingUser == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.NotFound, "NotFound", model.Language, $"Leasing user is null for thi data nationalId: {model.NationalId} and phoneNumber: {model.PhoneNo} ");
                }
                if (leasingUser.BankName != model.BankName)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.NotFound, "NotFound", model.Language, $"Leasing user is null for the data bank: {model.BankName}, nationalId: {model.NationalId} and phoneNumber: {model.PhoneNo}");
                }
                //if (leasingUser.BankId == 1)
                //{
                //    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                //    return OutputHandler<LoginResponseModel>(output, log, Output<LoginResponseModel>.ErrorCodes.NotFound, "NotFound", model.Language, $"Leasing user is null for thi data bank: {model.BankName}, nationalId: {model.NationalId} and phoneNumber: {model.PhoneNo}");
                //}

                var aspNetUser = _authorizationService.GetUserDBByID(leasingUser.UserId);
                if (aspNetUser == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.NotFound, "NotFound", model.Language, "Aspnet user is null for id: " + leasingUser.UserId);
                }

                log.UserID = leasingUser.Id.ToString();
                log.Email = leasingUser.Email;
                log.Mobile = leasingUser.PhoneNumber;

                var otp = _leasingVerifyUserRepository.Table.Where(x => x.UserId == aspNetUser.Id && x.MethodName == "LeasingPortalLogin").OrderByDescending(x => x.Id).FirstOrDefault();
                if (otp == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.NotFound, "InvalidOTP", model.Language, "OTP not found");
                }
                if (model.Otp.Trim() != otp.VerificationCode)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.NotFound, "InvalidOTP", model.Language, "OTP doesn't match as we recieved " + model.Otp.Trim() + " and otp code is " + otp.VerificationCode);
                }
                if (otp.ExpiryDate < DateTime.Now)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.InvalidData, "InvalidOTP", model.Language, "OneTime Password Expired");
                }

                otp.ModifiedDate = DateTime.Now;
                otp.IsVerified = true;
                _leasingVerifyUserRepository.Update(otp);

                output.Result = _authorizationService.GetAccessToken(aspNetUser.Id);
                if (output.Result == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.InValidResponse, "login_incorrect_password_message", model.Language, "Failed to generate access token");
                }

                SignInManager.SignIn(aspNetUser, true, true);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;

                var deviceInfo = AddDeviceInfo(leasingUser);
                if (deviceInfo.ErrorCode == Output<DeviceInfo>.ErrorCodes.DeviceInfoIsNull || deviceInfo.ErrorCode == Output<DeviceInfo>.ErrorCodes.ServiceException)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.InValidResponse, "ErrorGeneric", model.Language, "there is an error while getting device info, and error is: " + deviceInfo.ErrorDescription);
                }

                string message = string.Empty;
                if (!string.IsNullOrEmpty(leasingUser.PhoneNumber))
                {
                    if (!string.IsNullOrEmpty(deviceInfo.Result.DeviceName))
                        message = "New Device signed-in on an " + deviceInfo.Result.DeviceName + " device with " + leasingUser.UserName + " your account is at risk if this wasn't you please change password";
                    else
                        message = "New Device signed-in on an " + deviceInfo.Result.OS + " device with " + leasingUser.UserName + " your account is at risk if this wasn't you please change password";

                    var smsModel = new SMSModel()
                    {
                        PhoneNumber = leasingUser.PhoneNumber,
                        MessageBody = message,
                        Method = SMSMethod.Leasing.ToString(),
                        Module = Module.Autoleasing.ToString(),
                        Channel = Channel.Leasing.ToString()
                    };
                    _notificationService.SendSmsBySMSProviderSettings(smsModel);
                }

                return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.Success, "New Device login", model.Language);
            }
            catch (Exception ex)
            {
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.ServiceException, "ErrorGeneric", model.Language, ex.ToString());
            }
        }

        [HttpPost]
        [Route("api/identity/GetAccessToken")]
        [AllowAnonymous]
        public IHttpActionResult GetAccessToken([FromBody] UserData model)
        {
            var output = new Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>();
            output.Result = null;

            DateTime startTime = DateTime.Now;
            LoginRequestsLog log = new LoginRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.UserID = model.UserId;

            if (string.IsNullOrEmpty(model.UserId))
            {
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.EmptyInputParamter, "ErrorGeneric", model.Language, "UserId.UserId is empty");
            }

            try
            {
                output.Result = _authorizationService.GetAccessToken(model?.UserId);
                if (output.Result == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.InValidResponse, "ErrorGeneric", model.Language, "Response is not success");
                }

                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.Success, "Success", model.Language);
            }
            catch (Exception ex)
            {
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<Tameenk.Core.Domain.Dtos.AccessTokenResult>(output, log, Output<Tameenk.Core.Domain.Dtos.AccessTokenResult>.ErrorCodes.ServiceException, "ErrorGeneric", model.Language, ex.ToString());
            }
        }

        [HttpPost]
        [Route("api/identity/Logout")]
        public IHttpActionResult Logout(UserData model)
        {
            var output = new Output<bool>();
            output.Result = false;

            DateTime startTime = DateTime.Now;
            LoginRequestsLog log = new LoginRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.UserID = model.UserId;

            if (string.IsNullOrEmpty(model.UserId))
            {
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.EmptyInputParamter, "ErrorGeneric", model.Language, "UserId.UserId is empty");
            }

            try
            {
                SignInManager.AuthenticationManager.SignOut(CookieAuthenticationDefaults.AuthenticationType);
                SignInManager.AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                Request.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

                var otp = _leasingVerifyUserRepository.Table.Where(x => x.UserId == model.UserId && x.MethodName == "LeasingPortalLogin").OrderByDescending(x => x.Id).FirstOrDefault();
                if (otp == null)
                {
                    log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                    return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.NotFound, "InvalidOTP", model.Language, "OTP not found");
                }

                otp.ModifiedDate = DateTime.Now;
                otp.ExpiryDate = DateTime.Now.AddMinutes(-15);
                _leasingVerifyUserRepository.Update(otp);

                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.Success, "Success", model.Language);
            }
            catch (Exception ex)
            {
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(startTime).TotalSeconds;
                return OutputHandler<bool>(output, log, Output<bool>.ErrorCodes.ServiceException, "ErrorGeneric", model.Language, ex.ToString());
            }
        }

        #region Private Methods

        private int GenerateRendomCode()
        {
            Random rnd = new Random();
            int code = rnd.Next(100000, 999999);
            return code;
        }

        public Output<DeviceInfo> AddDeviceInfo(LeasingUser userObject)
        {
            Output<DeviceInfo> output = new Output<DeviceInfo>();
            try
            {
                var deviceInfo = new DeviceDetector(Utilities.GetUserAgent());
                deviceInfo.Parse();
                if (deviceInfo == null)
                {
                    output.ErrorCode = Output<DeviceInfo>.ErrorCodes.DeviceInfoIsNull;
                    output.ErrorDescription = "deviceInfo is null";
                    return output;
                }

                output.Result = new DeviceInfo();
                output.Result.DeviceName = deviceInfo.GetBrandName() + " " + deviceInfo.GetModel();
                output.Result.OS = deviceInfo.GetOs().Match.Name + " " + deviceInfo.GetOs().Match.Platform + " " + deviceInfo.GetOs().Match.Version;
                output.Result.DeviceType = deviceInfo.GetDeviceName();
                output.Result.Client = deviceInfo.GetBrowserClient().Match.Name + " " + deviceInfo.GetBrowserClient().Match.Version;

                //System.IO.File.WriteAllText(@"C:\inetpub\WataniyaLog\AddDeviceInfo_outputResult_" + userObject.UserId + ".txt", JsonConvert.SerializeObject(output.Result));

                var info = _leasingUsersLocationsDeviceInfoRepository.TableNoTracking.Where(x => x.LeasingUserId == userObject.Id && x.UserId == userObject.UserId && x.OS == output.Result.OS && x.DeviceType == output.Result.DeviceType && x.DeviceName == output.Result.DeviceName && x.Client == output.Result.Client).FirstOrDefault();
                if (info != null)
                {
                    output.ErrorCode = Output<DeviceInfo>.ErrorCodes.DeviceAlreadyExists;
                    output.ErrorDescription = "deviceInfo already exists";
                    return output;
                }

                LeasingUsersLocationsDeviceInfo userDeviceInfo = new LeasingUsersLocationsDeviceInfo();
                userDeviceInfo.ServerIP = Utilities.GetInternalServerIP();
                userDeviceInfo.UserIP = Utilities.GetUserIPAddress();
                userDeviceInfo.LeasingUserId = userObject.Id;
                userDeviceInfo.UserId = userObject.UserId;
                userDeviceInfo.CreatedDate = DateTime.Now;
                userDeviceInfo.UserName = userObject.UserName;
                userDeviceInfo.OS = output.Result.OS;
                userDeviceInfo.DeviceType = output.Result.DeviceType;
                userDeviceInfo.DeviceName = output.Result.DeviceName;
                userDeviceInfo.Client = output.Result.Client;
                _leasingUsersLocationsDeviceInfoRepository.Insert(userDeviceInfo);

                output.ErrorCode = Output<DeviceInfo>.ErrorCodes.DeviceAdded;
                output.ErrorDescription = "DeviceAdded";
                return output;
            }
            catch (Exception ex)
            {
                output.ErrorCode = Output<DeviceInfo>.ErrorCodes.ServiceException;
                output.ErrorDescription = ex.ToString();
                return output;
            }
        }

        #endregion
    }
}