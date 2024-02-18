﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using Tameenk.Common.Utilities;
using Tameenk.Core.Configuration;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Enums;
using System.Data.Entity;
using Tameenk.Loggin.DAL;
using Tameenk.Resources.Profile;
using Tameenk.Resources.WebResources;
using Tameenk.Services.Core;
using Tameenk.Services.Core.Leasing;
using Tameenk.Services.Core.Leasing.Models;
using Tameenk.Services.Implementation.Policies;
using Tameenk.Core.Infrastructure;
using Tameenk.Data;
using System.Data.SqlClient;
using System.Data.Entity.Infrastructure;

namespace Tameenk.Services.Implementation
{
    public class LeasingPolicyService : ILeasingPolicyService
    {
        private readonly ILeasingProfileService _leasingProfileService;
        private readonly IRepository<UserClaim> _userClaim;
        private readonly IRepository<UserClaimHistory> _userClaimHistory;
        private readonly IRepository<UserClaimFile> _userClaimFile;
        private readonly IRepository<UserClaimStatus> _userClaimStats;
        private readonly TameenkConfig _tameenkConfig;
        private readonly HashSet<string> claimAllowedFileTypes = new HashSet<string> { "png", "jpg", "jpeg", "pdf" };

        public LeasingPolicyService(ILeasingProfileService leasingProfileService, IRepository<UserClaim> userClaim, IRepository<UserClaimHistory> userClaimHistory
            , IRepository<UserClaimFile> userClaimFile, TameenkConfig tameenkConfig, IRepository<UserClaimStatus> userClaimStats)
        {
            _leasingProfileService = leasingProfileService;
            _userClaim = userClaim;
            _userClaimHistory = userClaimHistory;
            _userClaimFile = userClaimFile;
            _userClaimStats = userClaimStats;
            _tameenkConfig = tameenkConfig;
        }

