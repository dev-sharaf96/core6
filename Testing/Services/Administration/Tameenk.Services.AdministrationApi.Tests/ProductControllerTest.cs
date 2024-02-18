using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using Tameenk.Api.Core.ActionResults;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.AdministrationApi.Controllers;
using Tameenk.Services.AdministrationApi.Infrastructure;
using Tameenk.Testing.Core;
using System.Web;
using Tameenk.Services.Core.Products;
using Tameenk.Api.Core.Context;

namespace Tameenk.Services.AdministrationApi.Tests
{
    [TestClass]
    public class ProductControllerTest : BaseTestClass
    {
        #region Ctr
        public ProductControllerTest() : base()
        {

            AutoMapperConfiguration.Init();
        }
        #endregion

        #region methods

        #region Get All Products Type

        [TestMethod]
        public void Test_GetAllProductsType_NameAr()
        {
            HttpContextBase _httpContext = EngineContext.Current.Resolve<HttpContextBase>();
            _httpContext.Request.Headers.Add("Language", "1");
            var webApiContext = new WebApiContext(_httpContext);

            var productService = EngineContext.Current.Resolve<IProductService>();
            var productController = new ProductController(productService, webApiContext);
            var result = productController.GetAllProductsType() as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var productTypes= JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<IdNamePairModel>>>(result.JsonString);
            Assert.IsTrue(productTypes.Data.ToList().Count > 0);
        }
        [TestMethod]
        public void Test_GetAllProductsTypes_NameEn()
        {

            HttpContextBase _httpContext = EngineContext.Current.Resolve<HttpContextBase>();
            _httpContext.Request.Headers.Add("Language", "2");
            var webApiContext = new WebApiContext(_httpContext);

            var productService = EngineContext.Current.Resolve<IProductService>();
            var productController = new ProductController(productService, webApiContext);
           
             var result = productController.GetAllProductsType() as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var productTypes = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<IdNamePairModel>>>(result.JsonString);
            Assert.IsTrue(productTypes.Data.ToList()[0].Name == "Third-Party Vehicle Insurance");
        }

        [TestMethod]
        public void Test_GetAllProductsType_AnotherLanguage()
        {
            HttpContextBase _httpContext=EngineContext.Current.Resolve<HttpContextBase>();
            _httpContext.Request.Headers.Set("Language", "3");

            var ProductController = EngineContext.Current.Resolve<ProductController>();
            var result = ProductController.GetAllProductsType() as RawJsonActionResult;

            var productTypes = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<IdNamePairModel>>>(result.JsonString);
            Assert.IsTrue(productTypes.Data.ToList()[0].Name == "تأمين مركبات طرف ثالث (ضد الغير)");
        }
        #endregion
        #endregion
    }
}
