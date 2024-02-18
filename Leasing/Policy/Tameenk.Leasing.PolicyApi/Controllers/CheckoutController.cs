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
using Tameenk.Api.Core.Models;
using Tameenk.Services.Checkout.Components.Output;
using Tameenk.Core.Domain.Dtos;
using Tameenk.Leasing.IdentityApi.Output;
using Tameenk.Resources.WebResources;
using Tameenk.Services.Core.Payments;
using Tameenk.Core.Domain.Enums.Payments;
using System.Web;
using Tameenk.Services;
using Tameenk.Resources.Checkout;

namespace Tameenk.Leasing.PolicyApi.Controllers
{
    [Authorize]
    public class CheckoutController : BaseApiController
    {

        private readonly IAuthorizationService _authorizationService;
        private readonly ICheckoutContext _checkoutContext;
        private readonly IPaymentService _paymentService;

        public CheckoutController(IAutoleasingInquiryContext autoleasingInquiryContext, IAuthorizationService authorizationService, ICheckoutContext checkoutContext,
            IPaymentService paymentService)
        {
            _checkoutContext = checkoutContext;
            _authorizationService = authorizationService ?? throw new ArgumentNullException(nameof(authorizationService));
            _paymentService = paymentService;
        }

        [HttpPost]
        [Route("api/checkout/addItemToCart")]
        public IHttpActionResult AddItemToCartLeasing([FromBody] AddILeasingtemToCartModel model)
        {
            Output<CheckoutOutput> output = new Output<CheckoutOutput>();
            output.Result = new CheckoutOutput();

            CheckoutRequestLog log = new CheckoutRequestLog();
            log.ServiceRequest = JsonConvert.SerializeObject(model);
            AddBasicLog(log, ((!string.IsNullOrEmpty(model.Channel)) ? model.Channel : Channel.Leasing.ToString()), model.MethodName,
                        Utilities.GetInternalServerIP(), Utilities.GetUserAgent(), Utilities.GetUserIPAddress(), Utilities.GetUrlReferrer());

            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                    currentUserId = User.Identity.GetUserId();

                if (string.IsNullOrEmpty(currentUserId))
                {
                    output.ErrorCode = Output<CheckoutOutput>.ErrorCodes.NotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("UserNotExist", CultureInfo.GetCultureInfo(model.Lang));
                    log.ErrorCode = (int)Output<AddItemToCartModel>.ErrorCodes.NotFound;
                    log.ErrorDescription = "User Id is Null";
                    CheckoutRequestLogDataAccess.AddCheckoutRequestLog(log);
                    return Single(output);
                }
                log.UserId = currentUserId;

                var checkoutOutput = _checkoutContext.AddLeasingItemToCart(model, log, model.Lang);
                output.ErrorCode = (Output<CheckoutOutput>.ErrorCodes)checkoutOutput.ErrorCode;
                output.ErrorDescription = checkoutOutput.ErrorDescription;

                if (checkoutOutput.ErrorCode != CheckoutOutput.ErrorCodes.Success)
                    return Single(output);

                output.Result = checkoutOutput;
                return Single(output);
            }
            catch (Exception ex)
            {
                output.ErrorCode = Output<CheckoutOutput>.ErrorCodes.ServiceException;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(model.Lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                CheckoutRequestLogDataAccess.AddCheckoutRequestLog(log);
                return Single(output);
            }
        }

