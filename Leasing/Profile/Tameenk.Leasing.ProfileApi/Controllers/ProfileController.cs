using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using System.Web.Http;
using Tameenk.Common.Utilities;
using Tameenk.Core.Configuration;
using Tameenk.Core.Domain.Dtos;
using Tameenk.Leasing.IdentityApi.Output;
using Tameenk.Loggin.DAL;
using Tameenk.Resources.WebResources;
using Tameenk.Security.Services;
using Tameenk.Services.Core.Leasing;
using Tameenk.Services.Core.Leasing.Models;
using Tameenk.Services.Core.Policies;
using Tameenk.Services.Implementation.Policies;
using Tameenk.Services.Implementation.Policies.leasingportal;

namespace Tameenk.Leasing.ProfileApi
{
    public class ProfileController : BaseApiController
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IPolicyService _policyService;
        private readonly TameenkConfig tameenkConfig;
        private readonly ILeasingProfileService leasingProfileService;
        #region The Ctro
        public ProfileController(IAuthorizationService authorizationService,
            TameenkConfig tameenkConfig,
            ILeasingProfileService leasingProfileService,
            IPolicyService policyService
            )
        {
            _policyService = policyService;
            _authorizationService = authorizationService ?? throw new ArgumentNullException(nameof(authorizationService));
            this.tameenkConfig = tameenkConfig;
            this.leasingProfileService = leasingProfileService;
        }
        #endregion
         [Route("api/profile/GetprofilePolicies")]
        [HttpGet]
        public async Task<IHttpActionResult> getDriverDate(string nationalId, string lang)
        {
            ProfileRequestsLog log = new ProfileRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.Method = "GetprofilePolicies";
            Output<List<policyStatistics>> output = new Output<List<policyStatistics>>();
            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                    currentUserId = User.Identity.GetUserId();

                Guid userId = Guid.Empty;
                Guid.TryParse(currentUserId, out userId);
                log.UserID = userId;

                if (string.IsNullOrEmpty(nationalId))
                {
                    output.ErrorCode = Output<List<policyStatistics>>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("EmptyInputParamter", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)Output<List<policyStatistics>>.ErrorCodes.NotFound;
                    log.ErrorDescription = "nationalId is empty";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    return Error(output);
                }

                string exception = string.Empty;
                List<policyStatistics> policy = leasingProfileService.GetLeasingProfilePolicies(currentUserId, nationalId, out exception);
                if (!string.IsNullOrEmpty(exception))
                {
                    log.ErrorCode = (int)Output<List<policyStatistics>>.ErrorCodes.ExceptionError;
                    log.ErrorDescription = exception;
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);

                    output.ErrorCode = Output<List<policyStatistics>>.ErrorCodes.ExceptionError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }
                if (policy == null || policy.Count < 1)
                {
                    log.ErrorCode = (int)Output<List<policyStatistics>>.ErrorCodes.NotFound;
                    log.ErrorDescription = "No policies";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);

