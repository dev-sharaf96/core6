﻿using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using Tameenk.Core;
using Tameenk.Core.Configuration;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Entities.Policies;
using Tameenk.Core.Infrastructure;
using Tameenk.Integration.Core.Providers;
using Tameenk.Integration.Core.Providers.Configuration;
using Tameenk.Integration.Dto.Providers;
using Tameenk.Loggin.DAL;
using Tameenk.Services.Logging;
using System.Linq;
using System.Net.Http.Headers;
using Tameenk.Services.Core.Http;
using Tameenk.Services;
using DocumentFormat.OpenXml.Office2021.DocumentTasks;
using System.Threading.Tasks;

namespace Tameenk.Integration.Providers.TUIC
{
    public class TUICInsuranceProvider : RestfulInsuranceProvider
    {
        private readonly RestfulConfiguration _restfulConfiguration;
        private readonly HttpClient _httpClient;
        private readonly string _accessTokenBase64;
        private readonly IQuotationConfig _quotationConfig;

        private readonly IRepository<PolicyProcessingQueue> _policyProcessingQueueRepository;

        public TUICInsuranceProvider(IQuotationConfig quotationConfig, IRepository<PolicyProcessingQueue> policyProcessingQueueRepository)
            : base(quotationConfig, new RestfulConfiguration()
            {
                ProviderName = "TUIC",
                GenerateQuotationUrl = "https://localhost:7267/LimraBcareLive/API/MotorService/Quote",// "https://asasagg.aletihad.sa/LimraBcareLive/API/MotorService/Quote",
            AccessToken = "ETIHAD_BCARE:Pa$$w0rdbcareLive@2023",
            GeneratePolicyUrl = "https://asasagg.aletihad.sa/LimraBcareLive/API/MotorService/TPLPolicy",
            GenerateClaimRegistrationUrl = "",
            GenerateClaimNotificationUrl = "",
        },policyProcessingQueueRepository)
        {
            _restfulConfiguration = Configuration as RestfulConfiguration;
            _accessTokenBase64 = _restfulConfiguration.AccessToken;
            _policyProcessingQueueRepository = policyProcessingQueueRepository;
            _quotationConfig = quotationConfig;
            _httpClient = new HttpClient(); 
        }

        protected override async Task< object> ExecuteQuotationRequest(QuotationServiceRequest quotation, ServiceRequestLog predefinedLogInfo)
        {
            ServiceOutput output = await SubmitQuotationRequest(quotation, predefinedLogInfo);
            if (output.ErrorCode != ServiceOutput.ErrorCodes.Success)
                return null;
            return output.Output;
        }

        protected override async Task<ServiceOutput> SubmitQuotationRequest(QuotationServiceRequest quotation, ServiceRequestLog log)
        {
            ServiceOutput output = new ServiceOutput();
            log.ReferenceId = quotation.ReferenceId;
            if (string.IsNullOrEmpty(log.Channel))
                log.Channel = "Portal";
            //log.UserName = "";
            log.ServiceURL = _restfulConfiguration.GenerateQuotationUrl;
            log.ServerIP = ServicesUtilities.GetServerIP();
            log.Method = "Quotation";
            //log.CompanyID = insur;
            log.CompanyName = _restfulConfiguration.ProviderName;
            log.VehicleMaker = quotation?.VehicleMaker;
            log.VehicleMakerCode = quotation?.VehicleMakerCode;
            log.VehicleModel = quotation?.VehicleModel;
            log.VehicleModelCode = quotation?.VehicleModelCode;
            log.VehicleModelYear = quotation?.VehicleModelYear;

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
                //stringPayload = JsonConvert.SerializeObject(quotation);
                //var httpContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");
                DateTime dtBeforeCalling = DateTime.Now;
                //var postTask = _httpClient.PostAsync(_restfulConfiguration.GenerateQuotationUrl, httpContent, Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(_restfulConfiguration.AccessToken)), authorizationMethod: "Basic");
                //postTask.Wait();

                var requestContent = new StringContent(JsonConvert.SerializeObject(quotation), Encoding.UTF8, "application/json");
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", _accessTokenBase64);
                var postTask = _httpClient.PostAsync(_restfulConfiguration.GenerateQuotationUrl, requestContent);
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
                    //ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return output;
                }
                //if (response.StatusCode != System.Net.HttpStatusCode.OK)
                //{
                //    output.ErrorCode = ServiceOutput.ErrorCodes.HttpStatusCodeNotOk;
                //    output.ErrorDescription = "Http Status Code is Not Ok";
                //    log.ErrorCode = (int)output.ErrorCode;
                //    log.ErrorDescription = output.ErrorDescription;
                //    log.ServiceErrorCode = log.ErrorCode.ToString();
                //    log.ServiceErrorDescription = log.ServiceErrorDescription;
                //    ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                //    return output;
                //}
                if (response.Result.Content == null)
                {
                    output.ErrorCode = ServiceOutput.ErrorCodes.NullResponse;
                    output.ErrorDescription = "Service response content return null";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription;
                    log.ServiceErrorCode = log.ErrorCode.ToString();
                    log.ServiceErrorDescription = log.ServiceErrorDescription;
                    //ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
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
                    //ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
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
                    //ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
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
                //return response;
            }
            catch (Exception ex)
            {
                output.ErrorCode = ServiceOutput.ErrorCodes.ServiceException;
                output.ErrorDescription = ex.ToString();
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = output.ErrorDescription;
                //ServiceRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return output;
            }
        }

        protected override object ExecutePolicyRequest(PolicyRequest policy, ServiceRequestLog predefinedLogInfo)
        {
            ServiceOutput output = SubmitPolicyRequest(policy, predefinedLogInfo);
            if (output.ErrorCode != ServiceOutput.ErrorCodes.Success)
                return null;
            return output.Output;
        }

        protected override ServiceOutput SubmitPolicyRequest(PolicyRequest policy, ServiceRequestLog log)
        {
            ServiceOutput output = new ServiceOutput();

            log.ReferenceId = policy.ReferenceId;
            log.Channel = "Portal";
            //log.UserName = "";
            log.ServiceURL = _restfulConfiguration.GeneratePolicyUrl;
            log.ServiceRequest = JsonConvert.SerializeObject(policy);
            log.ServerIP = ServicesUtilities.GetServerIP();
            log.Method = "Policy";
            //log.CompanyID = insur;
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
                var client = new HttpClient();
                client.Timeout = TimeSpan.FromMinutes(4);
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(_accessTokenBase64)));
                var postTask = client.PostAsync(_restfulConfiguration.GeneratePolicyUrl, httpContent);
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
    }
}
