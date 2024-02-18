using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Tameenk.Api.Core.ActionResults;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.PolicyApi.Controllers;
using Tameenk.Services.PolicyApi.Infrastructure;
using Tameenk.Services.PolicyApi.Models;
using Tameenk.Testing.Core;

namespace Tameenk.Services.PolicyApi.Tests
{
    [TestClass]
    public class PolicyControllerTest : BaseTestClass
    {
        #region Ctor
        public PolicyControllerTest()
        {
            AutoMapperConfiguration.Init();
        }
        #endregion

        #region SetPolicyIsRefunded Test Cases

        [TestMethod]
        public void Test_SetPolicyIsRefunded_InvalidReferenceId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            var result = policyController.SetPolicyIsRefunded("XXXAAAQQQGGGASDAS", true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.NotFound);
            var commonResponse = JsonConvert.DeserializeObject<CommonResponseModel<bool>>(result.JsonString);
            Assert.IsTrue(commonResponse.Data == false);
            Assert.IsTrue(commonResponse.TotalCount == 0);
            Assert.IsTrue(commonResponse.Errors != null && commonResponse.Errors.Count() > 0);
            Assert.AreEqual(commonResponse.Errors.ToList()[0].Description, $"There is no policy with this reference Id.{Environment.NewLine}Parameter name: referenceId");
        }

        [TestMethod]
        public void Test_SetPolicyIsRefunded_RefunddedWithTrueValue()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            var result = policyController.SetPolicyIsRefunded("f323aeaa4ac1468", true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var commonResponse = JsonConvert.DeserializeObject<CommonResponseModel<PolicyModel>>(result.JsonString);
            Assert.IsTrue(commonResponse.Data != null);
            Assert.IsTrue(commonResponse.Data.IsRefunded);
        }

        [TestMethod]
        public void Test_SetPolicyIsRefunded_RefunddedWithFalseValue()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            var result = policyController.SetPolicyIsRefunded("f323aeaa4ac1468", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var commonResponse = JsonConvert.DeserializeObject<CommonResponseModel<PolicyModel>>(result.JsonString);
            Assert.IsTrue(commonResponse.Data != null);
            Assert.IsTrue(!commonResponse.Data.IsRefunded);
        }


