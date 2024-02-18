using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tameenk.Api.Core.ActionResults;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.PolicyApi.Infrastructure;
using Tameenk.Testing.Core;
using Tameenk.Services.PolicyApi.Controllers;
using Tameenk.Services.PolicyApi.Models;

namespace Tameenk.Services.PolicyApi.Tests
{
    [TestClass]
    public class NotificationControllerTest : BaseTestClass
    {
        #region Ctor
        public NotificationControllerTest()
        {
            AutoMapperConfiguration.Init();
        }
        #endregion

        #region Method

        [TestMethod]
        public void Test_GetUserNotifications_WithVaildId()
        {
            var NotificationController = EngineContext.Current.Resolve<NotificationController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = NotificationController.GetUserNotifications(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetUserNotifications_WithVaildIdAndPageSizePageIndex()
        {
            var NotificationController = EngineContext.Current.Resolve<NotificationController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            int pageSize = 10;
            int pageIndex = 0;
            bool unreadOnly = true;
            var result = NotificationController.GetUserNotifications(id, unreadOnly, pageIndex, pageSize) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetUserNotifications_WithoutId()
        {
            var NotificationController = EngineContext.Current.Resolve<NotificationController>();
            string id = "";
            var result = NotificationController.GetUserNotifications(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Id");
        }

        [TestMethod]
        public void Test_GetUserNotifications_IdNotExist()
        {
            var NotificationController = EngineContext.Current.Resolve<NotificationController>();
            string id = "oo";
            var result = NotificationController.GetUserNotifications(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<NotificationModel>>>(result.JsonString);
            Assert.IsTrue(invoices.Data.ToList().Count == 0);
        }

        #endregion
    }
}
