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
using Tameenk.Services.AdministrationApi.Models;
using Tameenk.Core.Domain.Dtos;
using Tameenk.Testing.Core;

namespace Tameenk.Services.AdministrationApi.Tests
{
    [TestClass]
    public class InvoiceControllerTest : BaseTestClass
    {
        #region Ctr
        public InvoiceControllerTest() : base()
        {
            AutoMapperConfiguration.Init();
        }
        #endregion

        #region methods

       

        #region get Invoice File by id

        [TestMethod]
        public void Test_GetInvoiceFileById()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            var result = InvoiceController.GetInvoiceFileById(205) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoice = JsonConvert.DeserializeObject<CommonResponseModel<InvoiceFileModel>>(result.JsonString);
            Assert.AreEqual(invoice.Data.Id, 205);
        }

        [TestMethod]
        public void Test_GetInvoiceFileByIdNotExist()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            var result = InvoiceController.GetInvoiceFileById(1) as RawJsonActionResult;
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Not Found in DB.\r\nParameter name: id");
        }

        [TestMethod]
        public void Test_GetInvoiceFileByIdNegtiveNumber()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            var result = InvoiceController.GetInvoiceFileById(-1) as RawJsonActionResult;
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Id must be positive.\r\nParameter name: id");
        }

        [TestMethod]
        public void Test_GetInvoiceFileByIdZero()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            var result = InvoiceController.GetInvoiceFileById(0) as RawJsonActionResult;
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Id not allow to be zero.\r\nParameter name: id");
        }


        #endregion


        #region Get All Invoices After Filters


        #region unit test table
        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters(){ 
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Now,
                EndDate= DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

          
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithPaging()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter,0, 10) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
          

        
        }

/// <summary>
/// //////////////////////////
/// </summary>
        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithInVaildDate()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Parse("2016-06-14 16:44:58.417"),
                EndDate = DateTime.Parse("2014-06-14 16:44:58.417"),
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10) as RawJsonActionResult;
          
            var error = JsonConvert.DeserializeObject<CommonResponseModel<Boolean>>(result.JsonString);
            Assert.AreEqual(error.Errors.ElementAt(0).Description, "Start date must be smaller than end date");
        


    }


        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithPagingWithSortingInvoiceDateAscSort()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter,0, 10, "invoiceDate", true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithPagingWithSortingInvoiceDateDescSort()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "invoiceDate", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
           
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithPagingWithSortingInvoiceDueDateAscSort()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "invoiceDueDate", true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithPagingWithSortingInvoiceDueDateDescSort()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "invoiceDueDate", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
          
        }
        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithPagingWithSortingFeesAscSort()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", true) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithPagingWithSortingFeesDescSort()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
           
        }
        #endregion

        #region filters
        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterVaildDate()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Parse("2018-06-14 16:44:58.417"),
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterStartDateOnly()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Parse("2018-06-14 16:44:58.417"),
                EndDate = null,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterEndDateOnly()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = null,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }


        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterWithoutStartAndEndDate()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = null,
                EndDate = null,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);

        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterWithoutStartEndDateProductType()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 0,
                StartDate = null,
                EndDate = null,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterWithoutFilters()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = null;
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterWithoutStartEndDateProductTypeInsuranceCompany()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 0,
                ProductTypeID = 0,
                StartDate = null,
                EndDate = null,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterWithInsuranceCompanyOnly()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 0,
                StartDate = null,
                EndDate = null,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterWithProductTypeOnly()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 0,
                ProductTypeID = 1,
                StartDate = null,
                EndDate = null,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }


        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterWithProductTypeInsuranceCompanyEndDate()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterWithProductTypeInsuranceCompany()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = null,
                EndDate = null,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
        }


        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterInVaildStartDate()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Parse("2018-10-14 16:44:58.417"),
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InvoiceModel>>>(result.JsonString);

            Assert.IsTrue(invoices.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterInVaildEndDate()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 1,
                StartDate = DateTime.Parse("2018-10-14 16:44:58.417"),
                EndDate = DateTime.Parse("2018-4-14 16:44:58.417"),
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InvoiceModel>>>(result.JsonString);

            Assert.IsTrue(invoices.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterProductType()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 2,
                StartDate = DateTime.Parse("2018-06-14 16:44:58.417"),
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterInvaildProductType()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 11,
                ProductTypeID = 100,
                StartDate = DateTime.Parse("2018-06-14 16:44:58.417"),
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InvoiceModel>>>(result.JsonString);

            Assert.IsTrue(invoices.Data.ToList().Count== 0);
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterInvaildCompanyInVaildProductType()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 100,
                ProductTypeID = 100,
                StartDate = DateTime.Parse("2018-06-14 16:44:58.417"),
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InvoiceModel>>>(result.JsonString);

            Assert.IsTrue(invoices.Data.ToList().Count == 0);
        }

        [TestMethod]
        public void Test_GetAllInvoicesAfterFilters_WithFilterInvaildCompanyVaildProductType()
        {
            var InvoiceController = EngineContext.Current.Resolve<InvoiceController>();
            InvoiceFilters invoiceFilter = new InvoiceFilters()
            {
                InsuranceCompanyId = 100,
                ProductTypeID = 1,
                StartDate = DateTime.Parse("2018-06-14 16:44:58.417"),
                EndDate = DateTime.Now,
            };
            var result = InvoiceController.GetAllInvoicesAfterFilters(invoiceFilter, 0, 10, "fees", false) as RawJsonActionResult;
            Assert.AreEqual(result.HttpStatus, System.Net.HttpStatusCode.OK);
            var invoices = JsonConvert.DeserializeObject<CommonResponseModel<IEnumerable<InvoiceModel>>>(result.JsonString);

            Assert.IsTrue(invoices.Data.ToList().Count == 0);
        }
        #endregion
        #endregion
        #endregion
    }
}