        [TestMethod]
        public void Test_SetPolicyIsRefunded_EmptyReferenceId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            var result = policyController.SetPolicyIsRefunded("", true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.BadRequest);
            var commonResponse = JsonConvert.DeserializeObject<CommonResponseModel<bool>>(result.JsonString);
            Assert.IsTrue(commonResponse.Data == false);
            Assert.IsTrue(commonResponse.Errors != null && commonResponse.Errors.Count() > 0);
            Assert.AreEqual(commonResponse.Errors.ToList()[0].Description, $"Reference Id Can't be null or empty.{Environment.NewLine}Parameter name: referenceId");
        }
        #endregion


        #region Policy with filters

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterVaildDate()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                IssuanceDateFrom = DateTime.Parse("2018-06-14 16:44:58.417"),
                IssuanceDateTo = DateTime.Now,
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterIssuanceDateFromOnly()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                IssuanceDateFrom = DateTime.Parse("2018-06-14 16:44:58.417"),
                IssuanceDateTo = null,
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterIssuanceDateToOnly()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                IssuanceDateFrom = null,
                IssuanceDateTo = DateTime.Now,
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }


        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterWithoutStartAndEndDate()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                IssuanceDateFrom = null,
                IssuanceDateTo = null,
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterWithBodyTypeId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                BodyTypeId = 1
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterWithoutFilters()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = null;
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterWithAllFilterAreNull()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel();
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterWithCityId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                CityId = 1
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }



        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterWithPolicyNumber()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                PolicyNumber = "E1-18-300-000290"
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var commonResponse = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<VehicleModel>>>(result.JsonString);
            Assert.IsTrue(commonResponse.TotalCount > 0);
            Assert.IsTrue(commonResponse.Errors == null || commonResponse.Errors.Count() == 0);
            //Assert.AreEqual(commonResponse.Errors.ToList()[0].Description, $"There is no policy with this reference Id.{Environment.NewLine}Parameter name: referenceId");
        }


        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterPolicyNumberInsuranceFromDate()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                PolicyNumber = "E1-18-300-000290",
                IssuanceDateFrom = DateTime.Parse("2018-06-14 16:44:58.417")
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterWithProductTypeInsuranceFromDate()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ProductTypeId = 1,
                IssuanceDateFrom = DateTime.Parse("2018-06-14 16:44:58.417")
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }


        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterInVaildIssuanceDateFrom()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                IssuanceDateFrom = DateTime.Parse("2118-06-14 16:44:58.417")
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<VehicleModel>>>(result.JsonString);
            Assert.IsTrue(policies.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterInVaildIssuanceDateTo()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                IssuanceDateTo = DateTime.Parse("1700-06-14 16:44:58.417")
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<VehicleModel>>>(result.JsonString);
            Assert.IsTrue(policies.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterProductType()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ProductTypeId = 1
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterInvaildProductType()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ProductTypeId = 100
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<VehicleModel>>>(result.JsonString);
            Assert.IsTrue(policies.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterInvaildPolicyNumberInVaildProductType()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ProductTypeId = 100,
                PolicyNumber = "ffaaff"
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<VehicleModel>>>(result.JsonString);
            Assert.IsTrue(policies.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterInvaildPolicyNumberVaildProductType()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ProductTypeId = 1,
                PolicyNumber = "ffaaff"
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<VehicleModel>>>(result.JsonString);
            Assert.IsTrue(policies.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterByAgeFrom()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ByAgeFrom = 20
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }


        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterByAgeTo()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ByAgeTo = 50
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterByAgeFromByAgeTo()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ByAgeFrom = 20,
                ByAgeTo = 50
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPoliciesWithFilter_WithFilterInvalidByAgeFromByAgeTo()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            PolicyFilterModel policyFilter = new PolicyFilterModel()
            {
                ByAgeFrom = 50,
                ByAgeTo = 20
            };
            var result = policyController.GetPoliciesWithFilter(policyFilter, 0, 10, "id", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.BadRequest);
            var commonResponse = JsonConvert.DeserializeObject<CommonResponseModel<bool>>(result.JsonString);
            Assert.IsTrue(commonResponse.Data == false);
            Assert.IsTrue(commonResponse.TotalCount == 0);
            Assert.IsTrue(commonResponse.Errors != null && commonResponse.Errors.Count() > 0);
            Assert.AreEqual(commonResponse.Errors.ToList()[0].Description, "Age from must be less than or equal to age to.");

        }
        #endregion


        #region WebSite Profile APIs

        [TestMethod]
        public void Test_GetUserInvoices_WithVaildId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = policyController.GetUserInvoices(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetUserInvoices_WithVaildIdAndPageSizePageIndex()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            int pageSize = 10;
            int pageIndex = 0;
            var result = policyController.GetUserInvoices(id,pageIndex,pageSize) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            
        }

        [TestMethod]
        public void Test_GetUserInvoices_WithoutId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "";
            var result = policyController.GetUserInvoices(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Id");
        }

        [TestMethod]
        public void Test_GetUserInvoices_IdNotExist()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "oo";
            var result = policyController.GetUserInvoices(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InvoiceModel>>>(result.JsonString);
            Assert.IsTrue(invoices.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetUserBanks_WithVaildId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = policyController.GetUserBanks(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetUserBanks_WithVaildIdAndPageSizePageIndex()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            int pageSize = 10;
            int pageIndex = 0;
            var result = policyController.GetUserBanks(id, pageIndex, pageSize) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetUserBanks_WithoutId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "";
            var result = policyController.GetUserBanks(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Id");
        }

        [TestMethod]
        public void Test_GetUserBanks_IdNotExist()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "oo";
            var result = policyController.GetUserBanks(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var banks = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<BankModel>>>(result.JsonString);
            Assert.IsTrue(banks.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetUserPolicies_WithVaildId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = policyController.GetUserBanks(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetUserPolicies_WithVaildIdAndPageSizePageIndex()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            int pageSize = 10;
            int pageIndex = 0;
            var result = policyController.GetUserBanks(id, pageIndex, pageSize) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetUserPolicies_WithoutId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "";
            var result = policyController.GetUserBanks(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Id");
        }

        [TestMethod]
        public void Test_GetUserPolicies_IdNotExist()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "oo";
            var result = policyController.GetUserBanks(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<VehicleModel>>>(result.JsonString);
            Assert.IsTrue(policies.Data.ToList().Count == 0);
        }


        [TestMethod]
        public void Test_GetUserInvoicsCount_WithVaildId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = policyController.GetUserInvoicsCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetUserInvoicsCount_IdNotExist()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "oo";
            var result = policyController.GetUserInvoicsCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<int>>(result.JsonString);
            Assert.IsTrue(policies.Data == 0);
        }

        [TestMethod]
        public void Test_GetUserPoliciesCount_WithVaildId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = policyController.GetUserPoliciesCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetUserPoliciesCount_IdNotExist()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "oo";
            var result = policyController.GetUserPoliciesCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<int>>(result.JsonString);
            Assert.IsTrue(policies.Data == 0);
        }

        [TestMethod]
        public void Test_GetPolicyUpdateRequestByUserCount_WithVaildId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = policyController.GetPolicyUpdateRequestByUserCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetPolicyUpdateRequestByUserCount_IdNotExist()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "oo";
            var result = policyController.GetPolicyUpdateRequestByUserCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<int>>(result.JsonString);
            Assert.IsTrue(policies.Data == 0);
        }
        [TestMethod]
        public void Test_GetUserExpirePoliciesCount_WithVaildId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "297260c0-58a6-49b9-89a5-131ea55f1f70";
            var result = policyController.GetUserExpirePoliciesCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetUserExpirePoliciesCount_IdNotExist()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            string id = "oo";
            var result = policyController.GetUserExpirePoliciesCount(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var policies = JsonConvert.DeserializeObject<CommonResponseModel<int>>(result.JsonString);
            Assert.IsTrue(policies.Data == 0);
        }

        

        [TestMethod]
        public void Test_DownloadInvoiceFile_WithVaildFileId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            int id = 205;
            var result = policyController.DownloadInvoiceFile(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_DownloadInvoiceFile_WithVaildFileIdButNotExist()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            int id = 1;
            var result = policyController.DownloadInvoiceFile(id) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_DownloadInvoiceFile_FileIdNotVaild()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            int id = -1;
            var result = policyController.DownloadInvoiceFile(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "File Id must be positive.\r\nParameter name: fileId");
        }

        [TestMethod]
        public void Test_DownloadInvoiceFile_WithoutFileId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            int id=0;
            var result = policyController.DownloadInvoiceFile(id) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: fileId");
        }


        #region UpdateEditRequestPolicy

        [TestMethod]
        public void Test_UpdateEditRequestPolicy_WithVaildEditRequestFileModel()
        {
            
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            EditRequestFileModel editRequestFileModel = new EditRequestFileModel();
            var result = policyController.UpdateEditRequestPolicy(editRequestFileModel) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_UpdateEditRequestPolicy_WithNullObject()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            EditRequestFileModel editRequestFileModel = null;
            var result = policyController.UpdateEditRequestPolicy(editRequestFileModel) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Value cannot be null.\r\nParameter name: Edit request file model.");
        }

        [TestMethod]
        public void Test_UpdateEditRequestPolicy_WithoutPolicyId()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            EditRequestFileModel editRequestFileModel = new EditRequestFileModel();

            var result = policyController.UpdateEditRequestPolicy(editRequestFileModel) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Must be positive number\r\nParameter name: PolicyId");
        }
        [TestMethod]
        public void Test_UpdateEditRequestPolicy_WithoutFiles()
        {
            var policyController = EngineContext.Current.Resolve<PolicyController>();
            EditRequestFileModel editRequestFileModel = new EditRequestFileModel();
            editRequestFileModel.PolicyId = 2;
            var result = policyController.UpdateEditRequestPolicy(editRequestFileModel) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.IsTrue(error.Errors.Count()>0);
        }
        #endregion
        #endregion
    }
}