        [HttpPost]
        [Route("api/checkout/submitCheckoutDetails")]
        public IHttpActionResult SubmitCheckoutDetails([FromBody] Tameenk.Models.Checkout.CheckoutModel model, string lang = "en")
        {
            CheckoutOutput output = new CheckoutOutput();
            CheckoutRequestLog log = new CheckoutRequestLog();
            log.ServiceRequest = JsonConvert.SerializeObject(model);

            var service = GetSubmitCheckoutService(model.LeasingServiceId);
            var channel = (!string.IsNullOrEmpty(model.Channel)) ? model.Channel : Channel.Leasing.ToString();
            var methodName = (service == CheckoutProviderServicesCodes.PurchaseDriver) ? "PurchaseDriver" : "PurchaseBenefit";
            AddBasicLog(log, channel, methodName, Utilities.GetInternalServerIP(), Utilities.GetUserAgent(), Utilities.GetUserIPAddress(), Utilities.GetUrlReferrer());

            if (model.LeasingServiceId != (int)CheckoutProviderServicesCodes.PurchaseBenefit && model.LeasingServiceId != (int)CheckoutProviderServicesCodes.PurchaseDriver)
            {
                output.ErrorCode = CheckoutOutput.ErrorCodes.InvalidService;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ErrorGeneric", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)Output<AddItemToCartModel>.ErrorCodes.NotFound;
                log.ErrorDescription = $"Invalid Submit Checkout Service as serviceId passed is: {model.LeasingServiceId}";
                CheckoutRequestLogDataAccess.AddCheckoutRequestLog(log);
                return Single(output);
            }

            try
            {
                string currentUserId = _authorizationService.GetUserId(User);
                if (string.IsNullOrEmpty(currentUserId))
                    currentUserId = User.Identity.GetUserId();

                if (string.IsNullOrEmpty(currentUserId))
                {
                    output.ErrorCode = CheckoutOutput.ErrorCodes.UserNotFound;
                    output.ErrorDescription = WebResources.ResourceManager.GetString("UserNotExist", CultureInfo.GetCultureInfo(lang));
                    log.ErrorCode = (int)Output<AddItemToCartModel>.ErrorCodes.NotFound;
                    log.ErrorDescription = "User Id is Null";
                    CheckoutRequestLogDataAccess.AddCheckoutRequestLog(log);
                    return Single(output);
                }
                log.UserId = currentUserId;
                model.UserId = currentUserId;

                var language = GetCurrentLanguage(lang);
                output = _checkoutContext.SubmitLeasingCheckoutDetails(model, log, language);
                if (output.ErrorCode != CheckoutOutput.ErrorCodes.Success)
                    return Single(output);

                decimal paymentAmount = output.CheckoutModel.PaymentAmount;
                output.CheckoutModel = null;
                if (paymentAmount > 0)
                {
                    output.CheckoutModel = new Tameenk.Models.Checkout.CheckoutModel();
                    output.CheckoutModel.PaymentAmount = paymentAmount;
                }

                return Single(output);
            }
            catch (Exception ex)
            {
                output.ErrorCode = CheckoutOutput.ErrorCodes.ServiceException;
                output.ErrorDescription = WebResources.ResourceManager.GetString("ExceptionError", CultureInfo.GetCultureInfo(lang));
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = ex.ToString();
                CheckoutRequestLogDataAccess.AddCheckoutRequestLog(log);
                return Single(output);
            }
        }

        [HttpGet]
        [Route("api/checkout/paymentmethods")]
        public IHttpActionResult GetAllPaymentMethodByChannel(string channel, string lang, bool showWalletPaymentOption = false)
        {
            try
            {
                if (string.IsNullOrEmpty(channel))
                    return Error("channel is null or empty");

                List<Tameenk.Core.Domain.Entities.Payments.PaymentMethod> result = null;
                if (channel.ToLower() == "ios")
                    result = _paymentService.GetActivePaymentMethod().Where(a => a.IosEnabled == true).ToList();
                else if (channel.ToLower() == "android")
                    result = _paymentService.GetActivePaymentMethod().Where(a => a.AndroidEnabled == true).ToList();
                else
                    result = _paymentService.GetActivePaymentMethod();

                if (!showWalletPaymentOption)
                    result = result.Where(p => p.Code != (int)PaymentMethodCode.Wallet).ToList();

                if (result == null)
                    return Error("No Payment Method Available");

                //if (channel.ToLower() == "leasing")
                //{
                //    var deviceInfo = Utilities.GetDeviceInfo();
                //    if (deviceInfo != null && !string.IsNullOrEmpty(deviceInfo.Client) && !string.IsNullOrEmpty(deviceInfo.OS) && deviceInfo.Client.ToLower().Contains("safari"))
                //    {
                //        // same payment methods with no change
                //    }
                //    else
                //    {
                //        // get all except apple pay
                //        result = result.Where(p => p.Code != (int)PaymentMethodCode.ApplePay).ToList();
                //    }
                //}

                result = result.Where(p => p.Code != (int)PaymentMethodCode.ApplePay && p.Code != (int)PaymentMethodCode.Sadad && p.Code != (int)PaymentMethodCode.Tabby).ToList();

                List<Tameenk.Core.Domain.Dtos.PaymentMethodModel> methods = new List<Tameenk.Core.Domain.Dtos.PaymentMethodModel>();
                foreach (var item in result)
                {
                    Tameenk.Core.Domain.Dtos.PaymentMethodModel method = new Tameenk.Core.Domain.Dtos.PaymentMethodModel();
                    method.Active = item.Active;
                    method.Code = item.Code;
                    method.Name = item.Name;
                    method.Order = item.Order;
                    method.Brands = item.Brands;
                    method.LogoUrl = item.LogoUrl;
                    method.EnglishDescription = item.EnglishDescription;
                    method.ArabicDescription = item.ArabicDescription;
                    methods.Add(method);
                }
                return Single(methods);
            }
            catch (Exception ex)
            {
                return Error(ex.ToString());
            }
        }

