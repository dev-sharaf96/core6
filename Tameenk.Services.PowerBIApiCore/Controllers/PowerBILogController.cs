using System;
using Tameenk.Core.Data;
using Tameenk.Loggin.DAL;
using Tameenk.Security.CustomAttributes;
using Tameenk.Services.PowerBI.Component;
using Tameenk.Services.PowerBIApi.Models;
using Tameenk.Core.Domain.Entities;
using System.Linq;
using Tameenk.Common.Utilities;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Tameenk.Services.PowerBIApi.Controllers
{
    [IntegrationPowerBIAttribute]
    [ApiController]
    [Route("api/[controller]")]
    public class PowerBIController : ControllerBase
    {
        private readonly IPowerBIContext _PowerBIContext;

        public PowerBIController(IPowerBIContext PowerBIContext, IRepository<InsuranceCompany> InsuranceCompanyRepository)
        {
            _PowerBIContext = PowerBIContext;
        }
        [HttpGet]
        [Route("~/api/GetAllServices")]
        public IActionResult GetAllServices(string companyKey, string method, string channel)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            QuotationOutputModel output = new QuotationOutputModel();
            PowerBIServicesLog log = new PowerBIServicesLog();
            log.Method = method;
            log.CompanyKey = companyKey;
            log.Channel = channel;
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.Headers["User-Agent"].ToString() = Utilities.GetUserAgent();
            log.StartDate = DateTime.Now.Date.AddDays(-7);
            log.EndDate = DateTime.Now.Date.AddDays(-1);
            try
            {
                string exception = string.Empty;
                var result = _PowerBIContext.GetAllServiceLog(method, companyKey, DateTime.Now.Date.AddDays(-7), DateTime.Now.Date.AddDays(-1), out exception);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                if (result == null || !string.IsNullOrEmpty(exception))
                {
                    output.ErrorCode = QuotationOutputModel.ErrorCodes.ServiceException;
                    output.ErrorDescription = "No Result found";
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.ErrorDescription + " exception is  " + exception;
                    PowerBILogDataAccess.AddToPowerBILogDataAccess(log);
                    return Ok(output);
                }
                log.TotalRecord = (method.ToLower() == "quotation") ? result.QuotationserviceLogs.Count() : result.PolicyserviceLogs.Count();
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                PowerBILogDataAccess.AddToPowerBILogDataAccess(log);
                if (method.ToLower() == "quotation")
                    return Ok(result.QuotationserviceLogs);
                else
                    return Ok(result.PolicyserviceLogs);

            }
            catch (Exception ex)
            {
                output.ErrorCode = QuotationOutputModel.ErrorCodes.ExceptionError;
                output.ErrorDescription = "an error has occured";
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                PowerBILogDataAccess.AddToPowerBILogDataAccess(log);
                return Ok(output);
            }
        }

        [HttpGet]
        [Route("~/api/GetAVGResponses")]
        public IActionResult GetAVGResponses(int InsuranceTypeId, int ModuleId, int StatusCode)
        {
            return Ok(_PowerBIContext.GetAvgResponse(InsuranceTypeId, ModuleId, StatusCode));
        }
    }
}