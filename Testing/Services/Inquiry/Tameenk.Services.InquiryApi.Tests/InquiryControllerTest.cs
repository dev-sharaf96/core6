using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Tameenk.Api.Core.ActionResults;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.InquiryGateway.Controllers;
using Tameenk.Services.InquiryGateway.Infrastructure;
using Tameenk.Services.InquiryGateway.Models;
using Tameenk.Testing.Core;

namespace Tameenk.Services.InquiryApi.Tests
{
    [TestClass]
    public class InquiryControllerTest : BaseTestClass
    {

        #region Ctor
        public InquiryControllerTest()
        {
            AutoMapperConfiguration.Init();
        }
        #endregion


        #region Methods

        #region Get Quotation Request

        [TestMethod]
        public void Test_GetQuotationRequest_WithId()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string externalId = "33f6971819fc428";
            var result = inquiryController.GetQuotationRequest(externalId) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetQuotationRequest_WithoutId()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string externalId = "";
            var result = inquiryController.GetQuotationRequest(externalId) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: externalId");
        }

        #endregion

        #region Get Vehicle For user

        [TestMethod]
        public void Test_GetVehicleForUser_WithVaildId()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = inquiryController.GetVehicleForUser(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetVehicleForUser_WithVaildIdAndPageSizePageIndex()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            int pageSize = 10;
            int pageIndex = 0;
            var result = inquiryController.GetVehicleForUser(id, pageIndex, pageSize) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetVehicleForUser_WithoutId()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "";
            var result = inquiryController.GetVehicleForUser(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Id");
        }

        [TestMethod]
        public void Test_GetVehicleForUser_IdNotExist()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "oo";
            var result = inquiryController.GetVehicleForUser(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<VehicleModel>>>(result.JsonString);
            Assert.IsTrue(invoices.Data.ToList().Count == 0);
        }
        #endregion

        #region Get Address For user


        [TestMethod]
        public void Test_GetAddressesForUser_WithVaildId()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = inquiryController.GetAddressesForUser(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetAddressesForUser_WithVaildIdAndPageSizePageIndex()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            int pageSize = 10;
            int pageIndex = 0;
            var result = inquiryController.GetAddressesForUser(id, pageIndex, pageSize) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetAddressesForUser_WithoutId()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "";
            var result = inquiryController.GetAddressesForUser(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Id");
        }

        [TestMethod]
        public void Test_GetAddressesForUser_IdNotExist()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "oo";
            var result = inquiryController.GetAddressesForUser(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var addresses = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<AddressModel>>>(result.JsonString);
            Assert.IsTrue(addresses.Data.ToList().Count == 0);
        }

        #endregion


        #region delete Vehicle

        [TestMethod]
        public void Test_DeleteVehicle_WithVaildId()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "3546CDED-01D6-440F-92B2-0337DCB051B7";
            var result = inquiryController.DeleteVehicle(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_DeleteVehicle_WithoutId()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "";
            var result = inquiryController.DeleteVehicle(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Id");
        }

        [TestMethod]
        public void Test_DeleteVehicle_IdNotExist()
        {
            var inquiryController = EngineContext.Current.Resolve<InquiryController>();
            string id = "oo";
            var result = inquiryController.DeleteVehicle(id) as RawJsonActionResult;
            
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.IsTrue(error.Errors!=null);
        }
        #endregion
        #endregion


    }
}
