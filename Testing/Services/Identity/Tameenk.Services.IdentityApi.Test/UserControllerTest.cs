using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using Tameenk.Api.Core.ActionResults;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Domain.Dtos;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.IdentityApi.Controllers;
using Tameenk.Services.IdentityApi.Infrastructure;
using Tameenk.Testing.Core;

namespace Tameenk.Services.IdentityApi.Test
{
    [TestClass]
    public class UserControllerTest : BaseTestClass
    {
        #region Ctr
        public UserControllerTest()
        {

            AutoMapperConfiguration.Init();
        }
        #endregion


        #region methods

        #region Get User personal information

        [TestMethod]
        public void Test_GetUserPersonalInformation_VaildId()
        {
            var userController = EngineContext.Current.Resolve<UserController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = userController.GetUserPersonalInformation(id).Result as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var user = JsonConvert.DeserializeObject<UserModel>(result.JsonString);
            Assert.IsTrue(user != null);
        }

        [TestMethod]
        public void Test_GetUserPersonalInformation_InVaildId()
        {
            var userController = EngineContext.Current.Resolve<UserController>();
            string id = "oo";
            var result = userController.GetUserPersonalInformation(id).Result as RawJsonActionResult;
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);

            Assert.IsTrue(error.Errors != null);
        }

        [TestMethod]
        public void Test_GetUserPersonalInformation_WithoutId()
        {
            var userController = EngineContext.Current.Resolve<UserController>();
            string id = "";
            var result = userController.GetUserPersonalInformation(id).Result as RawJsonActionResult;
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            // Assert.AreEqual(error.Errors, "Value cannot be null.\r\nParameter name: Id");
            Assert.IsTrue(error.Errors != null);
        }


        #endregion
        #endregion
    }
}
