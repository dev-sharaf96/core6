using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Tameenk.Core.Exceptions;
using Tameenk.Services.Core.Drivers;
using Swashbuckle.Swagger.Annotations;
using Tameenk.Api.Core;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Domain.Entities;
using Tameenk.Services.Core.InsuranceCompanies;
using Tameenk.Services.AdministrationApi.Extensions;
using Tameenk.Services.AdministrationApi.Models;
using Tameenk.Core.Domain.Enums;
using Tameenk.Api.Core.Context;
using System.Net.Http.Headers;
using Tameenk.Core.Configuration;
using Tameenk.Services.Core.Files;
using Newtonsoft.Json;
using Tameenk.Services.Core.Http;
using System.Threading.Tasks;
using Tameenk.Core.Domain.Entities.VehicleInsurance;
using Tameenk.Services.Core.Addresses;
using Microsoft.AspNet.Identity;
using Tameenk.Services.Administration.Identity.Core.Servicies;
using Tameenk.Common.Utilities;
using Tameenk.Loggin.DAL;
using Tameenk.Services.Administration.Identity;
using System.Globalization;
using Tameenk.Resources.WebResources;

namespace Tameenk.Services.AdministrationApi.Controllers
{
    /// <summary>
    /// Insured Controller
    /// </summary>
    [AdminAuthorizeAttribute(pageNumber: 22)]
    public class DriverController : AdminBaseApiController
    {

        #region Fields
        private readonly IDriverService _driverService;
        private readonly IAddressService _addressService;
        private readonly IUserPageService _userPageService;
        #endregion


        #region The Constructor 

        /// <summary>
        /// The Constructor  .
        /// </summary>
        /// <param name="driverService">driver service</param>
        public DriverController(IDriverService driverService, IAddressService addressService, IUserPageService userPageService)
        {
            _driverService = driverService ?? throw new TameenkArgumentNullException(nameof(IDriverService));
            _addressService = addressService ?? throw new TameenkArgumentNullException(nameof(IAddressService));
            _userPageService = userPageService ?? throw new TameenkArgumentNullException(nameof(IUserPageService));
        }
        #endregion

        #region Methods 


