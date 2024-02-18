using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Tameenk.Api.Core.ActionResults;
using Tameenk.Api.Core.Context;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Configuration;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.AdministrationApi.Controllers;
using Tameenk.Services.AdministrationApi.Infrastructure;
using Tameenk.Services.AdministrationApi.Models;
using Tameenk.Services.Core.Files;
using Tameenk.Services.Core.Http;
using Tameenk.Services.Core.InsuranceCompanies;
using Tameenk.Services.Implementation.Files;
using Tameenk.Testing.Core;

namespace Tameenk.Services.AdministrationApi.Tests
{
    [TestClass]
    public class InsuranceCompanyControllerTest : BaseTestClass
    {
        #region Ctr
        public InsuranceCompanyControllerTest() : base() {
           
            AutoMapperConfiguration.Init();
        }
        #endregion


        #region methods
        #region get all insurance companies
        [TestMethod]
        public void Test_GetAllInsuranceCompanies()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies() as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);
            
            Assert.IsTrue(insuranceCompanies.Data.ToList().Count > 0);
        }

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPaging()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }

        

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPagingWithSortingFaxAscSort()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10,"contact.fax",true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPagingWithSortingFaxDescSort()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "contact.fax", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPagingWithSortingEmailAscSort()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "contact.email", true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPagingWithSortingEmailDescSort()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "contact.email", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }
        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPagingWithSortingHomePhoneAscSort()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "contact.homePhone", true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPagingWithSortingHomePhoneDescSort()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "contact.homePhone", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }
        

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPagingWithSortingNameArDescSort()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "NameAR", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_WithPagingWithSortingNameEnDescSort()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "NameEn", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }

        [TestMethod]
        public void Test_GetAllInsuranceCompanies_showInActive()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "NameEn", false,true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }
        [TestMethod]
        public void Test_GetAllInsuranceCompanies_showActiveCompany()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetAllInsuranceCompanies(0, 10, "NameEn", false, true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InsuranceCompanyModel>>>(result.JsonString);

            Assert.AreEqual(insuranceCompanies.Data.ToList().Count, 10);
        }

        #endregion


        #region get insurance company by id
        [TestMethod]
        public void Test_GetCompanyById()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetCompanyById(10) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompany = JsonConvert.DeserializeObject<CommonResponseModel<InsuranceCompanyModel>>(result.JsonString);

            Assert.AreEqual(insuranceCompany.Data.InsuranceCompanyID, 10);
        }

        [TestMethod]
        public void Test_GetCompanyByIdNotExist()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetCompanyById(1000) as RawJsonActionResult;
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company not found in DB\r\nParameter name: insuranceCompanyId");
        }

        [TestMethod]
        public void Test_GetCompanyByIdNegtiveNumber()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetCompanyById(-1) as RawJsonActionResult;
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company id should be positive integer.\r\nParameter name: insuranceCompanyId");
        }

        [TestMethod]
        public void Test_GetCompanyByIdZero()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.GetCompanyById(0) as RawJsonActionResult;
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company id should be positive integer.\r\nParameter name: insuranceCompanyId");
        }

        #endregion


        #region get all insurance companies name 
        [TestMethod]
        public void Test_GetAllInsuranceCompanies_NameAr()
        {
            HttpContextBase _httpContext = EngineContext.Current.Resolve<HttpContextBase>();
            _httpContext.Request.Headers.Add("Language", "1");
            var webApiContext = new WebApiContext(_httpContext);
            var fileService = EngineContext.Current.Resolve<IFileService>();
            var insuraceComapnyService = EngineContext.Current.Resolve<IInsuranceCompanyService>();
            var tameenkConfig = EngineContext.Current.Resolve<TameenkConfig>();
            var client = EngineContext.Current.Resolve<IHttpClient>();
            var insuranceCompanyController = new InsuranceCompanyController(insuraceComapnyService, webApiContext, tameenkConfig, fileService, client);

            var result = insuranceCompanyController.GetAllInsuranceCompaniesName() as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<IdNamePairModel>>>(result.JsonString);
            Assert.IsTrue(insuranceCompanies.Data.ToList().Count > 0);
        }
        [TestMethod]
        public void Test_GetAllInsuranceCompanies_NameEn()
        {
            HttpContextBase _httpContext = EngineContext.Current.Resolve<HttpContextBase>();
            _httpContext.Request.Headers.Add("Language", "2");
            var webApiContext = new WebApiContext(_httpContext);
            var fileService = EngineContext.Current.Resolve<IFileService>();
            var insuraceComapnyService = EngineContext.Current.Resolve<IInsuranceCompanyService>();
            var tameenkConfig = EngineContext.Current.Resolve<TameenkConfig>();
            var client = EngineContext.Current.Resolve<IHttpClient>();
            var insuranceCompanyController = new InsuranceCompanyController(insuraceComapnyService, webApiContext, tameenkConfig, fileService, client);


            var result = insuranceCompanyController.GetAllInsuranceCompaniesName() as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompanies = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<IdNamePairModel>>>(result.JsonString);
            Assert.IsTrue(insuranceCompanies.Data.ToList().Count > 0);
        }

        [TestMethod]
        public void Test_GetAllInsuranceCompaniesName_AnotherLanguage()
        {
            HttpContextBase _httpContext = EngineContext.Current.Resolve<HttpContextBase>();
            _httpContext.Request.Headers.Add("Language", "3");
            var webApiContext = new WebApiContext(_httpContext);
            var fileService = EngineContext.Current.Resolve<IFileService>();
            var insuraceComapnyService = EngineContext.Current.Resolve<IInsuranceCompanyService>();
            var tameenkConfig = EngineContext.Current.Resolve<TameenkConfig>();
            var client = EngineContext.Current.Resolve<IHttpClient>();
            var insuranceCompanyController = new InsuranceCompanyController(insuraceComapnyService, webApiContext, tameenkConfig, fileService, client);


            var result = insuranceCompanyController.GetAllInsuranceCompaniesName() as RawJsonActionResult;
         
            var insuranceCompanies = JsonConvert.DeserializeObject< CommonResponseModel<IEnumerable< IdNamePairModel>>> (result.JsonString);
            Assert.IsTrue(insuranceCompanies.Data.ToList().Count > 0);
        }
        #endregion


        #region change state of company ( Active / inActive )

        

        [TestMethod]
        public void Test_ToggleCompanyActivation_ActiveWithExistId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.ToggleCompanyActivation(true,1) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompany = JsonConvert.DeserializeObject<CommonResponseModel<InsuranceCompanyModel>>(result.JsonString);

            Assert.AreEqual(insuranceCompany.Data.InsuranceCompanyID, 1);
            Assert.AreEqual(insuranceCompany.Data.IsActive,true);
            
        }

        [TestMethod]
        public void Test_ToggleCompanyActivation_InActiveWithExistId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.ToggleCompanyActivation(false, 1) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var insuranceCompany = JsonConvert.DeserializeObject<CommonResponseModel<InsuranceCompanyModel>>(result.JsonString);

            Assert.AreEqual(insuranceCompany.Data.InsuranceCompanyID, 1);
            Assert.AreEqual(insuranceCompany.Data.IsActive, false);
        }

        [TestMethod]
        public void Test_ToggleCompanyActivation_InActiveWithNegativeId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.ToggleCompanyActivation(false, -1) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company id should be positive integer.\r\nParameter name: insuranceCompanyId");
        }

        [TestMethod]
        public void Test_ToggleCompanyActivation_InActiveWithZeroId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.ToggleCompanyActivation(false, 0) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company id should be positive integer.\r\nParameter name: insuranceCompanyId");
        }


        [TestMethod]
        public void Test_ToggleCompanyActivation_InActiveWithNotExistId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.ToggleCompanyActivation(false, 100) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company not found in DB\r\nParameter name: insuranceCompanyId");
        }

        [TestMethod]
        public void Test_ToggleCompanyActivation_ActiveWithNegativeId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.ToggleCompanyActivation(true, -1) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company id should be positive integer.\r\nParameter name: insuranceCompanyId");
        }

        [TestMethod]
        public void Test_ToggleCompanyActivation_ActiveWithZeroId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.ToggleCompanyActivation(true, 0) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company id should be positive integer.\r\nParameter name: insuranceCompanyId");
        }


        [TestMethod]
        public void Test_ToggleCompanyActivation_ActiveWithNotExistId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.ToggleCompanyActivation(true, 100) as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company not found in DB\r\nParameter name: insuranceCompanyId");
        }
        #endregion

        #region edit insurance company
        [TestMethod]
        public void Test_EditInsuranceCompany_WithNullObject()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();
            var result = insuranceCompanyController.EditInsuranceCompany(null).Result as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The Object is Null.");
        }

        [TestMethod]
        public void Test_EditInsuranceCompany_WithNotExistId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();

            InsuranceCompanyModel insuranceCompanyModel = new InsuranceCompanyModel();
            insuranceCompanyModel.InsuranceCompanyID = 1000;
            var result = insuranceCompanyController.EditInsuranceCompany(insuranceCompanyModel).Result as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company not found in DB\r\nParameter name: insuranceCompanyId");
        }

       

        [TestMethod]
        public void Test_EditInsuranceCompany_WithNegativeId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();

            InsuranceCompanyModel insuranceCompanyModel = new InsuranceCompanyModel();
            insuranceCompanyModel.InsuranceCompanyID = -1;
            var result = insuranceCompanyController.EditInsuranceCompany(insuranceCompanyModel).Result as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company id should be positive integer.\r\nParameter name: insuranceCompanyId");
        }

        [TestMethod]
        public void Test_EditInsuranceCompany_WithZeroId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();

            InsuranceCompanyModel insuranceCompanyModel = new InsuranceCompanyModel();
            insuranceCompanyModel.InsuranceCompanyID = 0;
            var result = insuranceCompanyController.EditInsuranceCompany(insuranceCompanyModel).Result as RawJsonActionResult;

            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "The insurance company id should be positive integer.\r\nParameter name: insuranceCompanyId");
        }

        [TestMethod]
        public void Test_EditInsuranceCompany_WithExistId()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();

            InsuranceCompanyModel insuranceCompanyModel = new InsuranceCompanyModel();
            insuranceCompanyModel.InsuranceCompanyID = 16;
            insuranceCompanyModel.NameEN = "Test";
            insuranceCompanyModel.NameAR = "Test";
            insuranceCompanyModel.CreatedDate = DateTime.Now;
            var result = insuranceCompanyController.EditInsuranceCompany(insuranceCompanyModel).Result as RawJsonActionResult;
            var insuranceCompany = JsonConvert.DeserializeObject<CommonResponseModel<InsuranceCompanyModel>>(result.JsonString);
            Assert.AreEqual(insuranceCompany.Data.NameEN, "Test");
        }

        [TestMethod]
        public void Test_EditInsuranceCompany_WithoutFileUpload()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();

            InsuranceCompanyModel insuranceCompanyModel = new InsuranceCompanyModel();
            insuranceCompanyModel.InsuranceCompanyID = 37;
            insuranceCompanyModel.NameEN = "Test";
            insuranceCompanyModel.NameAR = "Test";
            insuranceCompanyModel.CreatedDate = DateTime.Now;
            var result = insuranceCompanyController.EditInsuranceCompany(insuranceCompanyModel).Result as RawJsonActionResult;
            var insuranceCompany = JsonConvert.DeserializeObject<CommonResponseModel<InsuranceCompanyModel>>(result.JsonString);
            Assert.AreEqual(insuranceCompany.Data.NameEN, "Test");
        }

        /*
        [TestMethod]
        public void Test_EditInsuranceCompany_WithFileUpload()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();

            InsuranceCompanyModel insuranceCompanyModel = new InsuranceCompanyModel();
            insuranceCompanyModel.InsuranceCompanyID = 37;
            insuranceCompanyModel.NameEN = "Test";
            insuranceCompanyModel.NameAR = "Test";
            insuranceCompanyModel.ClassTypeName = "Tameenk.Integration.Providers.Saqr.SaqrInsuranceProvider";
            string stringFile = "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YWRkX1Byb3BlcnR5Q2hhbmdlZAByZW1vdmVfUHJvcGVydHlDaGFuZ2VkAFJhaXNlUHJvcGVydHlDaGFuZ2VkAElOb3RpZnlQcm9wZXJ0eUNoYW5nZWQASW50ZXJsb2NrZWQAbWVzc2FnZUZpZWxkAHF1b3RlRmlsZUZpZWxkAHBvbGljeVJlcUZpbGVGaWVsZABwb2xpY3lSZXNGaWxlRmllbGQAcmVzRmlsZUZpZWxkAGZhdWx0U3RyaW5nRmllbGQAYXV0aGVudGljYXRpb25GaWVsZABSZWFkVG9FbmQAc3RybmFtZXNwYWNlAEhhbmRsZUZpbmFsUHJvZHVjdFByaWNlAElJbnRlZ3JhdGlvblRyYW5zYWN0aW9uU2VydmljZQBpbnRlZ3JhdGlvblRyYW5zYWN0aW9uU2VydmljZQBUYW1lZW5rLkludGVncmF0aW9uLlByb3ZpZGVycy5TYXFyLlNhcXJTZXJ2aWNlAFJlYWRSZXNvdXJjZQBzZXRfU3RhdHVzQ29kZQBnZXRfVGVzdE1vZGUAZ2V0X01lc3NhZ2UAc2V0X01lc3NhZ2UAZ2V0X21lc3NhZ2UAc2V0X21lc3NhZ2UAQ29tcGFyZUV4Y2hhbmdlAEludm9rZQBJRGlzcG9zYWJsZQBSdW50aW1lRmllbGRIYW5kbGUAUnVudGltZVR5cGVIYW5kbGUAR2V0VHlwZUZyb21IYW5kbGUAZ2V0X3F1b3RlRmlsZQBzZXRfcXVvdGVGaWxlAGdldF9wb2xpY3lSZXFGaWxlAHNldF9wb2xpY3lSZXFGaWxlAGdldF9wb2xpY3lSZXNGaWxlAHNldF9wb2xpY3lSZXNGaWxlAGdldF9yZXNGaWxlAHNldF9yZXNGaWxlAHN0ckZpbGVOYW1lAGVuZHBvaW50Q29uZmlndXJhdGlvbk5hbWUAcHJvcGVydHlOYW1lAENvbWJpbmUAVmFsdWVUeXBlAEVycm9yVHlwZQBUYW1lZW5rLkNvcmUAVGFtZWVuay5JbnRlZ3JhdGlvbi5Db3JlAFF1b3RhdGlvblNlcnZpY2VSZXNwb25zZQBxdW90ZVJlc3BvbnNlAHBvbFJlc3BvbnNlAFF1b3RhdGlvblJlc3BvbnNlAFBvbGljeVJlc3BvbnNlAHJlc3BvbnNlAERpc3Bvc2UAQ3JlYXRlAERlbGVnYXRlAERlYnVnZ2VyQnJvd3NhYmxlU3RhdGUARWRpdG9yQnJvd3NhYmxlU3RhdGUAQ29tcGlsZXJHZW5lcmF0ZWRBdHRyaWJ1dGUAR3VpZEF0dHJpYnV0ZQBHZW5lcmF0ZWRDb2RlQXR0cmlidXRlAERlYnVnZ2FibGVBdHRyaWJ1dGUARGVidWdnZXJCcm93c2FibGVBdHRyaWJ1dGUARWRpdG9yQnJvd3NhYmxlQXR0cmlidXRlAENvbVZpc2libGVBdHRyaWJ1dGUAQXNzZW1ibHlUaXRsZUF0dHJpYnV0ZQBYbWxUeXBlQXR0cmlidXRlAERlYnVnZ2VyU3RlcFRocm91Z2hBdHRyaWJ1dGUAQXNzZW1ibHlUcmFkZW1hcmtBdHRyaWJ1dGUAVGFyZ2V0RnJhbWV3b3JrQXR0cmlidXRlAEFzc2VtYmx5RmlsZVZlcnNpb25BdHRyaWJ1dGUAQXNzZW1ibHlDb25maWd1cmF0aW9uQXR0cmlidXRlAEFzc2VtYmx5RGVzY3JpcHRpb25BdHRyaWJ1dGUATWVzc2FnZUJvZHlNZW1iZXJBdHRyaWJ1dGUATWVzc2FnZVBhcmFtZXRlckF0dHJpYnV0ZQBDb21waWxhdGlvblJlbGF4YXRpb25zQXR0cmlidXRlAFhtbFNlcmlhbGl6ZXJGb3JtYXRBdHRyaWJ1dGUAU2VydmljZUNvbnRyYWN0QXR0cmlidXRlAE1lc3NhZ2VDb250cmFjdEF0dHJpYnV0ZQBPcGVyYXRpb25Db250cmFjdEF0dHJpYnV0ZQBGYXVsdENvbnRyYWN0QXR0cmlidXRlAEFzc2VtYmx5UHJvZHVjdEF0dHJpYnV0ZQBBc3NlbWJseUNvcHlyaWdodEF0dHJpYnV0ZQBYbWxFbGVtZW50QXR0cmlidXRlAEFzc2VtYmx5Q29tcGFueUF0dHJpYnV0ZQBEZXNpZ25lckNhdGVnb3J5QXR0cmlidXRlAFJ1bnRpbWVDb21wYXRpYmlsaXR5QXR0cmlidXRlAHZhbHVlAFJlbW92ZQBTZXJpYWxpemUAVGFtZWVua0NvbmZpZwBfdGFtZWVua0NvbmZpZwBRdW90YXRvaW5Db25maWcAUG9saWN5Q29uZmlnAFN5c3RlbS5UaHJlYWRpbmcAQmluZGluZwBiaW5kaW5nAEVuY29kaW5nAFRhbWVlbmsuU2VydmljZXMuTG9nZ2luZwBTeXN0ZW0uUnVudGltZS5WZXJzaW9uaW5nAEdldFN0cmluZwBnZXRfZmF1bHRTdHJpbmcAc2V0X2ZhdWx0U3RyaW5nAExvZwBTeXN0ZW0uU2VydmljZU1vZGVsAFN5c3RlbS5Db21wb25lbnRNb2RlbABJQ2hhbm5lbABnZXRfQ2hhbm5lbABUYW1lZW5ha0ltcGxDaGFubmVsAElDbGllbnRDaGFubmVsAElDb250ZXh0Q2hhbm5lbABUYW1lZW5rLkludGVncmF0aW9uLlByb3ZpZGVycy5TYXFyLmRsbABTeXN0ZW0uWG1sAFRhbWVlbmsuSW50ZWdyYXRpb24uUHJvdmlkZXJzLlNhcXIuVGVzdERhdGEucXVvdGF0aW9uVGVzdERhdGEueG1sAFRhbWVlbmFrSW1wbABzZXRfUXVvdGF0aW9uVXJsAHNldF9Qb2xpY3lVcmwAR2V0TWFuaWZlc3RSZXNvdXJjZVN0cmVhbQBTeXN0ZW0AWG1sU2NoZW1hRm9ybQBnZXRfUXVvdGF0b2luAGdldF9hdXRoZW50aWNhdGlvbgBzZXRfYXV0aGVudGljYXRpb24AVGFtZWVuay5Db3JlLkNvbmZpZ3VyYXRpb24AVGFtZWVuay5JbnRlZ3JhdGlvbi5Qcm92aWRlcnMuU2Fxci5TYXFyU2VydmljZS5UYW1lZW5ha0ltcGwuUXVvdGF0aW9uAHF1b3RhdGlvbgBTeXN0ZW0uWG1sLlNlcmlhbGl6YXRpb24AU3lzdGVtLldlYi5TY3JpcHQuU2VyaWFsaXphdGlvbgBTeXN0ZW0uUmVmbGVjdGlvbgBHZXRCYXNlRXhjZXB0aW9uAE5ld3RvbnNvZnQuSnNvbgBUYW1lZW5rLkludGVncmF0aW9uLlByb3ZpZGVycy5TYXFyLlRlc3REYXRhLnF1b3RhdGlvblRlc3REYXRhLmpzb24AcmV0dXJuAEdldFByb3ZpZGVySW5mbwBUYW1lZW5rLkludGVncmF0aW9uLkR0bwBQcm92aWRlckluZm9EdG8AU3RyZWFtUmVhZGVyAFRleHRSZWFkZXIAU2Fxckluc3VyYW5jZVByb3ZpZGVyAElMb2dnZXIAX2xvZ2dlcgBQcm9wZXJ0eUNoYW5nZWRFdmVudEhhbmRsZXIAU3lzdGVtLkNvZGVEb20uQ29tcGlsZXIAU3RyaW5nV3JpdGVyAFhtbFdyaXRlcgBUZXh0V3JpdGVyAFhtbFNlcmlhbGl6ZXIASmF2YVNjcmlwdFNlcmlhbGl6ZXIARXJyb3IALmN0b3IAVGFtZWVuay5JbnRlZ3JhdGlvbi5Qcm92aWRlcnMuU2FxcgBTeXN0ZW0uRGlhZ25vc3RpY3MAVGFtZWVuay5TZXJ2aWNlcwBTeXN0ZW0uUnVudGltZS5JbnRlcm9wU2VydmljZXMAU3lzdGVtLlJ1bnRpbWUuQ29tcGlsZXJTZXJ2aWNlcwBEZWJ1Z2dpbmdNb2RlcwBHZXRCeXRlcwBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MAU3lzdGVtLlRocmVhZGluZy5UYXNrcwBTeXN0ZW0uU2VydmljZU1vZGVsLkNoYW5uZWxzAFN5c3RlbS5XZWIuRXh0ZW5zaW9ucwBUYW1lZW5rLkludGVncmF0aW9uLkNvcmUuUHJvdmlkZXJzAFRhbWVlbmsuSW50ZWdyYXRpb24uRHRvLlByb3ZpZGVycwBSdW50aW1lSGVscGVycwBnZXRfRXJyb3JzAHNldF9FcnJvcnMAcmVtb3RlQWRkcmVzcwBFbmRwb2ludEFkZHJlc3MAV2VpZ2h0cwBDb25jYXQAR2V0UXVvdGF0aW9uUmVzcG9uc2VPYmplY3QAR2V0UG9saWN5UmVzcG9uc2VPYmplY3QAU2VyaWFsaXplT2JqZWN0AERlc2VyaWFsaXplT2JqZWN0AElDb21tdW5pY2F0aW9uT2JqZWN0AGdldF9WZWhpY2xlV2VpZ2h0AHNldF9WZWhpY2xlV2VpZ2h0AEFJTVNGYXVsdABUYW1lZW5ha0ltcGxDbGllbnQASW5zZXJ0AEpzb25Db252ZXJ0AFF1b3RhdGlvblNlcnZpY2VSZXF1ZXN0AFF1b3RlUmVxdWVzdABxdW90ZVJlcXVlc3QARXhlY3V0ZVF1b3RhdGlvblJlcXVlc3QARXhlY3V0ZVBvbGljeVJlcXVlc3QAcG9saWN5UmVxdWVzdAByZXF1ZXN0AFN5c3RlbS5UZXh0AEluaXRpYWxpemVBcnJheQBUYW1lZW5rLkludGVncmF0aW9uLlByb3ZpZGVycy5TYXFyLlNhcXJT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bWV3b3JrIDQuNi4xBAEAAACAngEAAgBUDgZBY3Rpb25AaHR0cDovL3NlcnZpY2UudGFtZWVuYWsudGVjaG5vU3lzLmNvbS9UYW1lZW5ha0ltcGwvUG9saWN5UmVxdWVzdFQOC1JlcGx5QWN0aW9uQWh0dHA6Ly9zZXJ2aWNlLnRhbWVlbmFrLnRlY2hub1N5cy5jb20vVGFtZWVuYWtJbXBsL1BvbGljeVJlc3BvbnNlgKEBADhUYW1lZW5rLkludGVncmF0aW9uLlByb3ZpZGVycy5TYXFyLlNhcXJTZXJ2aWNlLkFJTVNGYXVsdAIAVA4GQWN0aW9uSWh0dHA6Ly9zZXJ2aWNlLnRhbWVlbmFrLnRlY2hub1N5cy5jb20vVGFtZWVuYWtJbXBsL1BvbGljeS9GYXVsdC9BSU1TRmF1bHRUDgROYW1lCUFJTVNGYXVsdBUBAAEAVAINU3VwcG9ydEZhdWx0cwGApAEAAgBUDgZBY3Rpb25DaHR0cDovL3NlcnZpY2UudGFtZWVuYWsudGVjaG5vU3lzLmNvbS9UYW1lZW5ha0ltcGwvUXVvdGF0aW9uUmVxdWVzdFQOC1JlcGx5QWN0aW9uRGh0dHA6Ly9zZXJ2aWNlLnRhbWVlbmFrLnRlY2hub1N5cy5jb20vVGFtZWVuYWtJbXBsL1F1b3RhdGlvblJlc3BvbnNlgKQBADhUYW1lZW5rLkludGVncmF0aW9uLlByb3ZpZGVycy5TYXFyLlNhcXJTZXJ2aWNlLkFJTVNGYXVsdAIAVA4GQWN0aW9uTGh0dHA6Ly9zZXJ2aWNlLnRhbWVlbmFrLnRlY2hub1N5cy5jb20vVGFtZWVuYWtJbXBsL1F1b3RhdGlvbi9GYXVsdC9BSU1TRmF1bHRUDgROYW1lCUFJTVNGYXVsdAgBAAIAAAAAAAgBAAAAAAAAAEMBAAIAVA4JTmFtZXNwYWNlJmh0dHA6Ly9zZXJ2aWNlLnRhbWVlbmFrLnRlY2hub1N5cy5jb20vVAgFT3JkZXIAAAAAfgEAAQBUVW5TeXN0ZW0uWG1sLlNjaGVtYS5YbWxTY2hlbWFGb3JtLCBTeXN0ZW0uWG1sLCBWZXJzaW9uPTQuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49Yjc3YTVjNTYxOTM0ZTA4OQRGb3JtAgAAABoBAApTeXN0ZW0uWG1sCjQuNy4zMDU2LjAAAAkBAARjb2RlAAA3AQABAFQOCU5hbWVzcGFjZSZodHRwOi8vc2VydmljZS50YW1lZW5hay50ZWNobm9TeXMuY29tLyABABNTeXN0ZW0uU2VydmljZU1vZGVsBzQuMC4wLjAAAGQBAAIAVA4JTmFtZXNwYWNlJmh0dHA6Ly9zZXJ2aWNlLnRhbWVlbmFrLnRlY2hub1N5cy5jb20vVA4RQ29uZmlndXJhdGlvbk5hbWUYU2FxclNlcnZpY2UuVGFtZWVuYWtJbXBsYAEAAwBUDgtXcmFwcGVyTmFtZQZQb2xpY3lUDhBXcmFwcGVyTmFtZXNwYWNlJmh0dHA6Ly9zZXJ2aWNlLnRhbWVlbmFrLnRlY2hub1N5cy5jb20vVAIJSXNXcmFwcGVkAWgBAAMAVA4LV3JhcHBlck5hbWUOUG9saWN5UmVzcG9uc2VUDhBXcmFwcGVyTmFtZXNwYWNlJmh0dHA6Ly9zZXJ2aWNlLnRhbWVlbmFrLnRlY2hub1N5cy5jb20vVAIJSXNXcmFwcGVkAWMBAAMAVA4LV3JhcHBlck5hbWUJUXVvdGF0aW9uVA4QV3JhcHBlck5hbWVzcGFjZSZodHRwOi8vc2VydmljZS50YW1lZW5hay50ZWNobm9TeXMuY29tL1QCCUlzV3JhcHBlZAFrAQADAFQOC1dyYXBwZXJOYW1lEVF1b3RhdGlvblJlc3BvbnNlVA4QV3JhcHBlck5hbWVzcGFjZSZodHRwOi8vc2VydmljZS50YW1lZW5hay50ZWNobm9TeXMuY29tL1QCCUlzV3JhcHBlZAESAQABAFQOBE5hbWUGcmV0dXJugIoBAAIAVFVuU3lzdGVtLlhtbC5TY2hlbWEuWG1sU2NoZW1hRm9ybSwgU3lzdGVtLlhtbCwgVmVyc2lvbj00LjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPWI3N2E1YzU2MTkzNGUwODkERm9ybQIAAABUCAVPcmRlcgAAAACAigEAAgBUVW5TeXN0ZW0uWG1sLlNjaGVtYS5YbWxTY2hlbWFGb3JtLCBTeXN0ZW0uWG1sLCBWZXJzaW9uPTQuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49Yjc3YTVjNTYxOTM0ZTA4OQRGb3JtAgAAAFQIBU9yZGVyAQAAAICiAQADAFRVblN5c3RlbS5YbWwuU2NoZW1hLlhtbFNjaGVtYUZvcm0sIFN5c3RlbS5YbWwsIFZlcnNpb249NC4wLjAuMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1iNzdhNWM1NjE5MzRlMDg5BEZvcm0CAAAAVA4IRGF0YVR5cGUMYmFzZTY0QmluYXJ5VAgFT3JkZXIAAAAAgKIBAAMAVFVuU3lzdGVtLlhtbC5TY2hlbWEuWG1sU2NoZW1hRm9ybSwgU3lzdGVtLlhtbCwgVmVyc2lvbj00LjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPWI3N2E1YzU2MTkzNGUwODkERm9ybQIAAABUDghEYXRhVHlwZQxiYXNlNjRCaW5hcnlUCAVPcmRlcgEAAAAALwcAAO+7v3sNCiAgIlJlZmVyZW5jZUlkIjogIjEyMzQ1Njc4OSIsDQogICJTdGF0dXNDb2RlIjogMCwNCiAgIkVycm9ycyI6IG51bGwsDQogICJRdW90YXRpb25ObyI6ICIxMjM0NTY3ODkiLA0KICAiUXVvdGF0aW9uRGF0ZSI6ICIyMDE4LTA4LTI3IiwNCiAgIlF1b3RhdGlvbkV4cGlyeURhdGUiOiAiMjAxOS0wOC0yNyIsDQogICJQcm9kdWN0cyI6IFsNCiAgICB7DQogICAgICAiUHJvZHVjdElkIjogIjU2NzQiLA0KICAgICAgIlByb2R1Y3ROYW1lQXIiOiAi2YXZhtiq2Kwg2KfYrtiq2KjYp9ix2YkiLA0KICAgICAgIlByb2R1Y3ROYW1lRW4iOiAiVGVzdCBQcm9kdWN0IiwNCiAgICAgICJQcm9kdWN0RGVzY0FyIjogIti52YrZhtipINmF2YYg2KfZhNmF2YbYqtisINmE2YTYp9iu2KrYqNin2LEiLA0KICAgICAgIlByb2R1Y3REZXNjRW4iOiAiU2FtcGxlIHByb2R1Y3QgaW5mb3JtYXRpb24gZm9yIHRlc3RpbmcuIiwNCiAgICAgICJQcm9kdWN0UHJpY2UiOiAxMDIwLA0KICAgICAgIkRlZHVjdGlibGVWYWx1ZSI6IG51bGwsDQogICAgICAiVmVoaWNsZUxpbWl0VmFsdWUiOiAwLA0KICAgICAgIlByaWNlRGV0YWlscyI6IFsNCiAgICAgICAgew0KICAgICAgICAgICJQcmljZVR5cGVDb2RlIjogNywNCiAgICAgICAgICAiUHJpY2VWYWx1ZSI6IDEwMDANCiAgICAgICAgfSwNCiAgICAgICAgew0KICAgICAgICAgICJQcmljZVR5cGVDb2RlIjogOCwNCiAgICAgICAgICAiUHJpY2VWYWx1ZSI6IDUwLjANCiAgICAgICAgfSwNCiAgICAgICAgew0KICAgICAgICAgICJQcmljZVR5cGVDb2RlIjogNiwNCiAgICAgICAgICAiUHJpY2VWYWx1ZSI6IDIwDQogICAgICAgIH0sDQogICAgICAgIHsNCiAgICAgICAgICAiUHJpY2VUeXBlQ29kZSI6IDQsDQogICAgICAgICAgIlByaWNlVmFsdWUiOiA1MC4wDQogICAgICAgIH0sDQogICAgICAgIHsNCiAgICAgICAgICAiUHJpY2VUeXBlQ29kZSI6IDMsDQogICAgICAgICAgIlByaWNlVmFsdWUiOiAtMTAwLjANCiAgICAgICAgfQ0KICAgICAgXSwNCiAgICAgICJCZW5lZml0cyI6IFsNCiAgICAgICAgew0KICAgICAgICAgICJCZW5lZml0Q29kZSI6IDEsDQogICAgICAgICAgIkJlbmVmaXRJZCI6ICI1NTE1MDMiLA0KICAgICAgICAgICJCZW5lZml0TmFtZUFyIjogItiq2LrYt9mK2Kkg2KfZhNit2YjYp9iv2Ksg2KfZhNi02K7YtdmK2Kkg2YTZhNiz2KfYptmCINmB2YLYtyIsDQogICAgICAgICAgIkJlbmVmaXROYW1lRW4iOiAiUGVyc29uYWwgQWNjaWRlbnQgY292ZXJhZ2UgZm9yIHRoZSBkcml2ZXIgb25seSIsDQogICAgICAgICAgIkJlbmVmaXREZXNjQXIiOiAiIiwNCiAgICAgICAgICAiQmVuZWZpdERlc2NFbiI6ICIiLA0KICAgICAgICAgICJCZW5lZml0UHJpY2UiOiA2MywNCiAgICAgICAgICAiSXNTZWxlY3RlZCI6IGZhbHNlDQogICAgICAgIH0sDQogICAgICAgIHsNCiAg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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAwAAAA0NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
            byte[] bytes = Encoding.UTF8.GetBytes(stringFile);
            insuranceCompanyModel.FileToUpload = bytes;
            insuranceCompanyModel.CreatedDate = DateTime.Now;
            var result = insuranceCompanyController.EditInsuranceCompany(insuranceCompanyModel).Result as RawJsonActionResult;
            var insuranceCompany = JsonConvert.DeserializeObject<CommonResponseModel<InsuranceCompanyModel>>(result.JsonString);
            Assert.AreEqual(insuranceCompany.Data.NameEN, "Test");
        }

        [TestMethod]
        public void Test_EditInsuranceCompany_WithInVaildFileDll()
        {
            var insuranceCompanyController = EngineContext.Current.Resolve<InsuranceCompanyController>();

            InsuranceCompanyModel insuranceCompanyModel = new InsuranceCompanyModel();
            insuranceCompanyModel.InsuranceCompanyID = 37;
            insuranceCompanyModel.NameEN = "Test";
            insuranceCompanyModel.NameAR = "Test";
            insuranceCompanyModel.NamespaceTypeName = "Tameenk.Integration.Providers.Saqr.SaqrInsuranceProvider";
            insuranceCompanyModel.ClassTypeName = "Tameenk.Integration.Providers.Saqr.SaqrInsuranceProvider";
            string stringFile = "habel";
            byte[] bytes = Encoding.UTF8.GetBytes(stringFile);
            insuranceCompanyModel.FileToUpload = bytes;
            insuranceCompanyModel.CreatedDate = DateTime.Now;
            var result = insuranceCompanyController.EditInsuranceCompany(insuranceCompanyModel).Result as RawJsonActionResult;
           
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "This File is Invaild.\r\nParameter name: DLL File");

        }
        */
        #endregion 
        #endregion
    }
}