        public LeaseOutput<bool> AddClaimRegestration(ClaimRegestrationModel model, string userId, ClaimRequesterType requesterType, ClaimModule claimModule, string lang)
        {
            LeasingPortalLog log = new LeasingPortalLog();
            LeaseOutput<bool> output = new LeaseOutput<bool>();
            string exception = string.Empty;

            try
            {
                DateTime dtBeforeCalling = DateTime.Now;
                log.UserID = userId;
                log.UserIP = Utilities.GetUserIPAddress();
                log.ServerIP = Utilities.GetInternalServerIP();
                log.UserAgent = Utilities.GetUserAgent();
                log.PageName = "CLaims";
                log.PageURL = "claims";
                log.ApiURL = Utilities.GetCurrentURL;
                log.MethodName = "SendClaims";
                log.ServiceRequest = JsonConvert.SerializeObject(model);

                if (userId == null)
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.NotAuthorized;
                    output.ErrorDescription = ProfileResources.ResourceManager.GetString("UnAuthorizedUser", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "User is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (model == null)
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ModelIsEmpty", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "model is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (string.IsNullOrEmpty(model.ReferenceId))
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("EmptyInputParameter", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "model.ReferenceId id is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (string.IsNullOrEmpty(model.AccidentReportNumber))
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("EmptyInputParameter", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "model.AccidentReportNumber id is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (model.AccidentReport == null || model.AccidentReport.Length <= 0)
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("EmptyInputParameter", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "model.AccidentReport id is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (string.IsNullOrEmpty(model.AccidentReportExtension))
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("EmptyInputParameter", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "model.AccidentReportExtension id is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (!claimAllowedFileTypes.Contains(model.AccidentReportExtension))
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("FormatNotSupported", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Format Not Supported as the extension is: " + model.AccidentReportExtension;
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                exception = string.Empty;
                bool result = validateFileFormate(model.AccidentReport, model.AccidentReportExtension, out exception);
                if (!string.IsNullOrEmpty(exception))
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.ServiceError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Error happend while validateFileFormate, and exception is: " + exception;
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                var basicData = _leasingProfileService.GetProfileBaiscDataSerivce(model.ReferenceId, ref exception);
                if (!string.IsNullOrEmpty(exception))
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.ServiceError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Error happend while getting basic data from database, and exception is: " + exception;
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (basicData == null)
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.NullResponse;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NoData", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "No driver Insurance Record";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                var claim = new UserClaim()
                {
                    ReferenceId = model.ReferenceId,
                    ExternalId = basicData.ExternalId,
                    ClaimRequesterTypeId = requesterType,
                    ClaimModuleId = claimModule,
                    ClaimStatusId = (int)ClaimStatus.Registered,
                    ClaimStatusName = ClaimStatus.Registered.ToString(),
                    PolicyNo = basicData.PolicyNo,
                    AccidentReportNumber = model.AccidentReportNumber,
                    NationalId = basicData.NIN,
                    MobileNo = basicData.PhoneNumber,
                    Iban = basicData.Iban,
                    InsuredBankCode = basicData.InsuredBankCode ?? 0,
                    LicenseTypeCode = basicData.DriverLicenseTypeCode.HasValue ? basicData.DriverLicenseTypeCode.Value : 3,
                    LicenseExpiryDate = basicData.DriverLicenseTypeCode.HasValue ? basicData.DriverLicenseExpiryDate : "",
                    CreatedDate = DateTime.Now,
                    CreatedBy = basicData.LeasingUserId.ToString(),
                    BankName = basicData.BankName
                };

                exception = string.Empty;
                ManageUserClaim(claim, null, basicData.BankName, out exception, file: model.AccidentReport, fileName: model.AccidentReportFileName, extension: model.AccidentReportExtension);
                if (!string.IsNullOrEmpty(exception))
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.ServiceError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Error happend while adding manage claim and it's dependancies, and exception is: " + exception;
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                output.Result = true;
                output.ErrorCode = LeaseOutput<bool>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                return output;
            }
            catch (Exception ex)
            {
                output.ErrorCode = LeaseOutput<bool>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
        }

        public LeaseOutput<bool> UpdateClaim(ClaimsUpdateModel model, string userId, string lang)
        {
            LeasingPortalLog log = new LeasingPortalLog();
            LeaseOutput<bool> output = new LeaseOutput<bool>();

            try
            {
                DateTime dtBeforeCalling = DateTime.Now;
                log.UserID = userId;
                log.UserIP = Utilities.GetUserIPAddress();
                log.ServerIP = Utilities.GetInternalServerIP();
                log.UserAgent = Utilities.GetUserAgent();
                log.PageName = "ClaimsFollowUp";
                log.PageURL = "ClaimsFollowUp/details";
                log.ApiURL = Utilities.GetCurrentURL;
                log.MethodName = "UpdateClaimRegestration";
                log.ServiceRequest = JsonConvert.SerializeObject(model);

                if (userId == null)
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.NotAuthorized;
                    output.ErrorDescription = ProfileResources.ResourceManager.GetString("UnAuthorizedUser", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "User is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (model == null)
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ModelIsEmpty", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "model is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                var claim = _userClaim.Table.Where(c => c.Id == model.Id).FirstOrDefault();
                if (claim == null)
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.NullResponse;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("NoData", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "claim is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (claim.ClaimStatusId == (int)ClaimStatus.Finalized)
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.ServiceError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ClaimIsClosed", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Claim if closed";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                claim.ClaimStatusId = model.ClaimStatusId;
                claim.ClaimStatusName = ((ClaimStatus)model.ClaimStatusId).ToString();

                string exception = string.Empty;
                ManageUserClaim(claim, null, claim.BankName, out exception, model.FileBytes,model.FileName, model.FileExtension, model.notes);
                if (!string.IsNullOrEmpty(exception))
                {
                    output.ErrorCode = LeaseOutput<bool>.ErrorCodes.ServiceError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Error happend while adding manage claim and it's dependancies, and exception is: " + exception;
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                output.Result = true;
                output.ErrorCode = LeaseOutput<bool>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                return output;
            }
            catch (Exception ex)
            {
                output.ErrorCode = LeaseOutput<bool>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
        }


        public LeaseOutput<UserClaimModel> GetUserClaimsData(ClaimsFilter filterModel, string currentUserId, string lang)
        {
            LeasingPortalLog log = new LeasingPortalLog();
            LeaseOutput<UserClaimModel> output = new LeaseOutput<UserClaimModel>();

            try
            {
                DateTime dtBeforeCalling = DateTime.Now;
                log.UserID = currentUserId;
                log.UserIP = Utilities.GetUserIPAddress();
                log.ServerIP = Utilities.GetInternalServerIP();
                log.UserAgent = Utilities.GetUserAgent();
                log.PageName = "FilterCLaims";
                log.PageURL = "claims";
                log.ApiURL = Utilities.GetCurrentURL;
                log.MethodName = "FilterCLaims";
                log.ServiceRequest = JsonConvert.SerializeObject(filterModel);

                if (currentUserId == null)
                {
                    output.ErrorCode = LeaseOutput<UserClaimModel>.ErrorCodes.NotAuthorized;
                    output.ErrorDescription = ProfileResources.ResourceManager.GetString("UnAuthorizedUser", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "User is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                var exception = string.Empty;
                var data = GetClaimsDataBasedOnFilter(filterModel, out exception);
                if (!string.IsNullOrEmpty(exception))
                {
                    output.ErrorCode = LeaseOutput<UserClaimModel>.ErrorCodes.ServiceError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Error happend while get claims data based on filter, and exception is: " + exception;
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (data == null)
                {
                    output.ErrorCode = LeaseOutput<UserClaimModel>.ErrorCodes.NullResponse;
                    output.ErrorDescription = ProfileResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "data is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                output.Result = new UserClaimModel();
                output.Result = data;
                output.ErrorCode = LeaseOutput<UserClaimModel>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                return output;
            }
            catch (Exception ex)
            {
                output.ErrorCode = LeaseOutput<UserClaimModel>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
        }

        public LeaseOutput<List<ClaimStatusOutput>> GetAllClaimsStatus(string currentUserId, string lang)
        {
            LeasingPortalLog log = new LeasingPortalLog();
            LeaseOutput<List<ClaimStatusOutput>> output = new LeaseOutput<List<ClaimStatusOutput>>();

            try
            {
                DateTime dtBeforeCalling = DateTime.Now;
                log.UserID = currentUserId;
                log.UserIP = Utilities.GetUserIPAddress();
                log.ServerIP = Utilities.GetInternalServerIP();
                log.UserAgent = Utilities.GetUserAgent();
                log.PageName = "CLaims";
                log.PageURL = "claims";
                log.ApiURL = Utilities.GetCurrentURL;
                log.MethodName = "GetAllClaimsStatus";

                if (currentUserId == null)
                {
                    log.ErrorCode = (int)LeaseOutput<List<ClaimStatusOutput>>.ErrorCodes.NotAuthorized;
                    log.ErrorDescription = ProfileResources.ResourceManager.GetString("UnAuthorizedUser", CultureInfo.GetCultureInfo(lang));
                    output.ErrorCode = LeaseOutput<List<ClaimStatusOutput>>.ErrorCodes.NotAuthorized;
                    output.ErrorDescription = ProfileResources.ResourceManager.GetString("UnAuthorizedUser", CultureInfo.GetCultureInfo(lang));
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                List<UserClaimStatus> claimStatuses = _userClaimStats.TableNoTracking.ToList();
                List<ClaimStatusOutput> claimStatusOutputLst = new List<ClaimStatusOutput>();

                foreach(var c in claimStatuses)
                {
                    ClaimStatusOutput claimStatusOutput = new ClaimStatusOutput();
                    claimStatusOutput.StatusCode = c.StatusCode;
                    claimStatusOutput.StatusNameAr = c.StatusNameAr;
                    claimStatusOutput.StatusNameEn = c.StatusNameEn;
                    claimStatusOutputLst.Add(claimStatusOutput);
                }
                output.Result = claimStatusOutputLst;
                output.ErrorCode = LeaseOutput<List<ClaimStatusOutput>>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                return output;
            }
            catch (Exception ex)
            {
                output.ErrorCode = LeaseOutput<List<ClaimStatusOutput>>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
        }

        public LeaseOutput<UserClaimListingModel> GetUserClaimDetails(ClaimsFilter filterModel, string currentUserId, string lang)
        {
            LeasingPortalLog log = new LeasingPortalLog();
            LeaseOutput<UserClaimListingModel> output = new LeaseOutput<UserClaimListingModel>();

            try
            {
                DateTime dtBeforeCalling = DateTime.Now;
                log.UserID = currentUserId;
                log.UserIP = Utilities.GetUserIPAddress();
                log.ServerIP = Utilities.GetInternalServerIP();
                log.UserAgent = Utilities.GetUserAgent();
                log.PageName = "GetUserClaimDetails";
                log.PageURL = "claims";
                log.ApiURL = Utilities.GetCurrentURL;
                log.MethodName = "GetUserClaimDetails";
                log.ServiceRequest = JsonConvert.SerializeObject(filterModel);

                if (currentUserId == null)
                {
                    output.ErrorCode = LeaseOutput<UserClaimListingModel>.ErrorCodes.NotAuthorized;
                    output.ErrorDescription = ProfileResources.ResourceManager.GetString("UnAuthorizedUser", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "User is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                var exception = string.Empty;
                var data = GetClaimsDataBasedOnFilter(filterModel, out exception);
                if (!string.IsNullOrEmpty(exception))
                {
                    output.ErrorCode = LeaseOutput<UserClaimListingModel>.ErrorCodes.ServiceError;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "Error happend while get claims data based on filter, and exception is: " + exception;
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (data == null)
                {
                    output.ErrorCode = LeaseOutput<UserClaimListingModel>.ErrorCodes.NullResponse;
                    output.ErrorDescription = ProfileResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "data is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                output.Result = new UserClaimListingModel();
                output.Result = data.Claims.FirstOrDefault();
                output.ErrorCode = LeaseOutput<UserClaimListingModel>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                return output;
            }
            catch (Exception ex)
            {
                output.ErrorCode = LeaseOutput<UserClaimListingModel>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
        }

        public LeaseOutput<DownloadClaimFileModel> DownloadClaimFilebyFileId(int fileId, string currentUserId, string lang)
        {
            LeasingPortalLog log = new LeasingPortalLog();
            LeaseOutput<DownloadClaimFileModel> output = new LeaseOutput<DownloadClaimFileModel>();
            DateTime dtBeforeCalling = DateTime.Now;
            log.UserID = currentUserId;
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "GetUserClaimDetails";
            log.PageURL = "claims";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "DownloadClaimFilebyFileId";
            log.ServiceRequest = $"fileId: {fileId}";

            try
            {
                if (currentUserId == null)
                {
                    output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.NotAuthorized;
                    output.ErrorDescription = ProfileResources.ResourceManager.GetString("UnAuthorizedUser", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "User is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (fileId <= 0)
                {
                    output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("EmptyInputParameter", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "fileId is <= 0";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                var policyFile = _userClaimFile.TableNoTracking.Where(a => a.Id == fileId).FirstOrDefault();
                if (policyFile == null)
                {
                    output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.NullResponse;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "fileId is <= 0";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                if (string.IsNullOrEmpty(policyFile.ClaimFilePath))
                {
                    output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.EmptyInputParamter;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("EmptyInputParameter", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = "policyFile.ClaimFilePath is null";
                    LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }

                if (_tameenkConfig.RemoteServerInfo.UseNetworkDownload)
                {
                    FileNetworkShare fileShare = new FileNetworkShare();
                    string exception = string.Empty;
                    var file = fileShare.GetFile(policyFile.ClaimFilePath, out exception);
                    if (!string.IsNullOrEmpty(exception))
                    {
                        output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.ServiceError;
                        output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                        log.ErrorCode = (int)output.ErrorCode;
                        log.ErrorDescription = "Error happend while get file data from file share, and exception is: " + exception;
                        LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                        return output;
                    }
                    if (file == null)
                    {
                        output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.NullResponse;
                        output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                        log.ErrorCode = (int)output.ErrorCode;
                        log.ErrorDescription = "Getting file from file Share return null";
                        LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                        return output;
                    }

                    output.Result = new DownloadClaimFileModel() {
                        FileData = Convert.ToBase64String(file),
                        FileExtension = policyFile.ClaimFileExtension
                    };
                    output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.Success;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                    return output;
                }

                output.Result = new DownloadClaimFileModel()
                {
                    FileData = Convert.ToBase64String(File.ReadAllBytes(policyFile.ClaimFilePath)),
                    FileExtension = policyFile.ClaimFileExtension
                };
                output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.Success;
                output.ErrorDescription = WebResources.ResourceManager.GetString("Success", CultureInfo.GetCultureInfo(lang));
                return output;
            }
            catch (Exception ex)
            {
                output.ErrorCode = LeaseOutput<DownloadClaimFileModel>.ErrorCodes.ExceptionError;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                LeasingPortalLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
        }

        #region Private Methods

        private bool validateFileFormate(byte[] fileBytes, string extension, out string exception)
        {
            exception = string.Empty;
            if (extension.ToLower() == "pdf")
            {
                bool validPdf = Utilities.IsValidPdf(fileBytes, out exception);
                if (!validPdf || !string.IsNullOrEmpty(exception))
                {
                    exception = $"file contnet is not valid as extension is:" + extension + " and exception:" + exception;
                    return false;
                }
            }
            //else
            //{
            //    bool validImage = Utilities.CheckImage(item.InputStream, out exception);
            //    if (!validImage || !string.IsNullOrEmpty(exception))
            //    {
            //        exception = $"file contnet is not valid as extension is:" + extension + " and exception:" + exception;
            //        return false;
            //    }
            //}

            return true;
        }

        private void ManageUserClaim(UserClaim claim, string userName, string bankName, out string exception, byte[] file = null, string fileName = null, string extension = null, string notes = null)
        {
            exception = string.Empty;

            try
            {
                if (claim.Id > 0)
                    _userClaim.Update(claim);
                else
                    _userClaim.Insert(claim);

                exception = string.Empty;
                var historyId = ManageUserClaimHistory(claim.Id, claim.ClaimStatusId, userName, notes, out exception);
                if (!string.IsNullOrEmpty(exception) || historyId <= 0)
                    return;

                exception = string.Empty;
                if (file != null && file.Length > 0)
                {
                    if (string.IsNullOrEmpty(extension))
                    {
                        exception = "File extension can't be null";
                        return;
                    }

                    ManageUserClaimFiles(bankName, historyId, file, fileName, extension, userName, out exception);
                    if (!string.IsNullOrEmpty(exception))
                        return;
                }
            }
            catch (Exception ex)
            {
                exception = ex.ToString();
            }
        }

        private int ManageUserClaimHistory(int claimId, int claimStatusId, string userId, string notes, out string exception)
        {
            exception = string.Empty;

            try
            {
                var claimHistory = new UserClaimHistory()
                {
                    ClaimId = claimId,
                    ClaimStatusId = claimStatusId,
                    ClaimStatusName = Enum.GetName(typeof(ClaimStatus), claimStatusId),
                    Notes = notes,
                    CreatedBy = userId,
                    CreatedDate = DateTime.Now
                };

                _userClaimHistory.Insert(claimHistory);
                return claimHistory.Id;
            }
            catch (Exception ex)
            {
                exception = ex.ToString();
                return -1;
            }
        }

        private void ManageUserClaimFiles(string bankName, int historyId, byte[] file, string fileName, string extension, string userId, out string exception)
        {
            exception = string.Empty;

            try
            {
                string path = SaveClaimFile(bankName, file, fileName, $".{extension}", out exception);
                if (!string.IsNullOrEmpty(exception) || string.IsNullOrEmpty(path))
                {
                    var history = _userClaimHistory.Table.Where(a => a.Id == historyId).FirstOrDefault();
                    var cliam = _userClaim.Table.Where(a => a.Id == history.ClaimId).FirstOrDefault();
                    if (history != null)
                        _userClaimHistory.Delete(history);
                    if (cliam != null && cliam.ClaimStatusId == (int)ClaimStatus.Registered)
                        _userClaim.Delete(cliam);
                    return;
                }

                var claimFile = new UserClaimFile()
                {
                    ClaimHistoryId = historyId,
                    ClaimFilePath = path,
                    ClaimFileName = fileName,
                    ClaimFileExtension = extension,
                    CreatedBy = userId,
                    CreatedDate = DateTime.Now
                };

                _userClaimFile.Insert(claimFile);
            }
            catch (Exception ex)
            {
                exception = ex.ToString();
            }
        }

        private string SaveClaimFile(string bankName, byte[] file, string fileName, string extension, out string exception)
        {
            exception = string.Empty;

            try
            {
                FileNetworkShare fileShare = new FileNetworkShare();
                string offerSheetDirPath = Path.Combine(Utilities.GetAppSetting("LeasingClaimFilesDirectory"), bankName, DateTime.Now.Date.Year.ToString(), DateTime.Now.Month.ToString(), DateTime.Now.Day.ToString(), DateTime.Now.Hour.ToString());
                string generatedSheetFilePath = Path.Combine(offerSheetDirPath, fileName);

                if (_tameenkConfig.RemoteServerInfo.UseNetworkDownload)
                {
                    var domain = _tameenkConfig.RemoteServerInfo.DomainName;
                    var serverIP = _tameenkConfig.RemoteServerInfo.ServerIP;
                    var username = _tameenkConfig.RemoteServerInfo.ServerUserName;
                    var password = _tameenkConfig.RemoteServerInfo.ServerPassword;

                    if (fileShare.UploadFileToShare(domain, username, password, offerSheetDirPath, generatedSheetFilePath, file, serverIP, out exception))
                        return generatedSheetFilePath;
                    else
                        return string.Empty;
                }
                else
                {
                    if (!Directory.Exists(offerSheetDirPath))
                        Directory.CreateDirectory(offerSheetDirPath);

                    File.WriteAllBytes(generatedSheetFilePath, file);
                    return generatedSheetFilePath;
                }
            }
            catch (Exception exp)
            {
                exception = exp.ToString();
                return string.Empty;
            }
        }

        private UserClaimModel GetClaimsDataBasedOnFilter(ClaimsFilter filterModel, out string exception)
        {
            exception = string.Empty;
            var dbContext = EngineContext.Current.Resolve<IDbContext>();
            try
            {
                var command = dbContext.DatabaseInstance.Connection.CreateCommand();
                command.CommandText = "GetClaimsDataBasedOnFilter";
                command.CommandType = CommandType.StoredProcedure;
                dbContext.DatabaseInstance.CommandTimeout = 120;

                if (filterModel.Id.HasValue && filterModel.Id.Value > 0)
                {
                    SqlParameter ClaimIdParameter = new SqlParameter() { ParameterName = "ClaimId", Value = filterModel.Id };
                    command.Parameters.Add(ClaimIdParameter);
                }

                if (!string.IsNullOrEmpty(filterModel.ReferenceId))
                {
                    SqlParameter ReferenceIdParameter = new SqlParameter() { ParameterName = "ReferenceId", Value = filterModel.ReferenceId };
                    command.Parameters.Add(ReferenceIdParameter);
                }

                if (!string.IsNullOrEmpty(filterModel.PolicyNo))
                {
                    SqlParameter PolicyNoParameter = new SqlParameter() { ParameterName = "PolicyNo", Value = filterModel.PolicyNo };
                    command.Parameters.Add(PolicyNoParameter);
                }

                if (!string.IsNullOrEmpty(filterModel.NationalId))
                {
                    SqlParameter NationalIdParameter = new SqlParameter() { ParameterName = "NationalId", Value = filterModel.NationalId };
                    command.Parameters.Add(NationalIdParameter);
                }

                if (filterModel.StatusId.HasValue && filterModel.StatusId.Value > 0)
                {
                    SqlParameter StatusIdParameter = new SqlParameter() { ParameterName = "StatusId", Value = filterModel.StatusId };
                    command.Parameters.Add(StatusIdParameter);
                }

                if (filterModel.RequesterTypeId.HasValue && filterModel.RequesterTypeId.Value > 0)
                {
                    SqlParameter RequesterTypeIdParameter = new SqlParameter() { ParameterName = "RequesterTypeId", Value = filterModel.RequesterTypeId };
                    command.Parameters.Add(RequesterTypeIdParameter);
                }

                if (!string.IsNullOrEmpty(filterModel.AccidentReportNumber))
                {
                    SqlParameter AccidentReportNumberParameter = new SqlParameter() { ParameterName = "AccidentReportNumber", Value = filterModel.AccidentReportNumber };
                    command.Parameters.Add(AccidentReportNumberParameter);
                }

                if (filterModel.StartDate != null && filterModel.StartDate.HasValue)
                {
                    DateTime dtStart = new DateTime(filterModel.StartDate.Value.Year, filterModel.StartDate.Value.Month, filterModel.StartDate.Value.Day, 0, 0, 0);
                    SqlParameter StartDateParameter = new SqlParameter() { ParameterName = "StartDate", Value = dtStart };
                    command.Parameters.Add(StartDateParameter);
                }

                if (filterModel.EndDate != null && filterModel.EndDate.HasValue)
                {
                    DateTime dtEnd = new DateTime(filterModel.EndDate.Value.Year, filterModel.EndDate.Value.Month, filterModel.EndDate.Value.Day, 23, 59, 59);
                    SqlParameter EndDateParameter = new SqlParameter() { ParameterName = "EndDate", Value = dtEnd };
                    command.Parameters.Add(EndDateParameter);
                }

                SqlParameter PageNumberParameter = new SqlParameter() { ParameterName = "PageNumber", Value = filterModel.PageNumber };
                command.Parameters.Add(PageNumberParameter);

                SqlParameter PageSizeParameter = new SqlParameter() { ParameterName = "PageSize", Value = filterModel.PageSize };
                command.Parameters.Add(PageSizeParameter);

                SqlParameter ExportParameter = new SqlParameter() { ParameterName = "Export", Value = filterModel.Export };
                command.Parameters.Add(ExportParameter);

                dbContext.DatabaseInstance.Connection.Open();
                var reader = command.ExecuteReader();

                List<UserClaimListingModel> claims = ((IObjectContextAdapter)dbContext).ObjectContext.Translate<UserClaimListingModel>(reader).ToList();

                if (claims == null || claims.Count <= 0)
                    return null;

                reader.NextResult();
                List<UserClaimHistoryModel> claimsHistory = ((IObjectContextAdapter)dbContext).ObjectContext.Translate<UserClaimHistoryModel>(reader).ToList();
                if (claimsHistory != null || claimsHistory.Count > 0)
                {
                    foreach (var claim in claims)
                        claim.History = claimsHistory.Where(a => a.ClaimId == claim.Id).ToList();
                }

                reader.NextResult();
                var claimsCount = ((IObjectContextAdapter)dbContext).ObjectContext.Translate<int>(reader).FirstOrDefault();

                var result = new UserClaimModel()
                {
                    Claims = claims,
                    ClaimsCount = claimsCount
                };

                return result;
            }
            catch (Exception exp)
            {
                exception = exp.ToString();
                return null;
            }
            finally
            {
                if (dbContext.DatabaseInstance.Connection.State == ConnectionState.Open)
                    dbContext.DatabaseInstance.Connection.Close();
            }
        }

        #endregion
    }
}
