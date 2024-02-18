using System;
using System.Collections.Generic;
using System.Linq;
using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
//using Tameenk.Api.Core.ActionResults;
//using Tameenk.Api.Core.Models;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Entities.Quotations;
using Tameenk.Core.Exceptions;
using Tameenk.Services.Implementation.Quotations;

namespace Tameenk.Services.Test.Quotations
{
    [TestClass]
    public class QuotationServiceTest
    {
        #region GetLowestProductByPrice


        [TestMethod]
        public void Test_GetLowestProductByPrice_WithVaildExternalQuotationId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<QuotationRequest> quotationRequests = new List<QuotationRequest>
                {
                    new QuotationRequest{ ExternalId = "ghjionhf", ID=1 }
                };

                List<QuotationResponse> quotationResponses = new List<QuotationResponse>
                {
                    new QuotationResponse() { RequestId = 1, Id=1 ,CreateDateTime=DateTime.Now
                    , DeductibleValue = 2000
                    , InsuranceTypeCode =2
                    , VehicleAgencyRepair = false}

                };

                var p1Guid = Guid.NewGuid();
                var p2Guid = Guid.NewGuid();
                var p3Guid = Guid.NewGuid();
                List<Product> products = new List<Product>
                {
                    new Product(){ Id = p1Guid, QuotationResponseId = 1, ProductPrice = 1000 },
                    new Product(){ Id = p2Guid, QuotationResponseId = 1, ProductPrice = 1500 },
                    new Product(){ Id = p3Guid, QuotationResponseId = 1, ProductPrice = 0 },
                };


                mock.Mock<IRepository<QuotationRequest>>().Setup(x => x.Table).Returns(() => quotationRequests.AsQueryable());
                mock.Mock<IRepository<QuotationResponse>>().Setup(x => x.Table).Returns(() => quotationResponses.AsQueryable());
                mock.Mock<IRepository<Product>>().Setup(x => x.Table).Returns(() => products.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var product = quotationService.GetLowestProductByPrice("ghjionhf");
                Assert.IsNotNull(product, "The product is null.");
                Assert.AreEqual(product.Id, p1Guid, "The product is not the lowest price");
            }

        }


        [TestMethod]
        public void Test_GetLowestProductByPrice_WithZeroPriceProducts()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<QuotationRequest> quotationRequests = new List<QuotationRequest>
                {
                    new QuotationRequest{ ExternalId = "ex123", ID=1 }
                };
                List<QuotationResponse> quotationResponses = new List<QuotationResponse>
                {
                    new QuotationResponse() { RequestId = 1, Id=1 ,CreateDateTime=DateTime.Now
                    , DeductibleValue = 2000
                    , InsuranceTypeCode =2
                    , VehicleAgencyRepair = false}

                };
                List<Product> products = new List<Product>
                {
                    new Product(){ Id = Guid.NewGuid(), QuotationResponseId = 1, ProductPrice = 0 },
                    new Product(){ Id = Guid.NewGuid(), QuotationResponseId = 1, ProductPrice = 0 },
                    new Product(){ Id = Guid.NewGuid(), QuotationResponseId = 1, ProductPrice = 0 },
                };


