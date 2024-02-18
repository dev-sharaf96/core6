using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Tameenk.Api.Core.ActionResults;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.QuotationApi.Infrastructure;
using Tameenk.Services.QuotationApi.Controllers;
using Tameenk.Services.QuotationApi.Models;
using System.Linq;
using Tameenk.Testing.Core;

namespace Tameenk.Services.QuotationApi.Test
{
    [TestClass]
    public class QuotationControllerTest : BaseTestClass
    {

        #region Ctor
        public QuotationControllerTest()
        {
            AutoMapperConfiguration.Init();
        }
        #endregion


        #region Methods

        #region GetLowestProductByPrice

       
        #endregion 


        [TestMethod]
        public void Test_GetQuotationRequestsByUserId_WithVaildId()
        {
            var QuotationController = EngineContext.Current.Resolve<QuotationController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = QuotationController.GetQuotationRequestsByUserId(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetQuotationRequestsByUserId_WithVaildIdAndPageSizePageIndex()
        {
            var QuotationController = EngineContext.Current.Resolve<QuotationController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            int pageSize = 10;
            int pageIndex = 0;
            var result = QuotationController.GetQuotationRequestsByUserId(id, pageIndex, pageSize) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetQuotationRequestsByUserId_WithoutId()
        {
            var QuotationController = EngineContext.Current.Resolve<QuotationController>();
            string id = "";
            var result = QuotationController.GetQuotationRequestsByUserId(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Id");
        }

        [TestMethod]
        public void Test_GetQuotationRequestsByUserId_IdNotExist()
        {
            var QuotationController = EngineContext.Current.Resolve<QuotationController>();
            string id = "oo";
            var result = QuotationController.GetQuotationRequestsByUserId(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<QuotationRequestModel>>>(result.JsonString);
            Assert.IsTrue(invoices.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetUserOffersCount_IdNotExist()
        {
            var QuotationController = EngineContext.Current.Resolve<QuotationController>();
            string id = "oo";
            var result = QuotationController.GetUserOffersCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var quotations = JsonConvert.DeserializeObject<CommonResponseModel<int>>(result.JsonString);
            Assert.IsTrue(quotations.Data == 0);
        }

        [TestMethod]
        public void Test_GetUserOffersCount_WithVaildId()
        {
            var QuotationController = EngineContext.Current.Resolve<QuotationController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = QuotationController.GetUserOffersCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }
        #endregion
    }
}