        [HttpPost]
        [Route("api/checkout/paymentUsingHyperpay")]
        public IHttpActionResult PaymentUsingHyperpay(string referenceId, string QtRqstExtrnlId, string productId, string selectedProductBenfitId, string hashed, int paymentMethodCode, string channel, string lang)
        {
            try
            {
                string userId = _authorizationService.GetUserId(User);
                var output = _checkoutContext.PaymentUsingHyperpayLeasing(referenceId, QtRqstExtrnlId, productId, selectedProductBenfitId, hashed, paymentMethodCode, channel, lang, userId);
                if (output.ErrorCode != CheckoutOutput.ErrorCodes.Success)
                    return Error(output);
                return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.ToString());
            }
        }

        [HttpGet]
        [Route("api/checkout/hyperpayProcessPayment")]
        public IHttpActionResult HyperpayProcessPayment(string id, string channel, string lang)
        {
            string userId = _authorizationService.GetUserId(User);
            Guid uId = Guid.Empty;
            Guid.TryParse(userId, out uId);

            try
            {
                var output = _checkoutContext.ProcessHyperpayPayment(id, lang, channel, uId, (int)PaymentMethodCode.Hyperpay);
                if (output.ErrorCode != HyperPayOutput.ErrorCodes.Success)
                    return Error(output);
                return Single(output);
            }
            catch (Exception ex)
            {
                CheckoutOutput output = new CheckoutOutput();
                output.ErrorCode = CheckoutOutput.ErrorCodes.ServiceException;
                output.ErrorDescription = CheckoutResources.InvalidPayment;
                return Error(output);
            }
        }

        [HttpPost]
        [Route("api/Checkout/PaymentUsingApplePay")]
        public ApplePaySessionResponseModel PaymentUsingApplePay(string referenceId, string QtRqstExtrnlId, string productId, string selectedProductBenfitId, string hashed, int paymentMethodCode, string channel, string lang)
        {
            try
            {
                string userId = _authorizationService.GetUserId(User);
                var output = _checkoutContext.PaymentUsingApplePay(referenceId, QtRqstExtrnlId, productId, selectedProductBenfitId, hashed, paymentMethodCode, channel, lang, userId);
                if (output.ErrorCode != ApplePayOutput.ErrorCodes.Success)
                    return null;
                return output.Result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("api/Checkout/processapplepaypayment")]
        public IHttpActionResult ProcessApplePayPayment()
        {
            try
            {
                if (Request.Content.IsMimeMultipartContent())
                {
                    string referenceId = HttpContext.Current.Request.Form[0];
                    string paymentToken = HttpContext.Current.Request.Form[1];
                    var lang = GetCurrentLanguage(HttpContext.Current.Request.Form[2]);
                    string userId = _authorizationService.GetUserId(User);
                    var output = _checkoutContext.ApplePayProcessPayment(referenceId, paymentToken, lang.ToString(), userId);
                    if (output.ErrorCode != ApplePayOutput.ErrorCodes.Success)
                        return Error(output);
                    return Single(output);
                }
                return Error("invalid request");
            }
            catch (Exception ex)
            {
                return Error(ex.ToString());
            }
        }

        #region Private Methods

        private void AddBasicLog(CheckoutRequestLog log, string channel, string methodName, string serverIP, string userAgent, string userIP, string requesterUrl)
        {
            log.Channel = channel;
            log.MethodName = methodName;
            log.ServerIP = serverIP;
            log.UserAgent = userAgent;
            log.UserIP = userIP;
            log.RequesterUrl = requesterUrl;
        }

        private LanguageTwoLetterIsoCode GetCurrentLanguage(string lang = "en")
        {
            return lang.ToLower() == "en" ? LanguageTwoLetterIsoCode.En : LanguageTwoLetterIsoCode.Ar;
        }

        private CheckoutProviderServicesCodes GetSubmitCheckoutService(int serviceId)
        {
            return serviceId == 2 ? CheckoutProviderServicesCodes.PurchaseBenefit : CheckoutProviderServicesCodes.PurchaseDriver;
        }

        #endregion
    }
}