                mock.Mock<IRepository<QuotationRequest>>().Setup(x => x.Table).Returns(() => quotationRequests.AsQueryable());
                mock.Mock<IRepository<QuotationResponse>>().Setup(x => x.Table).Returns(() => quotationResponses.AsQueryable());
                mock.Mock<IRepository<Product>>().Setup(x => x.Table).Returns(() => products.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var product = quotationService.GetLowestProductByPrice("ex123");
                Assert.IsNull(product, "The product should be null.");
            }

        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "qtRqstExtrnlId\r\nParameter name: Quotation external id is missing.")]
        public void Test_GetLowestProductByPrice_WithEmptyExternalQuotationId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<QuotationRequest> quotationRequests = new List<QuotationRequest>
                {
                    new QuotationRequest{ ExternalId = "ghjionh", ID=1 }
                };


                mock.Mock<IRepository<QuotationRequest>>().Setup(x => x.Table).Returns(() => quotationRequests.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var result = quotationService.GetLowestProductByPrice("");
            }

        }


        [TestMethod]
        public void Test_GetLowestProductByPrice_WithInvalidExternalId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<QuotationRequest> quotationRequests = new List<QuotationRequest>
                {
                    new QuotationRequest{ ExternalId = "ex123", ID=1 }
                };


                mock.Mock<IRepository<QuotationRequest>>().Setup(x => x.Table).Returns(() => quotationRequests.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var result = quotationService.GetLowestProductByPrice("ex456");
                Assert.IsNull(result, "Product should be null");
            }
        }


        [TestMethod]
        public void Test_GetLowestProductByPrice_WithoutQuotationresponse()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<QuotationRequest> quotationRequests = new List<QuotationRequest>
                {
                    new QuotationRequest{ ExternalId = "ghjionh", ID=1 }
                };

                mock.Mock<IRepository<QuotationRequest>>().Setup(x => x.Table).Returns(() => quotationRequests.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var result = quotationService.GetLowestProductByPrice("ghjionh");
                Assert.IsNull(result);
            }
        }


        [TestMethod]
        public void Test_GetLowestProductByPrice_WithoutProduct()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<QuotationRequest> quotationRequests = new List<QuotationRequest>
                {
                    new QuotationRequest{ ExternalId = "ex123", ID=1 }
                };

                List<QuotationResponse> quotationResponses = new List<QuotationResponse>
                {
                    new QuotationResponse() { RequestId = 1, Id=1 ,CreateDateTime=DateTime.Now
                    , DeductibleValue = 2000
                    , InsuranceTypeCode =2
                    , VehicleAgencyRepair = false}

                };
                mock.Mock<IRepository<QuotationRequest>>().Setup(x => x.Table).Returns(() => quotationRequests.AsQueryable());
                mock.Mock<IRepository<QuotationResponse>>().Setup(x => x.Table).Returns(() => quotationResponses.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var result = quotationService.GetLowestProductByPrice("ex123");
                Assert.IsNull(result);
            }
        }

        #endregion 



        [TestMethod]
        public void Test_GetQuotationResponseByReferenceId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<QuotationResponse> quotationResponses = new List<QuotationResponse>
                {
                    new QuotationResponse()
                    {
                        ReferenceId = "ghjionhf"
                    }
                };
                mock.Mock<IRepository<QuotationResponse>>().Setup(x => x.Table).Returns(() => quotationResponses.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var quotationResponse = quotationService.GetQuotationResponseByReferenceId("ghjionhf");
                Assert.IsNotNull(quotationResponse, "The quotation response is null.");
            }
        }

        [TestMethod]
        public void Test_GetQuotationResponseByReferenceId_QuotationRequestIncluded()
        {
            using (var mock = AutoMock.GetLoose())
            {
                string referenceId = "ghjionhf";
                List<QuotationResponse> quotationResponses = new List<QuotationResponse>
                {
                    new QuotationResponse()
                    {
                        ReferenceId = referenceId,
                        QuotationRequest = new QuotationRequest()
                    }
                };
                mock.Mock<IRepository<QuotationResponse>>().Setup(x => x.Table).Returns(() => quotationResponses.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var quotationResponse = quotationService.GetQuotationResponseByReferenceId(referenceId);
                Assert.IsNotNull(quotationResponse.QuotationRequest, "The quotation response doesn't include quotation request object.");
            }
        }

        [TestMethod]
        public void Test_GetQuotationResponseByReferenceId_InsuredIncluded()
        {
            using (var mock = AutoMock.GetLoose())
            {
                string referenceId = "ghjionhf";
                List<QuotationResponse> quotationResponses = new List<QuotationResponse>
                {
                    new QuotationResponse()
                    {
                        ReferenceId = referenceId,
                        QuotationRequest = new QuotationRequest{
                            Insured = new Insured{
                                Id= 5
                            }
                        }
                    }
                };
                mock.Mock<IRepository<QuotationResponse>>().Setup(x => x.Table).Returns(() => quotationResponses.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var quotationResponse = quotationService.GetQuotationResponseByReferenceId(referenceId);
                Assert.IsNotNull(quotationResponse.QuotationRequest.Insured, "The quotation response doesn't include insured object.");
            }
        }



        [TestMethod]
        public void Test_GetLowestProductByPrice_WithVaildExternalQuotationIdCheckDate()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<QuotationRequest> quotationRequests = new List<QuotationRequest>
                {
                    new QuotationRequest{ ExternalId = "ghjionhf", ID=1 }
                };

                List<QuotationResponse> quotationResponses = new List<QuotationResponse>
                {
                    new QuotationResponse() { RequestId = 1, Id=1 ,CreateDateTime=DateTime.Now
                    , DeductibleValue = 2000
                    , InsuranceTypeCode =2
                    , VehicleAgencyRepair = false},
                     new QuotationResponse() { RequestId = 1, Id=2 ,CreateDateTime=DateTime.Now.AddHours(-20)
                    , DeductibleValue = 2000
                    , InsuranceTypeCode =2
                    , VehicleAgencyRepair = false}
                };

                var p1Guid = Guid.NewGuid();
                var p2Guid = Guid.NewGuid();
                var p3Guid = Guid.NewGuid();
                List<Product> products = new List<Product>
                {
                    new Product(){ Id = p1Guid, QuotationResponseId = 1, ProductPrice = 1000 },
                    new Product(){ Id = p2Guid, QuotationResponseId = 1, ProductPrice = 1500 },
                    new Product(){ Id = p3Guid, QuotationResponseId = 1, ProductPrice = 0 },
                };


                mock.Mock<IRepository<QuotationRequest>>().Setup(x => x.Table).Returns(() => quotationRequests.AsQueryable());
                mock.Mock<IRepository<QuotationResponse>>().Setup(x => x.Table).Returns(() => quotationResponses.AsQueryable());
                mock.Mock<IRepository<Product>>().Setup(x => x.Table).Returns(() => products.AsQueryable());
                var quotationService = mock.Create<QuotationService>();
                var product = quotationService.GetLowestProductByPrice("ghjionhf");
                Assert.IsNotNull(product, "The product is null.");
                Assert.AreEqual(product.Id, p1Guid, "The product is not the lowest price");

            }

        }

    }
}