                    output.ErrorCode = Output<List<policyStatistics>>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NoData", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                policy.ForEach(p =>
                {
                    if (p.VehicleIdTypeId == 2 && p.CustomCardNumber != null && p.SequenceNumber == null)
                    {
                        p.CarPlateNumber = p.ConvertedCarPlateNumber;
                        p.CarPlateText1 = p.ConvertedCarPlateText1;
                        p.CarPlateText2 = p.ConvertedCarPlateText2;
                        p.CarPlateText3 = p.ConvertedCarPlateText3;
                    }
                });

                output.ErrorCode = Output<List<policyStatistics>>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                output.Result = policy;
                return Single(output);
            }
            catch (Exception ex)
            {
                log.ErrorCode = (int)Output<List<policyStatistics>>.ErrorCodes.ExceptionError;
                log.ErrorDescription = ex.ToString();
                ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);

                output.ErrorCode = Output<List<policyStatistics>>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                return Error(output);
            }

        }
        [HttpGet]
        [Route("api/profile/DownloadPolicy")]
        public string DownloadPolicyFile(string fileId)
        {

            var policyFile = _policyService.DownloadPolicyFile(fileId);
            if (policyFile != null)
            {
                if (policyFile.PolicyFileByte != null)
                {
                    return Convert.ToBase64String(policyFile.PolicyFileByte);
                }
                else if (!string.IsNullOrEmpty(policyFile.FilePath))
                {
                    if (tameenkConfig.RemoteServerInfo.UseNetworkDownload)
                    {
                        FileNetworkShare fileShare = new FileNetworkShare();
                        string exception = string.Empty;
                        var file = fileShare.GetFileFromShare(tameenkConfig.RemoteServerInfo.DomainName, tameenkConfig.RemoteServerInfo.ServerIP, tameenkConfig.RemoteServerInfo.ServerUserName, tameenkConfig.RemoteServerInfo.ServerPassword, policyFile.FilePath, out exception);
                        if (file != null)
                            return Convert.ToBase64String(file);
                        else
                            return null;
                    }
                    return Convert.ToBase64String(System.IO.File.ReadAllBytes(policyFile.FilePath));
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
        [HttpPost]
        [Route("api/profile/GetClientPolicyLogDetails")]
        public async Task<IHttpActionResult> GetClientPolicyLogDetails(ClientDataModel clientDataModel, string lang)
        {
            Output <List<AllPolicyDetailsModel>> output = new Output<List<AllPolicyDetailsModel>>();
            output.Result = null;
            string exp = string.Empty;

            ProfileRequestsLog log = new ProfileRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.Method = "GetClientPolicyLogDetails";

            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                    currentUserId = User.Identity.GetUserId();

                if (string.IsNullOrEmpty(currentUserId))
                {
                    output.ErrorCode = Output<List<AllPolicyDetailsModel>>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("UserNotExist", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)Output<AllPolicyDetailsModel>.ErrorCodes.NotFound;
                    log.ErrorDescription = "User Not Exist";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    return Error(output);
                }
                if (string.IsNullOrEmpty(clientDataModel.ReferenceId))
                {
                    output.ErrorCode = Output<List<AllPolicyDetailsModel>>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ModelIsEmpty", CultureInfo.GetCultureInfo(lang));

                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = WebResources.ResourceManager.GetString("ReferenceIsEmpty", CultureInfo.GetCultureInfo(lang));
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    return Error(output);
                }

               List<AllPolicyDetailsModel> policyDetails = leasingProfileService.GetClientPolicyLogDetailsService(clientDataModel, out exp);
                if (!string.IsNullOrEmpty(exp))
                {
                    output.ErrorCode = Output<List<AllPolicyDetailsModel>>.ErrorCodes.ExceptionError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ModelIsEmpty", CultureInfo.GetCultureInfo(lang));

                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Get Policy Details Error is: " + exp;
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    return Error(output);
                }
                if (policyDetails == null)
                {
                    output.ErrorCode = Output<List<AllPolicyDetailsModel>>.ErrorCodes.InvalidData;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ModelIsEmpty", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Policy Not Found";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    return Error(output);
                }

                output.ErrorCode = Output<List<AllPolicyDetailsModel>>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                output.Result = policyDetails;
                return Single(output);
            }
            catch (Exception ex)
            {
                output.ErrorCode = Output<List<AllPolicyDetailsModel>>.ErrorCodes.InvalidData;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ErrorGeneric", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                return Error(output);
            }
        }
        [HttpPost]
        [Route("api/profile/GetDriverInsuranceRecord")]
        public IHttpActionResult GetDriverInsuranceRecord(ClientDataModel clientDataModel, string lang)
        {
            var log = new ProfileRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.Method = "GetDriverInsuranceRecord";
            Output<DriverInsuranceRecord> output = new Output<DriverInsuranceRecord>();
            string exception = string.Empty;
            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                {
                    currentUserId = User.Identity.GetUserId();
                }
                if (string.IsNullOrEmpty(currentUserId))
                {
                    log.ErrorCode = (int)Output<DriverInsuranceRecord>.ErrorCodes.NotFound;
                    log.ErrorDescription = "User Id is Null";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<DriverInsuranceRecord>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("UserNotExist", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                if (string.IsNullOrEmpty(clientDataModel.ReferenceId))
                {
                    log.ErrorCode = (int)Output<DriverInsuranceRecord>.ErrorCodes.EmptyInputParamter;
                    log.ErrorDescription = "ReferenceId should't be null or empty";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<DriverInsuranceRecord>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NullReference", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                DriverInsuranceRecord driverInsuranceRecord = leasingProfileService.GetDriverInsuranceRecordService(clientDataModel, ref exception);

                if (!string.IsNullOrEmpty(exception))
                {
                    log.ErrorCode = (int)Output<DriverInsuranceRecord>.ErrorCodes.ServiceException;
                    log.ErrorDescription = exception;
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<DriverInsuranceRecord>.ErrorCodes.ServiceException;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }
                else if (driverInsuranceRecord == null)
                {
                    log.ErrorCode = (int)Output<DriverInsuranceRecord>.ErrorCodes.NotFound;
                    log.ErrorDescription = "No driver Insurance Record";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<DriverInsuranceRecord>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NoData", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                output.ErrorCode = Output<DriverInsuranceRecord>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                output.Result = driverInsuranceRecord;
                return Single(output);
            }
            catch (Exception ex)
            {
                log.ErrorCode = (int)Output<DriverInsuranceRecord>.ErrorCodes.ExceptionError;
                log.ErrorDescription = ex.ToString();
                ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                output.ErrorCode = Output<DriverInsuranceRecord>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                return Error(output);
            }
        }

        [HttpGet]
        [Route("api/profile/GetProfileBasicData")]
        public IHttpActionResult GetProfileBasicData(string referenceId, string lang)
        {
            var log = new ProfileRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.Method = "GetProfileBasicData";
            Output<ProfileBaiscData> output = new Output<ProfileBaiscData>();
            string exception = string.Empty;
            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                {
                    currentUserId = User.Identity.GetUserId();
                }
                if (string.IsNullOrEmpty(currentUserId))
                {
                    log.ErrorCode = (int)Output<ProfileBaiscData>.ErrorCodes.NotFound;
                    log.ErrorDescription = "User Id is Null";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<ProfileBaiscData>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("UserNotExist", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                if (string.IsNullOrEmpty(referenceId))
                {
                    log.ErrorCode = (int)Output<ProfileBaiscData>.ErrorCodes.EmptyInputParamter;
                    log.ErrorDescription = "ReferenceId should't be null or empty";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<ProfileBaiscData>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NullReference", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                ProfileBaiscData profileBaiscData = leasingProfileService.GetProfileBaiscDataSerivce(referenceId, ref exception);

                if (!string.IsNullOrEmpty(exception))
                {
                    log.ErrorCode = (int)Output<ProfileBaiscData>.ErrorCodes.ServiceException;
                    log.ErrorDescription = exception;
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<ProfileBaiscData>.ErrorCodes.ServiceException;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }
                else if (profileBaiscData == null)
                {
                    log.ErrorCode = (int)Output<ProfileBaiscData>.ErrorCodes.NotFound;
                    log.ErrorDescription = "No driver Insurance Record";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<ProfileBaiscData>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NoData", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                output.ErrorCode = Output<ProfileBaiscData>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                output.Result = profileBaiscData;
                return Single(output);
            }
            catch (Exception ex)
            {
                log.ErrorCode = (int)Output<ProfileBaiscData>.ErrorCodes.ExceptionError;
                log.ErrorDescription = ex.ToString();
                ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                output.ErrorCode = Output<ProfileBaiscData>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                return Error(output);
            }
        }

        [HttpGet]
        [Route("api/profile/GetAdditionalDrivers")]
        public IHttpActionResult GetAdditionalDrivers(string referenceId, string lang)
        {
            var log = new ProfileRequestsLog();
            log.Channel = Channel.Leasing.ToString();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.UserIP = Utilities.GetUserIPAddress();
            log.Method = "GetAdditionalDrivers";
            Output<List<DriverModel>> output = new Output<List<DriverModel>>();
            string exception = string.Empty;
            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                {
                    currentUserId = User.Identity.GetUserId();
                }
                if (string.IsNullOrEmpty(currentUserId))
                {
                    log.ErrorCode = (int)Output<ProfileBaiscData>.ErrorCodes.NotFound;
                    log.ErrorDescription = "User Id is Null";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<List<DriverModel>>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("UserNotExist", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }
                if (string.IsNullOrEmpty(referenceId))
                {
                    log.ErrorCode = (int)Output<ProfileBaiscData>.ErrorCodes.EmptyInputParamter;
                    log.ErrorDescription = "ReferenceId should't be null or empty";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<List<DriverModel>>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NullReference", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                List<DriverModel> additionalDriversData = leasingProfileService.GetAdditionalDriversService(referenceId, ref exception);

                if (!string.IsNullOrEmpty(exception))
                {
                    log.ErrorCode = (int)Output<List<DriverModel>>.ErrorCodes.ServiceException;
                    log.ErrorDescription = exception;
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<List<DriverModel>>.ErrorCodes.ServiceException;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }
                else if (additionalDriversData == null)
                {
                    log.ErrorCode = (int)Output<List<DriverModel>>.ErrorCodes.NotFound;
                    log.ErrorDescription = "No driver Insurance Record";
                    ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                    output.ErrorCode = Output<List<DriverModel>>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NoData", CultureInfo.GetCultureInfo(lang));
                    return Error(output);
                }

                output.ErrorCode = Output<List<DriverModel>>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                output.Result = additionalDriversData;
                return Single(output);
            }
            catch (Exception ex)
            {
                log.ErrorCode = (int)Output<List<DriverModel>>.ErrorCodes.ExceptionError;
                log.ErrorDescription = ex.ToString();
                ProfileRequestsLogDataAccess.AddProfileRequestsLog(log);
                output.ErrorCode = Output<List<DriverModel>>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                return Error(output);
            }
        }
    }
}
