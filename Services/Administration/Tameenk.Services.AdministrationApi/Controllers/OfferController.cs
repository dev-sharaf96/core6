using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using Tameenk.Api.Core;
using Tameenk.Api.Core.Models;
using Tameenk.Services.AdministrationApi.Models;
using Tameenk.Loggin.DAL;
using Tameenk.Common.Utilities;
using Microsoft.AspNet.Identity;
using Tameenk.Services.Administration.Identity.Core.Servicies; 
using Newtonsoft.Json; 
using Tameenk.Core.Domain.Entities;
using Tameenk.Services.AdministrationApi.Extensions;
using Tameenk.Services.Generic.Component;
using Tameenk.Services.Administration.Identity;

namespace Tameenk.Services.AdministrationApi.Controllers
{
    /// <summary>
    /// Offer Controller
    /// </summary>
    
    [AdminAuthorizeAttribute(pageNumber: 20)]
    public class OfferController : AdminBaseApiController
    {


        #region Fields
        private readonly IGenericContext _genericContext;
        private readonly IUserPageService _userPageService;
        #endregion


        #region Ctor
        /// <summary>
        /// The constructor.
        /// </summary>
        /// <param name="genericContext">The generic Service.</param>
        /// <param name="webApiContext">Web api Context</param> 
        public OfferController(IGenericContext genericContext, IUserPageService userPageService)
        {
            _genericContext = genericContext;
            _userPageService = userPageService;
        }

        #endregion


        #region methods
        /// <summary>
        /// get all Offer
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Offer/all-offers")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<IEnumerable<OfferModel>>))]
        public IHttpActionResult GetAllOffer(int pageIndex = 0, int pageSize = int.MaxValue)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Manage Offer";
            log.PageURL = "manage-ffer";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "GetAllOffer";
            log.ServiceRequest = $"pageIndex: {pageIndex}, pageSize: {pageSize}";
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
                var isAuthorized = _userPageService.IsAuthorizedUser(20, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                var result = _genericContext.GetOffers(pageIndex , pageSize); 
                var dataModel = result.Select(e => new OfferModel {
                    Id = e.Id,
                    IsDeleted = e.IsDeleted,
                    TextAr = e.TextAr,
                    TextEn = e.TextEn ,
                    Image = e.Image
                });
                return Ok(dataModel, result.Count());
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
        /// Add new offer
        /// </summary>
        /// <param name="model">OfferModel</param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/offer/add")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<OfferModel>))]
        public IHttpActionResult AddOffer([FromBody]OfferModel model)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Manage Offer";
            log.PageURL = "manage-offer";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "AddOffer";
            log.ServiceRequest = JsonConvert.SerializeObject(model);
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
                var isAuthorized = _userPageService.IsAuthorizedUser(20, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (model == null)
                {
                    return Error("The Object is Null.");
                }
                Offer offer = new Offer {
                    IsDeleted= false ,
                    CreatedDateTime = DateTime.Now, 
                    Createdby= User.Identity.GetUserId(),
                    TextAr= model.TextAr,
                    TextEn= model.TextEn,
                    Image =model.Image
                };
                offer = _genericContext.AddOffer(offer);              
                var res = offer.ToModel();
                return Ok(res);
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
        /// Edit OfferModel 
        /// </summary>
        /// <param name="model">Offer Model</param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/offer/edit")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<OfferModel>))]
        public IHttpActionResult EditOffer([FromBody]OfferModel model)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Manage Offer";
            log.PageURL = "manage-offer";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "EditOffer";
            log.ServiceRequest = JsonConvert.SerializeObject(model);
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
                var isAuthorized = _userPageService.IsAuthorizedUser(20, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (model == null)
                {
                    return Error("The Object is Null.");
                }
                Offer offer = new Offer
                {
                    IsDeleted = false,
                    ModifiedDate = DateTime.Now,
                    Createdby = User.Identity.GetUserId(),
                    Id= model.Id,
                    Image =model.Image,                    
                    TextAr = model.TextAr,
                    TextEn = model.TextEn
                };
                offer = _genericContext.UpdateOffer(offer);
                model = offer.ToModel();
                return Ok(model);
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
        /// ActivateDeActivateOffer OfferModel 
        /// </summary>
        /// <param name="model">Delete Offer Model</param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/offer/change-status")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<OfferModel>))]
        public IHttpActionResult ActivateDeActivateOffer([FromBody]DeleteOfferModel model)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Manage Offer";
            log.PageURL = "manage-offer";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "ActivateDeActivateOffer";
            log.ServiceRequest = JsonConvert.SerializeObject(model);
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
                var isAuthorized = _userPageService.IsAuthorizedUser(20, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (model == null)
                {
                    return Error("The Object is Null.");
                }                 
                var offer = _genericContext.ActivateDeActivateOffer(model.Id, model.IsDeleted);
                var Result = offer.ToModel();
                return Ok(Result);
            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }
        }
        
        #endregion
    }
}