        /// <summary>
        /// Get Driver With NIN
        /// </summary>
        /// <param name="driverFilterModel"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/driver/GetDriverWithNIN")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<IList<DriverModel>>))]
        public IHttpActionResult GetDriversWithNIN(string NIN)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Drivers";
            log.PageURL = "/admin/drivers";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "GetDriversWithNIN";
            log.ServiceRequest = $"NIN: {NIN}";
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {

                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(22, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized");
                }
                Driver result = _driverService.GetDriverByNin(NIN);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                int totalCount = 0;
                List<DriverModel> list = new List<DriverModel>();
                if (result != null)
                {
                    totalCount = 1;
                    list.Add(result.ToModel());
                }
                return Ok(list, totalCount);
            }

            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }
        }

        /// <summary>
        /// Edit driver 
        /// </summary>
        /// <param name="driverModel">driver Model</param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/driver/edit")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<DriverModel>))]
        public IHttpActionResult Editdriver([FromBody]DriverModel driverModel)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Driver Info";
            log.PageURL = "/admin/drivers/edit";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "Editdriver";
            log.ServiceRequest = JsonConvert.SerializeObject(driverModel);
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {

                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(22, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (driverModel == null)
                {
                    return Error("The Object is Null.");
                }

                if (string.IsNullOrEmpty(driverModel.DriverId))
                    throw new TameenkArgumentNullException("The driver Id Can't be Null.");

                Guid guid = new Guid();
                if (!Guid.TryParse(driverModel.DriverId, out guid))
                {
                    throw new TameenkArgumentException("The driver Id is not vaild id.", "driverId");
                }


                Driver driver = _driverService.GetDriver(driverModel.DriverId);


                if (driver == null)
                    throw new TameenkArgumentException("The driver not exists.", "driverId");


                driver = driverModel.ToEntity(driver);

                _driverService.UpdateDriver(driver);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(driverModel);
            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }

        }


        [HttpPost]
        [Route("api/driver/editCity")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<DriverModel>))]
        public IHttpActionResult EditdriverCity([FromBody]DriverModel driverModel)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Driver Info";
            log.PageURL = "/admin/drivers/edit";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "EditdriverCity";
            log.ServiceRequest = JsonConvert.SerializeObject(driverModel);
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {

                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(22, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (driverModel == null)
                {
                    return Error("The Object is Null.");
                }

                if (string.IsNullOrEmpty(driverModel.DriverId))
                    throw new TameenkArgumentNullException("The driver Id Can't be Null.");

                Guid guid = new Guid();
                if (!Guid.TryParse(driverModel.DriverId, out guid))
                {
                    throw new TameenkArgumentException("The driver Id is not vaild id.", "driverId");
                }


                Driver driver = _driverService.GetDriver(driverModel.DriverId);

                driver.CityId = driverModel.CityId;
                driver.WorkCityId = driverModel.WorkCityId;

                _driverService.UpdateDriver(driver);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(driverModel);
            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }

        }

        /// <summary>
        /// get all details to specific driver by id
        /// </summary>
        /// <param name="id">driver id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/driver/details")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<DriverModel>))]
        public IHttpActionResult GetDriverDetails(string id)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Driver Info";
            log.PageURL = "/admin/drivers/edit";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "GetDriverDetails";
            log.ServiceRequest = $"id: {id}";
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {

                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(22, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (string.IsNullOrEmpty(id))
                    throw new TameenkArgumentNullException("driver id can't be null.");

                Driver driver = _driverService.GetDriver(id);

                if (driver == null)
                {
                    throw new TameenkArgumentException("driver not found ", "driverId");
                }
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(driver.ToModel());

            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }
        }

        /// <summary>
        /// delete driver ( Mark driver as deleted from DB ) 
        /// </summary>
        /// <param name="id">driver ID</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/driver/delete")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<bool>))]
        public IHttpActionResult DeleteDriver(string id)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Driver Info";
            log.PageURL = "/admin/drivers/edit";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "DeleteDriver";
            log.ServiceRequest = $"id: {id}";
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {

                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(22, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (string.IsNullOrEmpty(id))
                    throw new TameenkArgumentNullException("driver id can't be null.");

                Driver driver = _driverService.GetDriver(id);

                if (driver == null)
                {
                    throw new TameenkArgumentException("Driver not found ", "driverId");
                }

                _driverService.DeleteDriver(driver);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok();

            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }

        }

        /// <summary>
        /// Get Driver Address with driver id
        /// </summary>
        /// <param name="id">driver id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/driver/GetDriverAddress")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<AddressModel>))]
        public IHttpActionResult GetDriverAddress(string id)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Driver Info";
            log.PageURL = "/admin/drivers/edit";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "GetDriverAddress";
            log.ServiceRequest = $"id: {id}";
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {

                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(22, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (string.IsNullOrEmpty(id))
                    throw new TameenkArgumentNullException("driver id can't be null.");

                Guid driverId = Guid.Empty;
                Guid.TryParse(id,out driverId);
                Driver driver = _driverService.GetDriver(id);
                if (driver == null)
                {
                    log.ErrorCode = 15;
                    log.ErrorDescription = "driver is null as we receive id " + id;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("driver is null");
                }
                log.DriverNin = driver.NIN;
                List<Address> addresses = _addressService.GetAllAddressesByNin(driver.NIN);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(addresses.Select(a=>a.ToModel()));

            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }
        }

        /// <summary>
        /// delete driver (Mark all driver rows as deleted from DB) 
        /// </summary>
        /// <param name="nin">driver nin</param>
        /// <param name="lang">lang</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/driver/deleteDriverbyNin")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<bool>))]
        public IHttpActionResult DeleteDriverWithNin(string nin, string lang)
        {
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Driver Info";
            log.PageURL = "/admin/drivers";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "DeleteDriverByNin";
            log.ServiceRequest = $"nin: {nin}, lang: {lang}";
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {
                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error(WebResources.ResourceManager.GetString("NotAuthorized", CultureInfo.GetCultureInfo(lang)));
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error(WebResources.ResourceManager.GetString("NotAuthorized", CultureInfo.GetCultureInfo(lang)));
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(22, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 4;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error(WebResources.ResourceManager.GetString("NotAuthorized", CultureInfo.GetCultureInfo(lang)));
                }
                if (string.IsNullOrEmpty(nin))
                {
                    log.ErrorCode = 5;
                    log.ErrorDescription = "driver nin is empty";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error(WebResources.ResourceManager.GetString("ErrorGeneric", CultureInfo.GetCultureInfo(lang)));
                }

                string exception = string.Empty;
                DateTime dtBeforeCalling = DateTime.Now;
                var result = _driverService.DeleteAllDriverRowsByNin(nin, out exception);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                if (!result || !string.IsNullOrEmpty(exception))
                {
                    log.ErrorCode = 400;
                    log.ErrorDescription = "Error happend while mark all driver rows as deleted, and error is: " + exception;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error(WebResources.ResourceManager.GetString("ErrorGeneric", CultureInfo.GetCultureInfo(lang)));
                }

                log.ErrorCode = 1;
                log.ErrorDescription = WebResources.ResourceManager.GetString("ErrorGeneric", CultureInfo.GetCultureInfo(lang));
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(true);
            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error(WebResources.ResourceManager.GetString("ErrorGeneric", CultureInfo.GetCultureInfo(lang)));
            }
        }

        #endregion 

    }
}
