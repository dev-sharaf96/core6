﻿using MoreLinq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Globalization;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;
using System.Data.Entity.Infrastructure;
using Tameenk.Core.Domain.Entities;
using Tameenk.Data;
using Tameenk.Core.Infrastructure;
using Tameenk.Core.Domain.Entities.Quotations;
using Tameenk.Loggin.DAL;
using Tameenk.Common.Utilities;
using Tameenk.Core.Data;
using Tameenk.Resources.WebResources;
using Tameenk.Core.Domain.Entities.VehicleInsurance;
using Tameenk.Core.Domain.Enums.Vehicles;
using Tameenk.Integration.Dto.Providers;
using Tameenk.Core.Caching;
using Tameenk.Core.Domain.Enums.Quotations;
using Tameenk.Core.Domain.Enums;
using Tameenk.Core;
using VehicleInsurance = Tameenk.Core.Domain.Entities.VehicleInsurance;
using Tameenk.Services.Extensions;
using Tameenk.Core.Domain.Entities.PromotionPrograms;
using Tameenk.Core.Exceptions;
using Tameenk.Integration.Core.Providers;
using Tameenk.Core.Configuration;
using System.Threading.Tasks;
using Tameenk.Integration.Dto.Quotation;

namespace Tameenk.Services.QuotationNew.Components
{
    public class CompanyQuotationService : ICompanyQuotationService
    {
        #region Fields

        private const string quotationResponseCach_Base_KEY = "QuOtAtIoN_rEsPoNsE_cAcH";
        private readonly HashSet<int> CompaniesIdForStaticDeductible = new HashSet<int> { 2, 8, 11, 20, 24 };
        private readonly HashSet<int> AllowedInsuranceTypeCodes = new HashSet<int> { 1, 2, 9, 13 };

        private readonly TameenkConfig _tameenkConfig;
        private readonly ICacheManager _cacheManager;
        private readonly IRepository<QuotationResponse> _quotationResponseRepository;
        private readonly IRepository<QuotationRequest> _quotationRequestRepository;
        private readonly IRepository<City> _cityRepository;
        private readonly IRepository<VehicleColor> _vehicleColorRepository;
        private readonly IRepository<VehicleInsurance.VehicleMaker> _vehicleMakerRepository;
        private readonly IRepository<VehicleInsurance.VehicleModel> _vehicleModelRepository;
        private readonly IRepository<LicenseType> _licenseTypeRepository;
        private readonly IRepository<InsuredExtraLicenses> _insuredExtraLicenses;
        private readonly IRepository<Driver> _driverRepository;
        private readonly IRepository<DriverViolation> driverViolationRepository;
        private readonly IRepository<VehiclePlateText> _vehiclePlateTextRepository;
        private readonly IRepository<Benefit> _benefitRepository;
        private readonly IRepository<PriceType> _priceTypeRepository;
        private readonly IRepository<QuotationResponseCache> _quotationResponseCache;

        #endregion

        public CompanyQuotationService(TameenkConfig tameenkConfig, IRepository<QuotationResponse> quotationResponseRepository, IRepository<QuotationRequest> quotationRequestRepository
            , ICacheManager cacheManager, IRepository<City> cityRepository, IRepository<VehicleColor> vehicleColorRepository
            , IRepository<VehicleInsurance.VehicleMaker> vehicleMakerRepository, IRepository<VehicleInsurance.VehicleModel> vehicleModelRepository, IRepository<LicenseType> licenseTypeRepository
            , IRepository<InsuredExtraLicenses> insuredExtraLicenses, IRepository<Driver> driverRepository, IRepository<DriverViolation> _driverViolationRepository
            , IRepository<VehiclePlateText> vehiclePlateTextRepository, IRepository<Benefit> benefitRepository, IRepository<PriceType> priceTypeRepository, IRepository<QuotationResponseCache> quotationResponseCache)
        {
            _quotationResponseRepository = quotationResponseRepository;
            _quotationRequestRepository = quotationRequestRepository;
            _cacheManager = cacheManager;
            _cityRepository = cityRepository;
            _vehicleColorRepository = vehicleColorRepository;
            _vehicleMakerRepository = vehicleMakerRepository;
            _vehicleModelRepository = vehicleModelRepository;
            _licenseTypeRepository = licenseTypeRepository;
            _insuredExtraLicenses = insuredExtraLicenses;
            _driverRepository = driverRepository;
            driverViolationRepository = _driverViolationRepository;
            _vehiclePlateTextRepository = vehiclePlateTextRepository;
            _benefitRepository = benefitRepository;
            _priceTypeRepository = priceTypeRepository;
            _tameenkConfig = tameenkConfig;
            _quotationResponseCache = quotationResponseCache;
        }

        #region Public Methods

        public async Task<QuotationResponseModel> HandleGetQuote(InsuranceCompany insuranceCompany, QuotationNewRequestDetails quoteRequest, int insuranceTypeCode, ServiceRequestLog predefinedLogInfo, string channel, Guid userId, string userName, QuotationRequestLog log, DateTime excutionStartDate, Guid? parentRequestId = null, bool vehicleAgencyRepair = false, int? deductibleValue = null, string policyNo = null, string policyExpiryDate = null, string hashed = null, bool OdQuotation = false)
        {
            try
            {
                log.InsuranceTypeCode = insuranceTypeCode;
                predefinedLogInfo.InsuranceTypeCode = insuranceTypeCode;
                log.ServiceRequest = $"insuranceCompanyId: {insuranceCompany.InsuranceCompanyID}, insuranceTypeCode: {insuranceTypeCode}, qtRqstExtrnlId: {quoteRequest.ExternalId}, parentRequestId: {parentRequestId}, vehicleAgencyRepair: {vehicleAgencyRepair}, deductibleValue: {deductibleValue}, policyNo: {policyNo}, policyExpiryDate: {policyExpiryDate}, hashed: {hashed}";

                if (!AllowedInsuranceTypeCodes.Contains(insuranceTypeCode))
                {
                    log.ErrorCode = (int)QuotationNewOutput.ErrorCodes.InvalidInsuranceTypeCode;
                    log.ErrorDescription = $"Invalid insurance type code as insuranceTypeCode: {insuranceTypeCode}";
                    log.TotalResponseTimeInSeconds = DateTime.Now.Subtract(excutionStartDate).TotalSeconds;
                    QuotationRequestLogDataAccess.AddQuotationRequestLog(log);
                    return null;
                }

                QuotationResponseModel responseModel = null;
                var cacheKey = $"{quotationResponseCach_Base_KEY}_{quoteRequest.ExternalId}_{insuranceCompany.InsuranceCompanyID}_{insuranceTypeCode}_{vehicleAgencyRepair}_{deductibleValue}";
                var quotationResponseCache = await GetFromQuotationResponseCache(cacheKey);
                if (!string.IsNullOrEmpty(quotationResponseCache))
                {
                    responseModel = JsonConvert.DeserializeObject<QuotationResponseModel>(quotationResponseCache);
                    if (responseModel != null && responseModel.Products.Any())
                        return responseModel;
                }

                var task = Task.Run(() =>
                {
                    return GetQuote(insuranceCompany, quoteRequest, predefinedLogInfo, channel, userId, userName, log, excutionStartDate, parentRequestId
                                , insuranceTypeCode, vehicleAgencyRepair, deductibleValue, policyNo, policyExpiryDate, hashed, OdQuotation);
                });

                bool isCompletedSuccessfully = task.Wait(TimeSpan.FromMilliseconds(20000));
                if (!isCompletedSuccessfully)
                    return null;

                var getQuoteResult = task.Result;
                if (getQuoteResult == null || getQuoteResult.ErrorCode != QuotationNewOutput.ErrorCodes.Success || getQuoteResult.QuotationResponse == null
                    || getQuoteResult.QuotationResponse.Products == null || getQuoteResult.QuotationResponse.Products.Count == 0)
                    return null;

                responseModel = HnadleGetQuoteResponseModelMapping(getQuoteResult, insuranceCompany.InsuranceCompanyID, insuranceTypeCode, vehicleAgencyRepair, deductibleValue);
                InsertQuotationResponseIntoInmemoryCache(cacheKey, JsonConvert.SerializeObject(responseModel));
                return responseModel;
            }
            catch (Exception ex)
            {
                log.ErrorCode = (int)QuotationNewOutput.ErrorCodes.ServiceException;
                log.ErrorDescription = ex.ToString();
                log.TotalResponseTimeInSeconds = DateTime.Now.Subtract(excutionStartDate).TotalSeconds;
                QuotationRequestLogDataAccess.AddQuotationRequestLog(log);
                return null;
            }
        }

        #endregion


        #region Private Methods

        private async Task<string> GetFromQuotationResponseCache(string cacheKey)
        {
            return _cacheManager.GetWithoutSetValue(cacheKey, () => { return string.Empty; });
        }

        private async Task<QuotationNewOutput> GetQuote(InsuranceCompany insuranceCompany, QuotationNewRequestDetails quoteRequest, ServiceRequestLog predefinedLogInfo, string channel, Guid userId, string userName, QuotationRequestLog log, DateTime excutionStartDate, Guid? parentRequestId = null, int insuranceTypeCode = 1, bool vehicleAgencyRepair = false, int? deductibleValue = null, string policyNo = null, string policyExpiryDate = null, string hashed = null, bool OdQuotation = false)
        {
            QuotationNewOutput output = new QuotationNewOutput();
            output.QuotationResponse = new QuotationResponse();
            try
            {
                output = GetQuotationResponseDetails(insuranceCompany, quoteRequest, predefinedLogInfo, log, insuranceTypeCode, vehicleAgencyRepair, deductibleValue, policyNo: policyNo, policyExpiryDate: policyExpiryDate, OdQuotation: OdQuotation);
                if (output.ErrorCode != QuotationNewOutput.ErrorCodes.Success)
                {
                    output.ErrorCode = QuotationNewOutput.ErrorCodes.ServiceException;
                    output.ErrorDescription = output.ErrorDescription;
                    log.ErrorCode = (int)output.ErrorCode;
                    log.ErrorDescription = output.LogDescription;
                    log.TotalResponseTimeInSeconds = DateTime.Now.Subtract(excutionStartDate).TotalSeconds;
                    QuotationRequestLogDataAccess.AddQuotationRequestLog(log);
                    return output;
                }

                if (OdQuotation)
                    output.QuotationResponse.InsuranceCompany.ShowQuotationToUser = false;
                if (insuranceCompany.AllowAnonymousRequest.HasValue && insuranceCompany.AllowAnonymousRequest.Value)
                    output.QuotationResponse.CompanyAllowAnonymous = true;
                if (userId != Guid.Empty)
                    output.QuotationResponse.AnonymousRequest = false;
                if (insuranceCompany.ShowQuotationToUser.HasValue && !insuranceCompany.ShowQuotationToUser.Value)
                    output.QuotationResponse.Products = null;
                if (insuranceCompany.HasDiscount.HasValue && output.QuotationResponse.Products != null)
                {
                    if (insuranceCompany.HasDiscount.Value && DateTime.Now < insuranceCompany.DiscountEndDate)
                    {
                        insuranceCompany.HasDiscount = true;
                        output.QuotationResponse.HasDiscount = true;
                        output.QuotationResponse.DiscountText = insuranceCompany.DiscountText;
                    }
                    else
                    {
                        insuranceCompany.HasDiscount = false;
                    }
                }
                else
                {
                    insuranceCompany.HasDiscount = false;
                }
                if (insuranceTypeCode == 1)
                    output.ShowTabby = insuranceCompany.ActiveTabbyTPL;
                else if (insuranceTypeCode == 2)
                    output.ShowTabby = insuranceCompany.ActiveTabbyComp;
                else if (insuranceTypeCode == 7)
                    output.ShowTabby = insuranceCompany.ActiveTabbySanadPlus;
                else if (insuranceTypeCode == 8)
                    output.ShowTabby = insuranceCompany.ActiveTabbyWafiSmart;
                else if (insuranceTypeCode == 13)
                    output.ShowTabby = insuranceCompany.ActiveTabbyMotorPlus;
                else
                    output.ShowTabby = false;
                //output.ActiveTabbyComp = insuranceCompany.ActiveTabbyComp;
                //output.ActiveTabbyTPL = insuranceCompany.ActiveTabbyTPL;
                //output.ActiveTabbySanadPlus = insuranceCompany.ActiveTabbySanadPlus;
                //output.ActiveTabbyWafiSmart = insuranceCompany.ActiveTabbyWafiSmart;

                // As per Moneera @19/3/2023 (https://bcare.atlassian.net/browse/MLI-14)
                //// As per @Moneera request @12-1-2023
                //if (insuranceCompanyId != 22)
                //{
                output.TermsAndConditionsFilePath = insuranceCompany.TermsAndConditionsFilePath;
                output.TermsAndConditionsFilePathComp = insuranceCompany.TermsAndConditionsFilePathComp;
                output.TermsAndConditionsFilePathSanadPlus = insuranceCompany.TermsAndConditionsFilePathSanadPlus;
                //}

                //if (insuranceCompanyId == 14 && log.UserId != "1b4cdb65-9804-4ab4-86a8-af62bf7812d7" && log.UserId != "ebf4df2c-c9bb-4d7d-91fe-4b9208c1631a")
                //    output.QuotationResponse.Products = null;

                //if (insuranceCompanyId == 5 && insuranceTypeCode == 2 && log.UserId != "1b4cdb65-9804-4ab4-86a8-af62bf7812d7" && log.UserId != "ebf4df2c-c9bb-4d7d-91fe-4b9208c1631a") // As per Fayssal @ 22-03-2023 2:45 PM
                //    output.QuotationResponse.Products = null;

                ////
                /// First time (5000) --> As per Fayssal @ 06-03-2023 3:45 PM
                /// Second time (8000) --> As per Moneera @ 28-03-2023 3:45 PM (email Hide Quotations)
                /// Second time (20.000) --> As per Moneera @ 29-03-2023 2:57 PM (email Hide Quotations)
                /// Second time (5000) --> As per Moneera @ 30-03-2023 1:51 PM (Hide Quotations VW-769)
                if (insuranceTypeCode == 1 && output.QuotationResponse.Products != null && output.QuotationResponse.Products.Any(a => a.ProductPrice >= 5000))
                {
                    var productsLessThan5000 = output.QuotationResponse.Products.Where(a => a.ProductPrice <= 4999).ToList();
                    output.QuotationResponse.Products = productsLessThan5000;
                }

                //////
                ///// exclude products with price type (7 & 8) if agencyRepair is true
                ///// As per Al-Majed && Rawan
                //if (vehicleAgencyRepair && output.QuotationResponse.Products != null && output.QuotationResponse.Products.Any(a => a.InsuranceTypeCode == 7 || a.InsuranceTypeCode == 8))
                //{
                //    var filteredProducts = output.QuotationResponse.Products.Where(a => a.InsuranceTypeCode != 7 && a.InsuranceTypeCode != 8).ToList();
                //    output.QuotationResponse.Products = filteredProducts;
                //}

                output.ErrorCode = QuotationNewOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = output.ErrorDescription;
                log.TotalResponseTimeInSeconds = DateTime.Now.Subtract(excutionStartDate).TotalSeconds;
                QuotationRequestLogDataAccess.AddQuotationRequestLog(log);
                return output;
            }
            catch (Exception exp)
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.ServiceException;
                output.ErrorDescription = WebResources.SerivceIsCurrentlyDown;
                log.ErrorCode = (int)output.ErrorCode;
                log.ErrorDescription = exp.ToString();
                log.TotalResponseTimeInSeconds = DateTime.Now.Subtract(excutionStartDate).TotalSeconds;
                QuotationRequestLogDataAccess.AddQuotationRequestLog(log);
                return output;
            }
        }

        private QuotationNewOutput GetQuotationResponseDetails(InsuranceCompany insuranceCompany, QuotationNewRequestDetails quoteRequest, ServiceRequestLog predefinedLogInfo, QuotationRequestLog log, int insuranceTypeCode = 1, bool vehicleAgencyRepair = false, int? deductibleValue = null, bool automatedTest = false, string policyNo = null, string policyExpiryDate = null, bool OdQuotation = false)
        {
            QuotationNewOutput output = new QuotationNewOutput();

            string userId = predefinedLogInfo?.UserID?.ToString();
            DateTime startDateTime = DateTime.Now;
            string referenceId = string.Empty;
            referenceId = getNewReferenceId();
            log.RefrenceId = referenceId;
            DateTime beforeCallingDB = DateTime.Now;
            
            if (insuranceCompany.InsuranceCompanyID == 8 && quoteRequest.VehicleIdType == VehicleIdType.CustomCard
                && (quoteRequest.VehicleBodyCode == 1 || quoteRequest.VehicleBodyCode == 2 || quoteRequest.VehicleBodyCode == 3 || quoteRequest.VehicleBodyCode == 19 || quoteRequest.VehicleBodyCode == 20))
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.NoReturnedQuotation;
                output.ErrorDescription = "No supported product with medgulf with such information";
                output.LogDescription = "MedGulf Invalid Body Type with Custom Card body type is " + quoteRequest.VehicleBodyCode;
                return output;
            }

            if (quoteRequest.Cylinders >= 0 && quoteRequest.Cylinders <= 4)
                quoteRequest.EngineSizeId = 1;
            else if (quoteRequest.Cylinders >= 5 && quoteRequest.Cylinders <= 7)
                quoteRequest.EngineSizeId = 2;
            else
                quoteRequest.EngineSizeId = 3;

            if (quoteRequest.VehicleIdType == VehicleIdType.CustomCard)
                predefinedLogInfo.VehicleId = quoteRequest.CustomCardNumber;
            else
                predefinedLogInfo.VehicleId = quoteRequest.SequenceNumber;
            log.VehicleId = predefinedLogInfo.VehicleId;
            if (quoteRequest.NationalId.StartsWith("7") && !quoteRequest.OwnerTransfer && (insuranceCompany.InsuranceCompanyID == 12 || insuranceCompany.InsuranceCompanyID == 14))
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                output.LogDescription = "Success as no Quote for 700 for Tawuniya and Wataniya";
                return output;
            }
            if (quoteRequest.NationalId.StartsWith("7") && insuranceCompany.InsuranceCompanyID == 25) //AXA
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                output.LogDescription = "Success as no Quote for 700 for AXA";
                return output;
            }
            if (quoteRequest.RequestPolicyEffectiveDate.HasValue && quoteRequest.RequestPolicyEffectiveDate.Value <= DateTime.Now.Date)
            {
                DateTime effectiveDate = DateTime.Now.AddDays(1);
                quoteRequest.RequestPolicyEffectiveDate = new DateTime(effectiveDate.Year, effectiveDate.Month, effectiveDate.Day, effectiveDate.Hour, effectiveDate.Minute, effectiveDate.Second);
                var quoteRequestInfo = _quotationRequestRepository.Table.Where(a => a.ExternalId == quoteRequest.ExternalId).FirstOrDefault();
                if (quoteRequestInfo != null)
                {
                    quoteRequestInfo.RequestPolicyEffectiveDate = quoteRequest.RequestPolicyEffectiveDate;
                    _quotationRequestRepository.Update(quoteRequestInfo);
                }
            }

            output.QuotationResponse = new QuotationResponse()
            {
                ReferenceId = referenceId,
                RequestId = quoteRequest.ID,
                InsuranceTypeCode = short.Parse(insuranceTypeCode.ToString()),
                VehicleAgencyRepair = vehicleAgencyRepair,
                DeductibleValue = deductibleValue,
                CreateDateTime = startDateTime,
                InsuranceCompanyId = insuranceCompany.InsuranceCompanyID
            };
            string promotionProgramCode = string.Empty;
            int promotionProgramId = 0;
            DateTime beforeGettingRequestMessage = DateTime.Now;
            var requestMessage = GetQuotationRequestMessage(quoteRequest, output.QuotationResponse, insuranceTypeCode, vehicleAgencyRepair, userId, deductibleValue, out promotionProgramCode, out promotionProgramId);
            log.RequestMessageResponseTimeInSeconds = DateTime.Now.Subtract(beforeGettingRequestMessage).TotalSeconds;
            if (insuranceCompany.InsuranceCompanyID == 21 && string.IsNullOrEmpty(requestMessage.PromoCode))
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.ServiceDown;
                output.ErrorDescription = WebResources.SerivceIsCurrentlyDown;
                output.LogDescription = "PromoCode is null for Saico ";
                return output;
            }
            if (insuranceCompany.InsuranceCompanyID == 6 && requestMessage.VehicleUseCode == 2)
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.CommercialProductNotSupported;
                output.ErrorDescription = "Commercial product is not supported";
                output.LogDescription = "Commercial product is not supported";
                return output;
            }
            if (insuranceCompany.Key.ToLower() == "malath")
            {
                if (insuranceTypeCode == 2)
                    requestMessage.DeductibleValue = null;
                else if (insuranceTypeCode == 9)
                {
                    if (OdQuotation)
                    {
                        requestMessage.PolicyNo = "new";
                        requestMessage.PolicyExpiryDate = Utilities.ConvertStringToDateTimeFromAllianz(DateTime.UtcNow.AddYears(1).ToString());
                    }
                    else
                    {
                        requestMessage.PolicyNo = policyNo;
                        requestMessage.PolicyExpiryDate = Utilities.ConvertStringToDateTimeFromAllianz(policyExpiryDate);
                    }
                }
            }

            string errors = string.Empty;
            DateTime beforeCallingQuoteService = DateTime.Now;
            predefinedLogInfo.VehicleAgencyRepair = requestMessage.VehicleAgencyRepair;
            predefinedLogInfo.City = requestMessage.InsuredCity;
            predefinedLogInfo.ChassisNumber = requestMessage.VehicleChassisNumber;
            var response = RequestQuotationProducts(requestMessage, output.QuotationResponse, insuranceCompany, predefinedLogInfo, automatedTest, out errors);
            log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(beforeCallingQuoteService).TotalSeconds;
            if (response == null)
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.NoReturnedQuotation;
                output.ErrorDescription = WebResources.SerivceIsCurrentlyDown;
                output.LogDescription = "response is null due to errors, " + errors;
                return output;
            }
            if (response.Products == null)
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.NoReturnedQuotation;
                output.ErrorDescription = WebResources.SerivceIsCurrentlyDown;
                output.LogDescription = "response.Products is null due to errors, " + errors;
                return output;
            }
            if (response.Products.Count() == 0)
            {
                output.ErrorCode = QuotationNewOutput.ErrorCodes.NoReturnedQuotation;
                output.ErrorDescription = WebResources.SerivceIsCurrentlyDown;
                output.LogDescription = "response.Products.Count() is null due to errors, " + errors;
                return output;
            }
            output.Products = response.Products;
            var products = new List<Product>();
            DateTime beforeHandlingProducts = DateTime.Now;
            var allBenefitst = _benefitRepository.Table.ToList();
            var allPriceTypes = _priceTypeRepository.Table.ToList();
            foreach (var p in response.Products)
            {
                var product = p.ToEntity();
                if (requestMessage != null && !string.IsNullOrEmpty(requestMessage.PromoCode))
                    product.IsPromoted = true;
                product.ProviderId = insuranceCompany.InsuranceCompanyID;
                if (!product.InsuranceTypeCode.HasValue || product.InsuranceTypeCode.Value < 1)
                    product.InsuranceTypeCode = insuranceTypeCode;

                if (product.Product_Benefits != null)
                {
                    foreach (var pb in product.Product_Benefits)
                    {
                        pb.Benefit = allBenefitst.FirstOrDefault(bf => pb.BenefitId.HasValue && bf.Code == pb.BenefitId.Value);
                        if (pb.BenefitId == 0)
                        {
                            var serviceBenfitInfo = p.Benefits.Where(a => a.BenefitId == pb.BenefitExternalId).FirstOrDefault();
                            if (serviceBenfitInfo != null)
                            {
                                pb.BenefitNameAr = serviceBenfitInfo.BenefitNameAr;
                                pb.BenefitNameEn = serviceBenfitInfo.BenefitNameEn;
                            }
                        }
                        else
                        {
                            pb.BenefitNameAr = pb.Benefit.ArabicDescription;
                            pb.BenefitNameEn = pb.Benefit.EnglishDescription;
                        }
                        if (pb.BenefitId == 7 && vehicleAgencyRepair == true && insuranceTypeCode != 9)
                        {
                            pb.IsSelected = true;
                        }
                    }
                }
                product.CreateDateTime = DateTime.Now;
                product.ReferenceId = output.QuotationResponse.ReferenceId;

                // Load price details from database.
                foreach (var pd in product.PriceDetails)
                {
                    pd.IsCheckedOut = false;
                    pd.CreateDateTime = DateTime.Now;
                    pd.PriceType = allPriceTypes.FirstOrDefault(pt => pt.Code == pd.PriceTypeCode);
                }
                product.QuotaionNo = response.QuotationNo;
                products.Add(product);
            }
            output.QuotationResponse.Products = products;
            if (!string.IsNullOrEmpty(promotionProgramCode) && promotionProgramId != 0)
            {
                output.QuotationResponse.PromotionProgramCode = promotionProgramCode;
                output.QuotationResponse.PromotionProgramId = promotionProgramId;
            }
            if (!string.IsNullOrEmpty(quoteRequest.InsuredCityYakeenCode.ToString()))
                output.QuotationResponse.CityId = quoteRequest.InsuredCityYakeenCode;
            output.QuotationResponse.ICQuoteReferenceNo = response.QuotationNo;
            _quotationResponseRepository.Insert(output.QuotationResponse);
            log.ProductResponseTimeInSeconds = DateTime.Now.Subtract(beforeHandlingProducts).TotalSeconds;
            output.QuotationResponse.Products = ExcludeProductOrBenefitWithZeroPrice(output.QuotationResponse.Products).ToList();
            if (insuranceTypeCode == 1 && insuranceCompany.InsuranceCompanyID != 14 && insuranceCompany.InsuranceCompanyID != 17 && insuranceCompany.InsuranceCompanyID != 9)
            {
                var tplbenefit = allBenefitst.Where(a => a.Code == 14).FirstOrDefault();
                if (tplbenefit != null)
                {
                    Product_Benefit prodBenefit = new Product_Benefit();
                    prodBenefit.Benefit = tplbenefit;
                    prodBenefit.BenefitNameAr = tplbenefit.ArabicDescription;
                    prodBenefit.BenefitNameEn = tplbenefit.EnglishDescription;
                    prodBenefit.BenefitId = tplbenefit.Code;
                    prodBenefit.BenefitExternalId = tplbenefit.Code.ToString();
                    prodBenefit.IsSelected = true;
                    prodBenefit.IsReadOnly = true;
                    output.QuotationResponse.Products.FirstOrDefault()?.Product_Benefits?.Add(prodBenefit);
                }

            }

            if (quoteRequest.IsRenewal.HasValue && quoteRequest.IsRenewal.Value)
            {
                output.ActiveTabbyComp = true;
                output.ActiveTabbyTPL = true;
                output.ActiveTabbySanadPlus = true;
                output.ActiveTabbyWafiSmart = true;
                output.ActiveTabbyMotorPlus = true;
                output.IsRenewal = true;
            }
            else
            {
                output.ActiveTabbyComp = insuranceCompany.ActiveTabbyComp;
                output.ActiveTabbyTPL = insuranceCompany.ActiveTabbyTPL;
                output.ActiveTabbySanadPlus = insuranceCompany.ActiveTabbySanadPlus;
                output.ActiveTabbyWafiSmart = insuranceCompany.ActiveTabbyWafiSmart;
                output.ActiveTabbyMotorPlus = insuranceCompany.ActiveTabbyMotorPlus;
            }

            output.ErrorCode = QuotationNewOutput.ErrorCodes.Success;
            output.ErrorDescription = "Success";
            output.LogDescription = "Success";
            return output;
        }

        private string getNewReferenceId()
        {
            string referenceId = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 15);
            if (_quotationResponseRepository.TableNoTracking.Any(a => a.ReferenceId == referenceId))
                return getNewReferenceId();
            return referenceId;
        }

        private QuotationServiceRequest GetQuotationRequestMessage(QuotationNewRequestDetails quotationRequest, QuotationResponse quotationResponse, int insuranceTypeCode, bool vehicleAgencyRepair, string userId, int? deductibleValue, out string promotionProgramCode, out int promotionProgramId)
        {
            var serviceRequestMessage = new QuotationServiceRequest();
            promotionProgramCode = string.Empty;
            promotionProgramId = 0;
            var cities = GetAllCities();
            long vehicleColorCode = 99;
            string vehicleColor;

            #region VehicleColor

            GetVehicleColor(out vehicleColor, out vehicleColorCode, quotationRequest.MajorColor, quotationResponse.InsuranceCompanyId);

            #endregion

            serviceRequestMessage.ReferenceId = quotationResponse.ReferenceId;
            serviceRequestMessage.ProductTypeCode = insuranceTypeCode;
            if (quotationRequest.RequestPolicyEffectiveDate.HasValue && quotationRequest.RequestPolicyEffectiveDate.Value.Date <= DateTime.Now.Date)
            {
                DateTime effectiveDate = DateTime.Now.AddDays(1);
                serviceRequestMessage.PolicyEffectiveDate = new DateTime(effectiveDate.Year, effectiveDate.Month, effectiveDate.Day, effectiveDate.Hour, effectiveDate.Minute, effectiveDate.Second);
            }
            else
            {
                serviceRequestMessage.PolicyEffectiveDate = quotationRequest.RequestPolicyEffectiveDate.Value;
            }

            #region Insured
            serviceRequestMessage.InsuredIdTypeCode = quotationRequest.CardIdTypeId;
            serviceRequestMessage.InsuredId = long.Parse(quotationRequest.NationalId);
            serviceRequestMessage.InsuredCity = !string.IsNullOrEmpty(quotationRequest.InsuredCityArabicDescription) ? quotationRequest.InsuredCityArabicDescription : "";
            serviceRequestMessage.InsuredCityCode = !string.IsNullOrEmpty(quotationRequest.InsuredCityYakeenCode.ToString()) ? quotationRequest.InsuredCityYakeenCode.ToString() : "";

            if (quotationRequest.NationalId.StartsWith("7")) //Company
            {
                serviceRequestMessage.InsuredIdTypeCode = 3;
                serviceRequestMessage.InsuredBirthDate = null;
                serviceRequestMessage.InsuredBirthDateG = null;
                serviceRequestMessage.InsuredBirthDateH = null;
                serviceRequestMessage.InsuredGenderCode = null;
                serviceRequestMessage.InsuredNationalityCode = null;
                serviceRequestMessage.InsuredFirstNameEn = null;
                serviceRequestMessage.InsuredMiddleNameEn = null;
                serviceRequestMessage.InsuredLastNameEn = null;
                serviceRequestMessage.InsuredFirstNameAr = quotationRequest.InsuredFirstNameAr; //Company Name
                serviceRequestMessage.InsuredMiddleNameAr = null;
                serviceRequestMessage.InsuredLastNameAr = null;
                serviceRequestMessage.InsuredSocialStatusCode = null;
                serviceRequestMessage.InsuredEducationCode = null;
                serviceRequestMessage.InsuredOccupation = null;
                serviceRequestMessage.InsuredOccupationCode = null;
                serviceRequestMessage.InsuredChildrenBelow16Years = null;
                serviceRequestMessage.InsuredWorkCityCode = null;
                serviceRequestMessage.InsuredWorkCity = null;
                serviceRequestMessage.InsuredIdIssuePlaceCode = null;
                serviceRequestMessage.InsuredIdIssuePlace = null;
            }
            else
            {
                serviceRequestMessage.InsuredBirthDate = quotationRequest.CardIdType == CardIdType.Citizen
                ? quotationRequest.InsuredBirthDateH
                : quotationRequest.InsuredBirthDate.ToString("dd-MM-yyyy", new CultureInfo("en-US"));

                // Add two lines for medGulf Company Only 
                serviceRequestMessage.InsuredBirthDateG = quotationRequest.InsuredBirthDate.ToString("dd-MM-yyyy", new CultureInfo("en-US"));
                serviceRequestMessage.InsuredBirthDateH = quotationRequest.InsuredBirthDateH;

                if (quotationRequest.InsuredGender == Gender.Male)
                    serviceRequestMessage.InsuredGenderCode = "M";
                else if (quotationRequest.InsuredGender == Gender.Female)
                    serviceRequestMessage.InsuredGenderCode = "F";
                else
                    serviceRequestMessage.InsuredGenderCode = "M";

                serviceRequestMessage.InsuredNationalityCode = quotationRequest.NationalityCode;
                serviceRequestMessage.InsuredFirstNameAr = quotationRequest.InsuredFirstNameAr;
                serviceRequestMessage.InsuredMiddleNameAr = $"{quotationRequest.InsuredMiddleNameAr}";
                serviceRequestMessage.InsuredLastNameAr = quotationRequest.InsuredLastNameAr;
                serviceRequestMessage.InsuredFirstNameEn = (string.IsNullOrEmpty(quotationRequest.InsuredFirstNameEn)
                    || string.IsNullOrWhiteSpace(quotationRequest.InsuredFirstNameEn)) ? "-" : quotationRequest.InsuredFirstNameEn;
                serviceRequestMessage.InsuredMiddleNameEn = $"{quotationRequest.InsuredMiddleNameEn}";
                serviceRequestMessage.InsuredLastNameEn = (string.IsNullOrEmpty(quotationRequest.InsuredLastNameEn)
                    || string.IsNullOrWhiteSpace(quotationRequest.InsuredLastNameEn)) ? "-" : quotationRequest.InsuredLastNameEn;


                serviceRequestMessage.InsuredSocialStatusCode = quotationRequest.SocialStatus?.GetCode();
                if (string.IsNullOrEmpty(quotationRequest.InsuredOccupationCode) && serviceRequestMessage.InsuredIdTypeCode == 1)
                {
                    serviceRequestMessage.InsuredOccupationCode = "O";
                    serviceRequestMessage.InsuredOccupation = "غير ذالك";
                }
                else if (string.IsNullOrEmpty(quotationRequest.InsuredOccupationCode) && serviceRequestMessage.InsuredIdTypeCode == 2)
                {
                    serviceRequestMessage.InsuredOccupationCode = "31010";
                    serviceRequestMessage.InsuredOccupation = "موظف اداري";
                }
                else
                {
                    if ((string.IsNullOrEmpty(quotationRequest.InsuredOccupationCode) || quotationRequest.InsuredOccupationCode == "o") && serviceRequestMessage.InsuredIdTypeCode == 1)
                    {
                        serviceRequestMessage.InsuredOccupationCode = "O";
                        serviceRequestMessage.InsuredOccupation = "غير ذالك";
                    }
                    else if ((string.IsNullOrEmpty(quotationRequest.InsuredOccupationCode) || quotationRequest.InsuredOccupationCode == "o") && serviceRequestMessage.InsuredIdTypeCode == 2)
                    {
                        serviceRequestMessage.InsuredOccupationCode = "31010";
                        serviceRequestMessage.InsuredOccupation = "موظف اداري";
                    }
                    else
                    {
                        serviceRequestMessage.InsuredOccupationCode = quotationRequest.InsuredOccupationCode;
                        serviceRequestMessage.InsuredOccupation = quotationRequest.InsuredOccupationNameAr.Trim();
                    }
                }

                serviceRequestMessage.InsuredEducationCode = int.Parse(quotationRequest.InsuredEducation.GetCode());
                if (!serviceRequestMessage.InsuredEducationCode.HasValue || serviceRequestMessage.InsuredEducationCode == 0)
                {
                    serviceRequestMessage.InsuredEducationCode = 1;
                }
                //end of mubark request
                serviceRequestMessage.InsuredChildrenBelow16Years = quotationRequest.ChildrenBelow16Years;
                serviceRequestMessage.InsuredIdIssuePlace = !string.IsNullOrEmpty(quotationRequest.IdIssueCityArabicDescription) ? quotationRequest.IdIssueCityArabicDescription : "";
                serviceRequestMessage.InsuredIdIssuePlaceCode = !string.IsNullOrEmpty(quotationRequest.IdIssueCityYakeenCode.ToString()) ? quotationRequest.IdIssueCityYakeenCode.ToString() : "";
                if (string.IsNullOrEmpty(serviceRequestMessage.InsuredIdIssuePlaceCode) && !string.IsNullOrEmpty(serviceRequestMessage.InsuredCityCode))
                {
                    serviceRequestMessage.InsuredIdIssuePlaceCode = serviceRequestMessage.InsuredCityCode;
                }
                if (string.IsNullOrEmpty(serviceRequestMessage.InsuredIdIssuePlace) && !string.IsNullOrEmpty(serviceRequestMessage.InsuredCity))
                {
                    serviceRequestMessage.InsuredIdIssuePlace = serviceRequestMessage.InsuredCity;
                }
                if (quotationRequest.WorkCityId.HasValue)
                {
                    var city = cities.Where(c => c.Code == quotationRequest.WorkCityId.Value).FirstOrDefault();
                    if (city == null)
                    {
                        serviceRequestMessage.InsuredWorkCity = serviceRequestMessage.InsuredCity;
                        serviceRequestMessage.InsuredWorkCityCode = serviceRequestMessage.InsuredCityCode;
                    }
                    else
                    {
                        serviceRequestMessage.InsuredWorkCity = city.ArabicDescription;
                        serviceRequestMessage.InsuredWorkCityCode = city.YakeenCode.ToString();
                    }
                }
                else
                {
                    serviceRequestMessage.InsuredWorkCity = serviceRequestMessage.InsuredCity;
                    serviceRequestMessage.InsuredWorkCityCode = serviceRequestMessage.InsuredCityCode;
                }
            }
            #endregion

            #region  Vehicle

            if (!string.IsNullOrEmpty(quotationRequest.RegisterationPlace))
            {
                var info = GetCityByName(cities, Utilities.RemoveWhiteSpaces(quotationRequest.RegisterationPlace));
                if (info != null)
                {
                    serviceRequestMessage.VehicleRegPlaceCode = info?.YakeenCode.ToString();
                }
                else
                {
                    serviceRequestMessage.VehicleRegPlaceCode = null;
                }
            }
            else
            {
                serviceRequestMessage.VehicleRegPlaceCode = null;
            }
            if (string.IsNullOrEmpty(serviceRequestMessage.VehicleRegPlaceCode))//as per mubark almutlak
            {
                serviceRequestMessage.VehicleRegPlaceCode = serviceRequestMessage.InsuredCityCode;
            }
            var isVehicleRegistered = quotationRequest.VehicleIdTypeId == (int)VehicleIdType.SequenceNumber;
            if (isVehicleRegistered)
            {
                serviceRequestMessage.VehiclePlateNumber = quotationRequest.CarPlateNumber.HasValue ? quotationRequest.CarPlateNumber.Value : 0;
                serviceRequestMessage.VehiclePlateText1 = quotationRequest.CarPlateText1;
                serviceRequestMessage.VehiclePlateText2 = quotationRequest.CarPlateText2;
                serviceRequestMessage.VehiclePlateText3 = quotationRequest.CarPlateText3;
            }
            else
            {
                serviceRequestMessage.VehiclePlateNumber = null;
                serviceRequestMessage.VehiclePlateText1 = null;
                serviceRequestMessage.VehiclePlateText2 = null;
                serviceRequestMessage.VehiclePlateText3 = null;
            }

            //#endif
            serviceRequestMessage.VehicleIdTypeCode = quotationRequest.VehicleIdTypeId;
            if (quotationRequest.NationalId.StartsWith("7") && !quotationRequest.OwnerTransfer) //Company
            {
                serviceRequestMessage.VehicleOwnerId = long.Parse(quotationRequest.NationalId);
            }
            else
            {
                serviceRequestMessage.VehicleOwnerId = long.Parse(quotationRequest.CarOwnerNIN);
            }
            serviceRequestMessage.VehicleOwnerName = quotationRequest.CarOwnerName;
            serviceRequestMessage.VehiclePlateTypeCode = isVehicleRegistered ? quotationRequest.PlateTypeCode.ToString() : null;
            serviceRequestMessage.VehicleRegExpiryDate = isVehicleRegistered ? Utilities.HandleHijriDate(quotationRequest.LicenseExpiryDate) : null;

            if (serviceRequestMessage.VehicleRegExpiryDate != null)
            {
                try
                {
                    if (serviceRequestMessage.VehicleRegExpiryDate?.Length < 10 && serviceRequestMessage.VehicleRegExpiryDate.Contains("-"))
                    {
                        var day = serviceRequestMessage.VehicleRegExpiryDate.Split('-')[0];
                        var month = serviceRequestMessage.VehicleRegExpiryDate.Split('-')[1];
                        var year = serviceRequestMessage.VehicleRegExpiryDate.Split('-')[2];
                        int d = 0;
                        int m = 0;
                        if (int.TryParse(serviceRequestMessage.VehicleRegExpiryDate.Split('-')[0], out d))
                        {
                            if (d < 10 && d > 0)
                            {
                                day = "0" + day;
                            }
                            else if (d == 0)
                            {
                                day = "01";
                            }
                        }
                        if (int.TryParse(serviceRequestMessage.VehicleRegExpiryDate.Split('-')[1], out m))
                        {
                            if (m < 10 && m > 0)
                            {
                                month = "0" + month;
                            }
                            else if (m == 0)
                            {
                                month = "01";
                            }
                        }
                        serviceRequestMessage.VehicleRegExpiryDate = day + "-" + month + "-" + year;
                    }
                }
                catch
                {

                }
            }
            if (string.IsNullOrEmpty(serviceRequestMessage.VehicleRegExpiryDate))
            {
                try
                {
                    System.Globalization.DateTimeFormatInfo HijriDTFI;
                    HijriDTFI = new System.Globalization.CultureInfo("ar-SA", false).DateTimeFormat;
                    HijriDTFI.Calendar = new System.Globalization.UmAlQuraCalendar();
                    HijriDTFI.ShortDatePattern = "dd-MM-yyyy";
                    DateTime dt = DateTime.Now;
                    serviceRequestMessage.VehicleRegExpiryDate = dt.ToString("dd-MM-yyyy", HijriDTFI);
                }
                catch
                {

                }
            }

            serviceRequestMessage.VehicleId = isVehicleRegistered ? long.Parse(quotationRequest.SequenceNumber) : long.Parse(quotationRequest.CustomCardNumber);
            serviceRequestMessage.VehicleModelYear = quotationRequest.ModelYear.Value;
            serviceRequestMessage.VehicleMaker = quotationRequest.VehicleMaker;
            serviceRequestMessage.VehicleMakerCode = quotationRequest.VehicleMakerCode.HasValue ? quotationRequest.VehicleMakerCode.Value.ToString() : "0";
            serviceRequestMessage.VehicleModel = quotationRequest.VehicleModel;
            serviceRequestMessage.VehicleModelCode = quotationRequest.VehicleModelCode.HasValue ? quotationRequest.VehicleModelCode.Value.ToString() : "0";

            if (quotationRequest.VehicleMakerCode.HasValue)
            {
                var makers = VehicleMakers();
                if (makers != null)
                {
                    var vehicleMaker = makers.Where(e => e.Code == quotationRequest.VehicleMakerCode).FirstOrDefault();
                    if (vehicleMaker != null)
                    {
                        serviceRequestMessage.VehicleMaker = vehicleMaker.ArabicDescription;
                    }
                }
            }
            if (quotationRequest.VehicleModelCode.HasValue && quotationRequest.VehicleMakerCode.HasValue)
            {
                var models = VehicleModels(quotationRequest.VehicleMakerCode.Value);
                if (models != null)
                {
                    var vehicleModel = models.Where(e => e.Code == quotationRequest.VehicleModelCode).FirstOrDefault();
                    if (vehicleModel != null)
                    {
                        serviceRequestMessage.VehicleModel = vehicleModel.ArabicDescription;
                    }
                }
            }
            serviceRequestMessage.VehicleMajorColor = vehicleColor;
            serviceRequestMessage.VehicleMajorColorCode = vehicleColorCode.ToString();
            serviceRequestMessage.VehicleBodyTypeCode = quotationRequest.VehicleBodyCode.ToString();

            serviceRequestMessage.VehicleRegPlace = quotationRequest.RegisterationPlace;
            if (string.IsNullOrEmpty(serviceRequestMessage.VehicleRegPlace))//as per mubark almutlak
            {
                serviceRequestMessage.VehicleRegPlace = serviceRequestMessage.InsuredCity;
            }
            serviceRequestMessage.VehicleCapacity = quotationRequest.VehicleLoad; //@TODO: Validate this
            serviceRequestMessage.VehicleCylinders = int.Parse(quotationRequest.Cylinders.Value.ToString());
            serviceRequestMessage.VehicleWeight = quotationRequest.VehicleWeight;
            serviceRequestMessage.VehicleLoad = quotationRequest.VehicleLoad;
            serviceRequestMessage.VehicleOwnerTransfer = quotationRequest.OwnerTransfer;
            serviceRequestMessage.DriverDisabled = quotationRequest.IsSpecialNeed ?? false;
            serviceRequestMessage.VehicleUsingWorkPurposes = quotationRequest.IsUsedCommercially.HasValue ? quotationRequest.IsUsedCommercially.Value : false;

            serviceRequestMessage.VehicleAgencyRepair = vehicleAgencyRepair;
            serviceRequestMessage.VehicleValue = quotationRequest.VehicleValue;
            serviceRequestMessage.DeductibleValue = insuranceTypeCode == 1 ? null : (int?)(deductibleValue.HasValue ? deductibleValue.Value : 1500);

            serviceRequestMessage.VehicleEngineSizeCode = int.Parse(quotationRequest.EngineSize?.GetCode());
            serviceRequestMessage.VehicleUseCode = int.Parse(quotationRequest.VehicleUse != null && quotationRequest.VehicleUse.GetCode().Equals("0") ? "1" : quotationRequest.VehicleUse.GetCode());
            serviceRequestMessage.VehicleMileage = (int?)quotationRequest.CurrentMileageKM;
            serviceRequestMessage.VehicleTransmissionTypeCode = int.Parse(quotationRequest.TransmissionType?.GetCode());

            if (quotationRequest.MileageExpectedAnnual != null)
            {
                int MileageExpectedAnnualId = 0;
                int.TryParse(quotationRequest.MileageExpectedAnnual?.GetCode(), out MileageExpectedAnnualId);
                serviceRequestMessage.VehicleMileageExpectedAnnualCode = MileageExpectedAnnualId;
            }
            serviceRequestMessage.VehicleAxleWeightCode = quotationRequest.AxleWeightId;
            serviceRequestMessage.VehicleAxleWeight = quotationRequest.AxleWeightId;
            if (serviceRequestMessage.VehicleUseCode == 2)
            {
                serviceRequestMessage.VehicleAxleWeight = 1;
                serviceRequestMessage.VehicleAxleWeightCode = 1;
            }
            serviceRequestMessage.VehicleOvernightParkingLocationCode = int.Parse(quotationRequest?.ParkingLocation.GetCode());
            serviceRequestMessage.VehicleModification = quotationRequest.HasModifications;
            serviceRequestMessage.VehicleModificationDetails = string.IsNullOrEmpty(quotationRequest.ModificationDetails) ? "" : quotationRequest.ModificationDetails;

            if (quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.MedGulf) || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.GGI)
                || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.AlRajhi) || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.Malath)
                || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.GIG) || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.Buruj)
                || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.TokioMarine) || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.Walaa)
                || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.ArabianShield) || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.Amana)
                || ((insuranceTypeCode == 2 || insuranceTypeCode == 13) && quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.Allianz)))
            {
                serviceRequestMessage.HasTrailer = quotationRequest.HasTrailer;
                serviceRequestMessage.TrailerSumInsured = (quotationRequest.HasTrailer) ? quotationRequest.TrailerSumInsured : (int?)null;// quotationRequest.TrailerSumInsured;
                //serviceRequestMessage.HasTrailer = (quotationRequest.Vehicle.HasTrailer) ? quotationRequest.Vehicle.HasTrailer : (bool?)null;
                //serviceRequestMessage.TrailerSumInsured = (quotationRequest.Vehicle.HasTrailer) ? quotationRequest.Vehicle.TrailerSumInsured : (int?)null;

                serviceRequestMessage.OtherUses = (quotationRequest.OtherUses) ? quotationRequest.OtherUses : (bool?)null;
            }

            #endregion
            if (quotationRequest.NationalId.StartsWith("7"))
            {
                serviceRequestMessage.NCDFreeYears = 0;
                serviceRequestMessage.NCDReference = "0";
            }
            else
            {
                serviceRequestMessage.NCDFreeYears = quotationRequest.NajmNcdFreeYears.HasValue ? quotationRequest.NajmNcdFreeYears.Value : 0;
                serviceRequestMessage.NCDReference = quotationRequest.NajmNcdRefrence;
            }

            bool excludeDriversAbove18 = false;
            //if (insuranceTypeCode == 1 && InsuranceCompaniesThatExcludeDriversAbove18.Contains(quotationResponse.InsuranceCompanyId))
            //    excludeDriversAbove18 = true;

            serviceRequestMessage.Drivers = CreateDriversRequestMessage(quotationRequest, cities, quotationResponse.InsuranceCompanyId, excludeDriversAbove18);
            var programcode = GetUserPromotionCodeInfo(userId, quotationRequest.NationalId, quotationResponse.InsuranceCompanyId, insuranceTypeCode == 2 ? 2 : 1);
            // as per Fayssal skip these emails 
            //mubarak.a @bcare.com.sa d21e49e3-4d56-4eb6-b9e0-f7e6c32540c7
            //munera.s @bcare.com.sa a5fa9c14-61ed-44a1-a453-8db824a76a1e
            //mona.a @bcare.com.sa eb208f95-6b21-421c-be24-85f35ed017b5

            if (programcode != null &&
                (userId == "d21e49e3-4d56-4eb6-b9e0-f7e6c32540c7"
                || userId == "a5fa9c14-61ed-44a1-a453-8db824a76a1e"
                || userId == "eb208f95-6b21-421c-be24-85f35ed017b5"
                || userId == "10c9e728-7459-4ef4-88d7-6321a41ead9c"))
            {
                promotionProgramCode = programcode.Code;
                promotionProgramId = programcode.PromotionProgramId;
                serviceRequestMessage.PromoCode = programcode.Code;
            }
            else if (programcode != null && (string.IsNullOrEmpty(programcode.NationalId) ||
                 programcode.NationalId == serviceRequestMessage.InsuredId.ToString()))
            {
                promotionProgramCode = programcode.Code;
                promotionProgramId = programcode.PromotionProgramId;
                serviceRequestMessage.PromoCode = programcode.Code;
            }
            else
            {
                serviceRequestMessage.PromoCode = null;
            }
            serviceRequestMessage.VehicleChassisNumber = quotationRequest.ChassisNumber;
            if ((quotationResponse.InsuranceCompanyId == 17 || quotationResponse.InsuranceCompanyId == 20 || quotationResponse.InsuranceCompanyId == 3 || quotationResponse.InsuranceCompanyId == 7 || quotationResponse.InsuranceCompanyId == 4 || quotationResponse.InsuranceCompanyId == 24 || quotationResponse.InsuranceCompanyId == 19) && quotationRequest.AdditionalDrivers != null)
            {
                serviceRequestMessage.PostalCode = quotationRequest.PostCode;
            }
            if (quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.TokioMarine)
                || quotationResponse.InsuranceCompanyId == Convert.ToInt32(InsuranceCompanyEnum.MedGulf))
            {
                if (quotationRequest.ManualEntry.HasValue && quotationRequest.ManualEntry.Value)
                    serviceRequestMessage.ManualEntry = ManualEntry.True;
                else
                    serviceRequestMessage.ManualEntry = ManualEntry.False;
            }
            if (quotationResponse.InsuranceCompanyId == 14)//Wataniya
            {
                serviceRequestMessage.IdExpiryDate = quotationRequest.IdExpiryDate;
                serviceRequestMessage.CameraTypeId = 3;
                serviceRequestMessage.BrakeSystemId = 3;
                serviceRequestMessage.HasAntiTheftAlarm = quotationRequest.HasAntiTheftAlarm;
                serviceRequestMessage.ParkingSensorId = 3;
                serviceRequestMessage.IsRenewal = false;
                serviceRequestMessage.IsUser = (!string.IsNullOrEmpty(userId)) ? true : false;
                serviceRequestMessage.HasFireExtinguisher = (quotationRequest.HasFireExtinguisher.HasValue &&
                                                        quotationRequest.HasFireExtinguisher.Value) ? true : false;

                if (!string.IsNullOrEmpty(quotationRequest.NationalId))
                {
                    var address = GetAddressesByNin(quotationRequest.NationalId);
                    if (address != null)
                    {
                        serviceRequestMessage.Street = string.IsNullOrEmpty(address.Street) ? "" : address.Street;
                        serviceRequestMessage.District = string.IsNullOrEmpty(address.District) ? "" : address.District;
                        serviceRequestMessage.City = string.IsNullOrEmpty(address.City) ? "" : address.City;

                        if (!string.IsNullOrEmpty(address.BuildingNumber))
                        {
                            int buildingNumber = 0;
                            int.TryParse(address.BuildingNumber, out buildingNumber);
                            serviceRequestMessage.BuildingNumber = buildingNumber;
                        }
                        if (!string.IsNullOrEmpty(address.PostCode))
                        {
                            int postCode = 0;
                            int.TryParse(address.PostCode, out postCode);
                            serviceRequestMessage.ZipCode = postCode;
                        }
                        if (!string.IsNullOrEmpty(address.AdditionalNumber))
                        {
                            int additionalNumber = 0;
                            int.TryParse(address.AdditionalNumber, out additionalNumber);
                            serviceRequestMessage.AdditionalNumber = additionalNumber;
                        }
                        if (!string.IsNullOrEmpty(address.RegionId))
                        {
                            int addressRegionID = 0;
                            int.TryParse(address.RegionId, out addressRegionID);
                            serviceRequestMessage.InsuredAddressRegionID = addressRegionID;
                        }
                    }
                }

                serviceRequestMessage.IsRenewal = (quotationRequest.IsRenewal.HasValue) ? quotationRequest.IsRenewal.Value : false;

                if (quotationRequest.ManualEntry.HasValue && quotationRequest.ManualEntry.Value)
                {
                    serviceRequestMessage.ManualEntry = "true";
                    serviceRequestMessage.MissingFields = quotationRequest.MissingFields;
                }
                else
                    serviceRequestMessage.ManualEntry = "false";

                var makerId = quotationRequest.VehicleMakerCode;
                var modelId = quotationRequest.VehicleModelCode;
                var vehicleModel = GetVehicleModelByMakerCodeAndModelCode(makerId.Value, modelId.Value);
                if (vehicleModel != null)
                {
                    if (vehicleModel.WataniyaMakerCode.HasValue)
                        serviceRequestMessage.WataniyaVehicleMakerCode = vehicleModel.WataniyaMakerCode.Value.ToString();
                    if (vehicleModel.WataniyaModelCode.HasValue)
                        serviceRequestMessage.WataniyaVehicleModelCode = vehicleModel.WataniyaModelCode.Value.ToString();
                }

                if (!string.IsNullOrEmpty(quotationRequest.CarPlateText1))
                    serviceRequestMessage.WataniyaFirstPlateLetterID = GetWataiyaPlateLetterId(quotationRequest.CarPlateText1);
                if (!string.IsNullOrEmpty(quotationRequest.CarPlateText2))
                    serviceRequestMessage.WataniyaSecondPlateLetterID = GetWataiyaPlateLetterId(quotationRequest.CarPlateText2);
                if (!string.IsNullOrEmpty(quotationRequest.CarPlateText3))
                    serviceRequestMessage.WataniyaThirdPlateLetterID = GetWataiyaPlateLetterId(quotationRequest.CarPlateText3);
            }

            if (quotationResponse.InsuranceCompanyId == 5 || quotationResponse.InsuranceCompanyId == 7 || quotationResponse.InsuranceCompanyId == 18)
            {
                serviceRequestMessage.NoOfAccident = quotationRequest.NoOfAccident;
                if (serviceRequestMessage.NoOfAccident.HasValue && serviceRequestMessage.NoOfAccident.Value == 0 && !string.IsNullOrEmpty(quotationRequest.NajmResponse))
                {
                    serviceRequestMessage.ReferenceNo = quotationRequest.NajmResponse;
                }
                else if (!string.IsNullOrEmpty(quotationRequest.NajmResponse))
                {
                    serviceRequestMessage.Accidents = JsonConvert.DeserializeObject<List<Accident>>(quotationRequest.NajmResponse);
                }
                serviceRequestMessage.IsUseNumberOfAccident = true;
            }
            if (quotationResponse.InsuranceCompanyId == 7 && string.IsNullOrEmpty(quotationRequest.NajmResponse) &&
                (serviceRequestMessage.NCDFreeYears == 0 || serviceRequestMessage.NCDFreeYears == 11
                || serviceRequestMessage.NCDFreeYears == 12 || serviceRequestMessage.NCDFreeYears == 13))
            {
                serviceRequestMessage.NoOfAccident = 0;
                serviceRequestMessage.ReferenceNo = "FIRSTHIT";
            }
            return serviceRequestMessage;
        }

        private QuotationServiceResponse RequestQuotationProducts(QuotationServiceRequest requestMessage, QuotationResponse quotationResponse, InsuranceCompany insuranceCompany, ServiceRequestLog predefinedLogInfo, bool automatedTest, out string errors)
        {
            errors = string.Empty;
            try
            {
                requestMessage.InsuranceCompanyCode = insuranceCompany.InsuranceCompanyID;
                var providerFullTypeName = string.Empty;
                providerFullTypeName = insuranceCompany.ClassTypeName + ", " + insuranceCompany.NamespaceTypeName;

                QuotationServiceResponse results = null;
                IInsuranceProvider provider = null;
                object instance = Utilities.GetValueFromCache("instance_" + providerFullTypeName + quotationResponse.InsuranceTypeCode);
                if (instance != null && insuranceCompany.Key != "Tawuniya")
                {
                    provider = instance as IInsuranceProvider;
                }
                if (instance == null)
                {
                    var scope = EngineContext.Current.ContainerManager.Scope();
                    var providerType = Type.GetType(providerFullTypeName);

                    if (providerType != null)
                    {
                        if (!EngineContext.Current.ContainerManager.TryResolve(providerType, scope, out instance))
                        {
                            //not resolved
                            instance = EngineContext.Current.ContainerManager.ResolveUnregistered(providerType, scope);
                        }
                        provider = instance as IInsuranceProvider;
                    }
                    if (provider == null)
                    {
                        throw new Exception("Unable to find provider.");
                    }
                    if (insuranceCompany.Key != "Tawuniya")
                        Utilities.AddValueToCache("instance_" + providerFullTypeName + quotationResponse.InsuranceTypeCode, instance, 1440);

                    if (provider != null)
                    {
                        if (predefinedLogInfo.Channel.ToLower() == Channel.autoleasing.ToString().ToLower())
                        {
                            results = provider.GetQuotationAutoleasing(requestMessage, predefinedLogInfo);
                        }
                        else
                        {
                            results = provider.GetQuotation(requestMessage, predefinedLogInfo, automatedTest);
                        }
                    }
                    scope.Dispose();
                }
                else
                {
                    if (provider != null)
                    {
                        if (predefinedLogInfo.Channel.ToLower() == Channel.autoleasing.ToString().ToLower())
                        {
                            results = provider.GetQuotationAutoleasing(requestMessage, predefinedLogInfo);
                        }
                        else
                        {
                            results = provider.GetQuotation(requestMessage, predefinedLogInfo, automatedTest);
                        }
                    }
                }
                // Remove products if price is zero
                if (results != null && results.Products != null)
                {

                    results.Products = results.Products.Where(e => e.ProductPrice > 0).ToList();

                    var showZeroPremium = _tameenkConfig.Quotatoin.showZeroPremium;

                    if (showZeroPremium)
                    {
                        // Remove products if basic perineum equal zero
                        results.Products = results.Products.Where(e => e.PriceDetails.Any(p => p.PriceTypeCode == 7 && p.PriceValue > 0)).ToList();

                    }
                    // Remove benefits if price is zero
                    foreach (var prod in results.Products)
                    {
                        if (prod.Benefits != null && prod.Benefits.Count() > 0)
                        {
                            prod.Benefits = prod.Benefits.Where(e => e.BenefitPrice > 0 || (e.IsReadOnly && e.IsSelected == true)).ToList();
                        }
                    }
                }

                return results;
            }
            catch (Exception exp)
            {
                errors = exp.ToString();
                return null;
            }

        }

        private void GetVehicleColor(out string vehicleColor, out long vehicleColorCode, string vehicleMajorColor, int companyId)
        {
            vehicleColor = vehicleMajorColor; //default value
            vehicleColorCode = 99;//default value
            var secondMajorCollor = string.Empty;
            if (vehicleMajorColor[0] == 'ا')
                secondMajorCollor = 'أ' + vehicleMajorColor.Substring(1);
            else if (vehicleMajorColor[0] == 'أ')
                secondMajorCollor = 'ا' + vehicleMajorColor.Substring(1);
            else
                secondMajorCollor = vehicleMajorColor;
            var vehiclesColors = GetVehicleColors();
            var vColor = vehiclesColors.FirstOrDefault(color => color.ArabicDescription == vehicleMajorColor || color.ArabicDescription == secondMajorCollor);
            if (vColor == null)
            {
                if (vehicleMajorColor.Contains(' '))
                {
                    vColor = vehiclesColors.FirstOrDefault(color => color.ArabicDescription == vehicleMajorColor.Split(' ')[0] || color.ArabicDescription == secondMajorCollor.Split(' ')[0]);
                    if (vColor != null)
                    {
                        vehicleColor = vColor.YakeenColor;
                        vehicleColorCode = (companyId == 12) ? vColor.TawuniyaCode.Value : (companyId == 14) ? vColor.WataniyaCode.Value : vColor.YakeenCode;
                    }
                }
            }
            else
            {
                vehicleColor = vColor.YakeenColor;
                vehicleColorCode = (companyId == 12) ? vColor.TawuniyaCode.Value : (companyId == 14) ? vColor.WataniyaCode.Value : vColor.YakeenCode;
            }
        }

        private City GetCityByName(List<City> Citites, string Name)
        {
            if (!string.IsNullOrEmpty(Name))
            {
                City _city = Citites.FirstOrDefault(c => c.ArabicDescription == Utilities.RemoveWhiteSpaces(Name.Trim()));

                if (_city == null)
                    _city = Citites.FirstOrDefault(c => c.EnglishDescription == Utilities.RemoveWhiteSpaces(Name.Trim()));

                if (_city == null)
                {
                    if (Name.Trim().Contains("ه"))
                        _city = Citites.FirstOrDefault(c => c.ArabicDescription == Utilities.RemoveWhiteSpaces(Name.Trim().Replace("ه", "ة")));
                    else if (_city == null && Name.Trim().Contains("ة"))
                        _city = Citites.FirstOrDefault(c => c.EnglishDescription == Utilities.RemoveWhiteSpaces(Name.Trim().Replace("ة", "ه")));
                }
                if (_city != null)
                    return _city;
                else
                    return null;
            }
            return null;
        }

        private List<DriverDto> CreateDriversRequestMessage(QuotationNewRequestDetails quotationRequest, List<City> cities, int insuranceCompanyId, bool excludeDriversAbove18)
        {
            List<DriverDto> drivers = new List<DriverDto>();
            int additionalDrivingPercentage = 0;
            var mainDriverDto = new DriverDto()
            {
                DriverTypeCode = 1,
                DriverId = long.Parse(quotationRequest.NationalId),
                DriverIdTypeCode = quotationRequest.CardIdTypeId,
                DriverBirthDate = quotationRequest.InsuredBirthDateH,
                DriverBirthDateG = quotationRequest.InsuredBirthDate,
                DriverFirstNameAr = quotationRequest.InsuredFirstNameAr,
                DriverFirstNameEn = (string.IsNullOrWhiteSpace(quotationRequest.InsuredFirstNameEn) ||
                string.IsNullOrEmpty(quotationRequest.InsuredFirstNameEn)) ? "-" : quotationRequest.InsuredFirstNameEn,
                DriverMiddleNameAr = quotationRequest.InsuredMiddleNameAr,
                DriverMiddleNameEn = quotationRequest.InsuredMiddleNameEn,
                DriverLastNameAr = quotationRequest.InsuredLastNameAr,
                DriverLastNameEn = (string.IsNullOrWhiteSpace(quotationRequest.InsuredLastNameEn) ||
                string.IsNullOrEmpty(quotationRequest.InsuredLastNameEn)) ? "-" : quotationRequest.InsuredLastNameEn,
                DriverNOALast5Years = quotationRequest.NOALast5Years,
                DriverNOCLast5Years = quotationRequest.NOCLast5Years,
                DriverNCDFreeYears = quotationRequest.NajmNcdFreeYears,
                DriverNCDReference = quotationRequest.NajmNcdRefrence
            };

            // this is with Alamia
            if (insuranceCompanyId == 18)
                mainDriverDto.DriverZipCode = quotationRequest.PostCode;

            if (quotationRequest.InsuredGender == Gender.Male)
                mainDriverDto.DriverGenderCode = "M";
            else if (quotationRequest.InsuredGender == Gender.Female)
                mainDriverDto.DriverGenderCode = "F";
            else
                mainDriverDto.DriverGenderCode = "M";

            mainDriverDto.DriverNationalityCode = !string.IsNullOrEmpty(quotationRequest.NationalityCode) ? quotationRequest.NationalityCode : "113";
            mainDriverDto.DriverSocialStatusCode = quotationRequest.MainDriverSocialStatusId?.ToString();
            if (string.IsNullOrEmpty(quotationRequest.InsuredOccupationCode) && mainDriverDto.DriverIdTypeCode == 1)
            {
                mainDriverDto.DriverOccupationCode = "O";
                mainDriverDto.DriverOccupation = "غير ذالك";
            }
            else if (string.IsNullOrEmpty(quotationRequest.InsuredOccupationCode) && mainDriverDto.DriverIdTypeCode == 2)
            {
                mainDriverDto.DriverOccupationCode = "31010";
                mainDriverDto.DriverOccupation = "موظف اداري";
            }
            else
            {
                if ((string.IsNullOrEmpty(quotationRequest.InsuredOccupationCode) || quotationRequest.InsuredOccupationCode == "o") && mainDriverDto.DriverIdTypeCode == 1)
                {
                    mainDriverDto.DriverOccupationCode = "O";
                    mainDriverDto.DriverOccupation = "غير ذالك";
                }
                else if ((string.IsNullOrEmpty(quotationRequest.InsuredOccupationCode) || quotationRequest.InsuredOccupationCode == "o") && mainDriverDto.DriverIdTypeCode == 2)
                {
                    mainDriverDto.DriverOccupationCode = "31010";
                    mainDriverDto.DriverOccupation = "موظف اداري";
                }
                else
                {
                    mainDriverDto.DriverOccupationCode = quotationRequest.InsuredOccupationCode;
                    mainDriverDto.DriverOccupation = quotationRequest.InsuredOccupationNameAr.Trim();
                }
            }
            if ((!quotationRequest.DrivingPercentage.HasValue || quotationRequest.DrivingPercentage > 100 || quotationRequest.DrivingPercentage < 100) && quotationRequest.AdditionalDrivers.Count == 1)
            {
                mainDriverDto.DriverDrivingPercentage = 100;
            }
            else
            {
                mainDriverDto.DriverDrivingPercentage = quotationRequest.DrivingPercentage;
            }
            additionalDrivingPercentage = mainDriverDto.DriverDrivingPercentage.HasValue ? mainDriverDto.DriverDrivingPercentage.Value : 0; ;
            mainDriverDto.DriverEducationCode = quotationRequest.EducationId;
            if (!mainDriverDto.DriverEducationCode.HasValue || mainDriverDto.DriverEducationCode == 0)
            {
                mainDriverDto.DriverEducationCode = 1;
            }
            mainDriverDto.DriverMedicalConditionCode = quotationRequest.MedicalConditionId;
            mainDriverDto.DriverChildrenBelow16Years = quotationRequest.ChildrenBelow16Years;
            mainDriverDto.DriverHomeCityCode = !string.IsNullOrEmpty(quotationRequest.InsuredCityYakeenCode.ToString()) ? quotationRequest.InsuredCityYakeenCode.ToString() : "";
            mainDriverDto.DriverHomeCity = !string.IsNullOrEmpty(quotationRequest.InsuredCityArabicDescription) ? quotationRequest.InsuredCityArabicDescription : "";
            if (quotationRequest.WorkCityId.HasValue)
            {
                var city = cities.Where(c => c.Code == quotationRequest.WorkCityId.Value).FirstOrDefault();
                if (city == null)
                {
                    mainDriverDto.DriverWorkCity = mainDriverDto.DriverHomeCity;
                    mainDriverDto.DriverWorkCityCode = mainDriverDto.DriverHomeCityCode;
                }
                else
                {
                    mainDriverDto.DriverWorkCity = city.ArabicDescription;
                    mainDriverDto.DriverWorkCityCode = city.YakeenCode.ToString();
                }
            }
            else
            {
                mainDriverDto.DriverWorkCity = mainDriverDto.DriverHomeCity;
                mainDriverDto.DriverWorkCityCode = mainDriverDto.DriverHomeCityCode;
            }

            //var DriverLicenses = _driverRepository.Table
            //    .Include(x => x.DriverLicenses)
            //    .FirstOrDefault(x => x.DriverId == quotationRequest.MainDriverId && x.IsDeleted == false)?
            //    .DriverLicenses;

            var LicenseDtos = new List<LicenseDto>();

            if (quotationRequest.MainDriverLicenses != null && quotationRequest.MainDriverLicenses.Count() > 0)
            {
                int licenseNumberYears;
                foreach (var item in quotationRequest.MainDriverLicenses)
                {
                    int? _driverLicenseTypeCode = item.TypeDesc;
                    if (insuranceCompanyId == 14)
                        _driverLicenseTypeCode = GetWataniyaDriverLicenseType(item.TypeDesc.ToString())?.WataniyaCode.Value;

                    licenseNumberYears = (DateTime.Now.Year - DateExtension.ConvertHijriStringToDateTime(item.IssueDateH).Year);
                    LicenseDtos.Add(new LicenseDto()
                    {
                        DriverLicenseExpiryDate = Utilities.HandleHijriDate(item.ExpiryDateH),
                        DriverLicenseTypeCode = _driverLicenseTypeCode.ToString(),
                        LicenseCountryCode = 113,
                        LicenseNumberYears = licenseNumberYears == 0 ? 1 : licenseNumberYears
                    });
                }
                mainDriverDto.DriverLicenses = LicenseDtos; //from tameenk
            }
            else
            {
                mainDriverDto.DriverLicenses = null; //from tameenk
            }
            // Get (Main & Additional Drivers Extra Licenses)
            var driversExtraLicenses = _insuredExtraLicenses.TableNoTracking
                .Where(d => d.InsuredId == quotationRequest.InsuredId);

            // Main Driver Extra Licenses
            if (driversExtraLicenses != null && driversExtraLicenses.Any())
            {
                var mainDriverExtraLicenses = driversExtraLicenses.Where(m => m.IsMainDriver == true);

                if (mainDriverExtraLicenses != null && mainDriverExtraLicenses.Any())
                {
                    LicenseDto licenseDto;
                    List<LicenseDto> license = new List<LicenseDto>();
                    foreach (var item in mainDriverExtraLicenses)
                    {
                        if (item.LicenseCountryCode < 1 || item.LicenseCountryCode == 113) //as jira 349
                            continue;

                        licenseDto = new LicenseDto();
                        licenseDto.LicenseNumberYears = item.LicenseNumberYears;
                        licenseDto.LicenseCountryCode = item.LicenseCountryCode;
                        license.Add(licenseDto);

                    }
                    if (mainDriverDto.DriverLicenses != null)
                        mainDriverDto.DriverLicenses.AddRange(license);
                    else
                        mainDriverDto.DriverLicenses = license;
                }
            }
            //var mainDriverViolations = driverViolationRepository.TableNoTracking
            //                  .Where(x => x.InsuredId == quotationRequest.InsuredId && x.NIN == quotationRequest.MainDriverNin).ToList();

            if (quotationRequest.MainDriverViolation != null && quotationRequest.MainDriverViolation.Count > 0)
            {
                mainDriverDto.DriverViolations = quotationRequest.MainDriverViolation.Select(e => new ViolationDto()
                { ViolationCode = e.ViolationId }).ToList();

            }
            //Add main driver to drivers list
            if (!quotationRequest.NationalId.StartsWith("7"))
            {
                if (insuranceCompanyId == 14)//Wataniya
                    HandleDriveAddressDetailsForWataniya(mainDriverDto);

                if (excludeDriversAbove18 && (quotationRequest.AdditionalDrivers != null && quotationRequest.AdditionalDrivers.Count >= 1))
                    quotationRequest.AdditionalDrivers = HandleDriversAbove18Years(quotationRequest.AdditionalDrivers, mainDriverDto);

                drivers.Add(mainDriverDto);
            }
            //check if there are additional drivers, if yes then add them to drivers list
            if (quotationRequest.AdditionalDrivers != null && quotationRequest.AdditionalDrivers.Any())
            {
                var additionalDrivers = quotationRequest.AdditionalDrivers.Where(e => e.NIN != mainDriverDto.DriverId.ToString());
                foreach (var additionalDriver in additionalDrivers)
                {
                    var driverDto = new DriverDto()
                    {
                        DriverTypeCode = 2,
                        DriverId = long.Parse(additionalDriver.NIN),
                        DriverIdTypeCode = additionalDriver.IsCitizen ? 1 : 2,
                        DriverBirthDate = additionalDriver.DateOfBirthH,
                        DriverBirthDateG = additionalDriver.DateOfBirthG,
                        DriverFirstNameAr = additionalDriver.FirstName,
                        DriverFirstNameEn = (string.IsNullOrEmpty(additionalDriver.EnglishFirstName)
                        || string.IsNullOrWhiteSpace(additionalDriver.EnglishFirstName)) ? "-" : additionalDriver.EnglishFirstName,
                        DriverMiddleNameAr = additionalDriver.SecondName,
                        DriverMiddleNameEn = additionalDriver.EnglishSecondName,
                        DriverLastNameAr = additionalDriver.LastName,
                        DriverLastNameEn = (string.IsNullOrEmpty(additionalDriver.EnglishLastName)
                        || string.IsNullOrWhiteSpace(additionalDriver.EnglishLastName)) ? "-" : additionalDriver.EnglishLastName,
                        DriverOccupation = additionalDriver.ResidentOccupation,
                        DriverNOALast5Years = additionalDriver.NOALast5Years,
                        DriverNOCLast5Years = additionalDriver.NOCLast5Years,
                        DriverNCDFreeYears = 0,
                        DriverNCDReference = "0",
                        DriverRelationship = additionalDriver.RelationShipId ?? 0
                    };
                    if (insuranceCompanyId == 18) //Alamaya as per fayssal
                    {
                        driverDto.DriverRelationship = null;
                    }
                    if (quotationRequest.NationalId.StartsWith("7") && additionalDriver.NIN == additionalDrivers.ToList().FirstOrDefault().NIN)
                    {
                        driverDto.DriverTypeCode = 1;
                        driverDto.DriverNCDFreeYears = quotationRequest.NajmNcdFreeYears;
                        driverDto.DriverNCDReference = quotationRequest.NajmNcdRefrence;
                    }
                    else
                    {
                        driverDto.DriverTypeCode = 2;
                    }
                    if (additionalDriver.Gender == Gender.Male)
                        driverDto.DriverGenderCode = "M";
                    else if (additionalDriver.Gender == Gender.Female)
                        driverDto.DriverGenderCode = "F";
                    else
                        driverDto.DriverGenderCode = "M";

                    driverDto.DriverSocialStatusCode = additionalDriver.SocialStatusId?.ToString();
                    driverDto.DriverNationalityCode = additionalDriver.NationalityCode.HasValue ?
                            additionalDriver.NationalityCode.Value.ToString() : "113";
                    var additionalDriverOccupation = additionalDriver.Occupation;
                    if (additionalDriverOccupation == null && driverDto.DriverIdTypeCode == 1)
                    {
                        driverDto.DriverOccupationCode = "O";
                        driverDto.DriverOccupation = "غير ذالك";
                    }
                    else if (additionalDriverOccupation == null && driverDto.DriverIdTypeCode == 2)
                    {
                        driverDto.DriverOccupationCode = "31010";
                        driverDto.DriverOccupation = "موظف اداري";
                    }
                    else
                    {
                        if ((string.IsNullOrEmpty(additionalDriverOccupation.Code) || additionalDriverOccupation.Code == "o") && driverDto.DriverIdTypeCode == 1)
                        {
                            driverDto.DriverOccupationCode = "O";
                            driverDto.DriverOccupation = "غير ذالك";
                        }

                        else if ((string.IsNullOrEmpty(additionalDriverOccupation.Code) || additionalDriverOccupation.Code == "o") && driverDto.DriverIdTypeCode == 2)
                        {
                            driverDto.DriverOccupationCode = "31010";
                            driverDto.DriverOccupation = "موظف اداري";
                        }
                        else
                        {
                            driverDto.DriverOccupationCode = additionalDriverOccupation.Code;
                            driverDto.DriverOccupation = additionalDriverOccupation.NameAr.Trim();
                        }
                    }
                    driverDto.DriverDrivingPercentage = additionalDriver.DrivingPercentage; // from tameenk
                    additionalDrivingPercentage += additionalDriver.DrivingPercentage.HasValue ? additionalDriver.DrivingPercentage.Value : 0;
                    driverDto.DriverEducationCode = additionalDriver.EducationId;
                    if (!driverDto.DriverEducationCode.HasValue || driverDto.DriverEducationCode == 0)
                    {
                        driverDto.DriverEducationCode = 1;
                    }
                    driverDto.DriverMedicalConditionCode = additionalDriver.MedicalConditionId;
                    driverDto.DriverChildrenBelow16Years = additionalDriver.ChildrenBelow16Years;
                    if (additionalDriver.CityId.HasValue)
                    {
                        var city = cities.Where(c => c.Code == additionalDriver.CityId.Value).FirstOrDefault();
                        if (city == null)
                        {
                            driverDto.DriverHomeCity = mainDriverDto.DriverHomeCity;
                            driverDto.DriverHomeCityCode = mainDriverDto.DriverHomeCityCode;
                        }
                        else
                        {
                            driverDto.DriverHomeCity = city.ArabicDescription;
                            driverDto.DriverHomeCityCode = city.YakeenCode.ToString();
                        }
                    }
                    else
                    {
                        driverDto.DriverHomeCity = mainDriverDto.DriverHomeCity;
                        driverDto.DriverHomeCityCode = mainDriverDto.DriverHomeCityCode;
                    }
                    if (additionalDriver.WorkCityId.HasValue)
                    {
                        var city = cities.Where(c => c.Code == additionalDriver.WorkCityId.Value).FirstOrDefault();
                        if (city == null)
                        {
                            driverDto.DriverWorkCity = driverDto.DriverHomeCity;
                            driverDto.DriverWorkCityCode = driverDto.DriverHomeCityCode;

                        }
                        else
                        {
                            driverDto.DriverWorkCity = city.ArabicDescription;
                            driverDto.DriverWorkCityCode = city.YakeenCode.ToString();
                        }
                    }
                    else
                    {
                        driverDto.DriverWorkCity = driverDto.DriverHomeCity;
                        driverDto.DriverWorkCityCode = driverDto.DriverHomeCityCode;
                    }

                    var additionalDriverLicenses = _driverRepository.Table
                            .Include(x => x.DriverLicenses)
                            .FirstOrDefault(x => x.DriverId == additionalDriver.DriverId && x.IsDeleted == false)?
                            .DriverLicenses;

                    var additionalDriverLicenseDtos = new List<LicenseDto>();
                    if (additionalDriverLicenses != null && additionalDriverLicenses.Count() > 0)
                    {
                        int licenseNumberYears;
                        foreach (var item in additionalDriverLicenses)
                        {
                            int? _driverLicenseTypeCode = item.TypeDesc;
                            if (insuranceCompanyId == 14)
                                _driverLicenseTypeCode = GetWataniyaDriverLicenseType(item.TypeDesc.ToString())?.WataniyaCode.Value;

                            licenseNumberYears = (DateTime.Now.Year - DateExtension.ConvertHijriStringToDateTime(item.IssueDateH).Year);
                            additionalDriverLicenseDtos.Add(new LicenseDto()
                            {
                                DriverLicenseExpiryDate = Utilities.HandleHijriDate(item.ExpiryDateH),
                                DriverLicenseTypeCode = _driverLicenseTypeCode.ToString(),
                                LicenseCountryCode = 113,
                                LicenseNumberYears = licenseNumberYears == 0 ? 1 : licenseNumberYears
                            });
                        }
                        driverDto.DriverLicenses = additionalDriverLicenseDtos; //from tameenk
                    }
                    else
                    {
                        driverDto.DriverLicenses = null;
                    }
                    // Aditional Driver Extra Licenses
                    if (driversExtraLicenses != null && driversExtraLicenses.Any())
                    {
                        var additionalDriversExtraLicenses = driversExtraLicenses.Where(m => m.IsMainDriver == false && m.DriverNin == additionalDriver.NIN);

                        if (additionalDriversExtraLicenses != null && additionalDriversExtraLicenses.Any())
                        {
                            LicenseDto licenseDto;
                            List<LicenseDto> licenseAditional = new List<LicenseDto>();
                            foreach (var item in additionalDriversExtraLicenses)
                            {
                                if (item.LicenseCountryCode < 1 || item.LicenseCountryCode == 113)  //as jira 349
                                    continue;

                                licenseDto = new LicenseDto();
                                licenseDto.LicenseNumberYears = item.LicenseNumberYears;
                                licenseDto.LicenseCountryCode = item.LicenseCountryCode;
                                licenseAditional.Add(licenseDto);

                            }
                            if (driverDto.DriverLicenses != null)
                                driverDto.DriverLicenses.AddRange(licenseAditional);
                            else
                                driverDto.DriverLicenses = licenseAditional;
                        }
                    }
                    var driverViolations = driverViolationRepository.TableNoTracking
                                     .Where(x => x.InsuredId == quotationRequest.InsuredId && x.NIN == additionalDriver.NIN);
                    if (driverViolations != null && driverViolations.Count() > 0)
                    {
                        driverDto.DriverViolations = driverViolations
                            .Select(e => new ViolationDto() { ViolationCode = e.ViolationId }).ToList();
                    }

                    // this for additional drivers
                    if (insuranceCompanyId == 14)//Wataniya
                        HandleDriveAddressDetailsForWataniya(driverDto);

                    drivers.Add(driverDto);
                }
            }
            if (additionalDrivingPercentage != 100 && drivers.Count() > 1)
            {
                int numberOfDriver = drivers.Count();
                if (drivers.Count() > 4)
                    numberOfDriver = 4;
                int percentage = 0;
                int mainPercentage = 0;

                if (numberOfDriver == 4)
                {
                    percentage = mainPercentage = 25;
                }
                else if (numberOfDriver == 3)
                {
                    percentage = 25;
                    mainPercentage = 50;
                }
                else if (numberOfDriver == 2)
                {
                    percentage = mainPercentage = 50;
                }
                foreach (var d in drivers)
                {
                    if (d.DriverTypeCode == 1)
                        d.DriverDrivingPercentage = mainPercentage;
                    else
                        d.DriverDrivingPercentage = percentage;
                }
            }
            return drivers;
        }

        private LicenseType GetWataniyaDriverLicenseType(string licenseType)
        {
            LicenseType license = null;

            short typeCode = 0;
            short.TryParse(licenseType, out typeCode);
            if (typeCode > 0)
                license = GetAllLicenseType().Where(a => a.Code == typeCode).FirstOrDefault();

            return license;
        }

        private void HandleDriveAddressDetailsForWataniya(DriverDto model)
        {
            if (model.DriverId > 0)
            {
                var address = GetAddressesByNin(model.DriverId.ToString());
                if (address != null)
                    model.DriverHomeAddress = address.BuildingNumber + " " + address.AdditionalNumber + " " + address.PostCode + " " + address.City;
            }
        }

        private Address GetAddressesByNin(string driverNin)
        {
            Address address = null;
            IDbContext idbContext = (IDbContext)EngineContext.Current.Resolve<IDbContext>();
            try
            {
                idbContext.DatabaseInstance.CommandTimeout = new int?(60);
                var command = idbContext.DatabaseInstance.Connection.CreateCommand();
                command.CommandText = "GetAddress";
                command.CommandType = CommandType.StoredProcedure;
                SqlParameter driverNinParam = new SqlParameter() { ParameterName = "@driverNin", Value = driverNin };
                command.Parameters.Add(driverNinParam);
                idbContext.DatabaseInstance.Connection.Open();
                var reader = command.ExecuteReader();
                address = ((IObjectContextAdapter)idbContext).ObjectContext.Translate<Address>(reader).FirstOrDefault();
                idbContext.DatabaseInstance.Connection.Close();
                return address;
            }
            catch (Exception ex)
            {
                idbContext.DatabaseInstance.Connection.Close();
                return null;
            }
        }

        private List<Driver> HandleDriversAbove18Years(List<Driver> drivers, DriverDto mainDriverDto)
        {
            var additionalDrivers = drivers.Where(a => a.NIN != mainDriverDto.DriverId.ToString()).ToList();
            if (additionalDrivers == null || additionalDrivers.Count == 0)
                return drivers;
            if (additionalDrivers.Count > 1)
                return drivers;

            var currentYear = DateTime.Today.Year;
            var additionalDriver = additionalDrivers.FirstOrDefault();
            var driverAge = currentYear - additionalDriver.DateOfBirthG.Year;

            if (driverAge < 18)
                return drivers;

            mainDriverDto.DriverDrivingPercentage += additionalDriver.DrivingPercentage;
            drivers.Remove(additionalDriver);
            return drivers;
        }

        public PromotionProgramUserModel GetUserPromotionCodeInfo(string userId, string nationalId, int insuranceCompanyId, int insuranceTypeCode)
        {
            IDbContext dbContext = EngineContext.Current.Resolve<IDbContext>();

            try
            {
                if (insuranceCompanyId < 1)
                    throw new TameenkArgumentNullException(nameof(insuranceCompanyId), "Insurance company id can't be less than 1.");
                PromotionProgramUserModel promotionProgramUserInfo = null;
                dbContext.DatabaseInstance.CommandTimeout = 60;
                var command = dbContext.DatabaseInstance.Connection.CreateCommand();
                command.CommandText = "GetUserPromotionProgramInfo";
                command.CommandType = CommandType.StoredProcedure;

                if (!string.IsNullOrEmpty(userId) && userId != Guid.Empty.ToString())
                {
                    SqlParameter userIdParam = new SqlParameter() { ParameterName = "userId", Value = userId };
                    command.Parameters.Add(userIdParam);
                }
                SqlParameter nationalIdParam = new SqlParameter() { ParameterName = "nationalId", Value = nationalId };
                command.Parameters.Add(nationalIdParam);

                SqlParameter insuranceCompanyIdParam = new SqlParameter() { ParameterName = "insuranceCompanyId", Value = insuranceCompanyId };
                SqlParameter insuranceTypeCodeParam = new SqlParameter() { ParameterName = "insuranceTypeCode", Value = insuranceTypeCode };

                command.Parameters.Add(insuranceCompanyIdParam);
                command.Parameters.Add(insuranceTypeCodeParam);

                dbContext.DatabaseInstance.Connection.Open();
                var reader = command.ExecuteReader();
                promotionProgramUserInfo = ((IObjectContextAdapter)dbContext).ObjectContext.Translate<PromotionProgramUserModel>(reader).FirstOrDefault();
                if (promotionProgramUserInfo == null)
                {
                    reader.NextResult();
                    promotionProgramUserInfo = ((IObjectContextAdapter)dbContext).ObjectContext.Translate<PromotionProgramUserModel>(reader).FirstOrDefault();
                }

                return promotionProgramUserInfo;
            }
            catch
            {
                return null;
            }
            finally
            {
                if (dbContext.DatabaseInstance.Connection.State == ConnectionState.Open)
                    dbContext.DatabaseInstance.Connection.Close();
            }
        }

        public VehicleInsurance.VehicleModel GetVehicleModelByMakerCodeAndModelCode(short vehicleMakerId, long vehicleModelId)
        {
            var vehicleModel = _vehicleModelRepository.TableNoTracking.Where(a => a.VehicleMakerCode == vehicleMakerId && a.Code == vehicleModelId).FirstOrDefault();
            return vehicleModel;
        }

        public int GetWataiyaPlateLetterId(string letter)
        {
            int letterId = 0;
            var letterData = _vehiclePlateTextRepository.TableNoTracking.Where(a => a.ArabicDescription == letter).FirstOrDefault();
            if (letterData != null && letterData.WataniyaCode.HasValue)
                letterId = letterData.WataniyaCode.Value;

            return letterId;
        }

        private IEnumerable<Product> ExcludeProductOrBenefitWithZeroPrice(IEnumerable<Product> products)
        {
            foreach (var product in products)
            {
                var productBenefits = new List<Product_Benefit>();
                productBenefits.AddRange(product.Product_Benefits.Where(x => x.BenefitPrice > 0 || (x.IsReadOnly && x.IsSelected.HasValue && x.IsSelected == true)));
                product.Product_Benefits = productBenefits;
            }

            return products.Where(x => x.ProductPrice > 0);
        }

        private QuotationResponseModel HnadleGetQuoteResponseModelMapping(QuotationNewOutput quotationOutput, int insuranceCompanyId, int insuranceTypeCode, bool vehicleAgencyRepair, int? deductibleValue)
        {
            QuotationResponseModel responseModel = new QuotationResponseModel();

            if (quotationOutput == null || quotationOutput.QuotationResponse == null || quotationOutput.QuotationResponse.Products == null || quotationOutput.QuotationResponse.Products.Count ==0)
                return null;

            responseModel = quotationOutput.QuotationResponse.ToModel();
            responseModel.ShowTabby = quotationOutput.ShowTabby;
            foreach (var product in responseModel.Products)
            {
                product.IsRenewal = quotationOutput.IsRenewal;
                if (product.InsuranceTypeCode == 1)
                    product.ShowTabby = quotationOutput.ActiveTabbyTPL;
                else if (product.InsuranceTypeCode == 2)
                    product.ShowTabby = quotationOutput.ActiveTabbyComp;
                else if (product.InsuranceTypeCode == 7)
                    product.ShowTabby = quotationOutput.ActiveTabbySanadPlus;
                else if (product.InsuranceTypeCode == 8)
                    product.ShowTabby = quotationOutput.ActiveTabbyWafiSmart;
                else if (product.InsuranceTypeCode == 13)
                    product.ShowTabby = quotationOutput.ActiveTabbyMotorPlus;
                else
                    product.ShowTabby = false;
                if (insuranceCompanyId == 8 && insuranceTypeCode == 2)
                {
                    if (product.DeductableValue == 0)
                        product.DeductableValue = 2000;
                }
                if (product.InsuranceTypeCode == 1 && !string.IsNullOrEmpty(quotationOutput.TermsAndConditionsFilePath))
                {
                    product.TermsFilePathAr = quotationOutput.TermsAndConditionsFilePath.ToLower().Replace("_en", "_ar");
                    product.TermsFilePathEn = quotationOutput.TermsAndConditionsFilePath.ToLower().Replace("_ar", "_en");
                }
                else if (product.InsuranceTypeCode == 2 && !string.IsNullOrEmpty(quotationOutput.TermsAndConditionsFilePathComp))
                {
                    product.TermsFilePathAr = quotationOutput.TermsAndConditionsFilePathComp.ToLower().Replace("_en", "_ar");
                    product.TermsFilePathEn = quotationOutput.TermsAndConditionsFilePathComp.ToLower().Replace("_ar", "_en");
                }
                else if (product.InsuranceTypeCode == 8 && !string.IsNullOrEmpty(quotationOutput.TermsAndConditionsFilePathComp))
                {
                    product.TermsFilePathAr = quotationOutput.TermsAndConditionsFilePathComp.ToLower().Replace("_Comp", "_Wafi").Replace("_en", "_ar");
                    product.TermsFilePathEn = quotationOutput.TermsAndConditionsFilePathComp.ToLower().Replace("_Comp", "_Wafi").Replace("_ar", "_en");
                }
                else if (product.InsuranceTypeCode == 9 && !string.IsNullOrEmpty(quotationOutput.TermsAndConditionsFilePathComp))
                {
                    product.TermsFilePathAr = quotationOutput.TermsAndConditionsFilePathComp.ToLower().Replace("_Comp", "_OD").Replace("_en", "_ar");
                    product.TermsFilePathEn = quotationOutput.TermsAndConditionsFilePathComp.ToLower().Replace("_Comp", "_OD").Replace("_ar", "_en");
                }
                else if (product.InsuranceTypeCode == 7 && !string.IsNullOrEmpty(quotationOutput.TermsAndConditionsFilePathSanadPlus))
                {
                    product.TermsFilePathAr = quotationOutput.TermsAndConditionsFilePathSanadPlus.ToLower().Replace("_en", "_ar");
                    product.TermsFilePathEn = quotationOutput.TermsAndConditionsFilePathSanadPlus.ToLower().Replace("_ar", "_en");
                }
                else if (product.InsuranceTypeCode == 13 && !string.IsNullOrEmpty(quotationOutput.TermsAndConditionsFilePathComp))
                {
                    product.TermsFilePathAr = quotationOutput.TermsAndConditionsFilePathComp.Replace("_Comp", "_MotorPlus").Replace("_en", "_ar");
                    product.TermsFilePathEn = quotationOutput.TermsAndConditionsFilePathComp.Replace("_Comp", "_MotorPlus").Replace("_ar", "_en");
                }
                if (product.PriceDetails != null)
                {
                    List<PriceDetailModel> priceDetails = new List<PriceDetailModel>();
                    var prices = product.PriceDetails.OrderBy(a => a.PriceType.Order).ToList();
                    foreach (var price in prices)
                    {
                        if (price.PriceValue > 0)
                        {
                            if (price.PriceTypeCode == 12)
                            {
                                if (insuranceCompanyId == 22)
                                {
                                    price.PriceType.EnglishDescription = "COVID-19 Vaccine campaign";
                                    price.PriceType.ArabicDescription = "خصم مبادرة اللقاح كرونا";
                                }
                                else if (insuranceCompanyId == 25)
                                {
                                    price.PriceType.EnglishDescription = "Voluntary Excess Discount";
                                    price.PriceType.ArabicDescription = "خصم مبلغ التحمل الإضافي";
                                }
                            }

                            if (price.PriceTypeCode == 1 && insuranceCompanyId == 20 && DateTime.Now.Date >= new DateTime(2022, 09, 20) && DateTime.Now.Date <= new DateTime(2022, 12, 21))
                            {
                                price.PriceType.ArabicDescription = "خصم الخريف";
                                price.PriceType.EnglishDescription = "Autumn discount";
                            }
                            else if (price.PriceTypeCode == 1 && DateTime.Now.Date <= new DateTime(2022, 09, 30))
                            {
                                price.PriceType.EnglishDescription = "National Day Discount";
                                price.PriceType.ArabicDescription = "خصم اليوم الوطني";
                            }

                            if (price.PriceTypeCode == 1)
                            {
                                //if (insuranceCompanyId == 5 && DateTime.Now.Date >= new DateTime(2022, 02, 22) && DateTime.Now.Date <= new DateTime(2022, 02, 22))
                                //{
                                //    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                //    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                //}
                                //else if (insuranceCompanyId == 14 && DateTime.Now.Date >= new DateTime(2022, 02, 20) && DateTime.Now.Date <= new DateTime(2022, 02, 27))
                                //{
                                //    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                //    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                //}
                                if (insuranceCompanyId == 20) // Rajhi
                                {
                                    //if (DateTime.Now.Date >= new DateTime(2022, 02, 18) && DateTime.Now.Date <= new DateTime(2022, 02, 26))
                                    //{
                                    //    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                    //    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                    //}
                                    if (DateTime.Now.Date >= new DateTime(2023, 09, 21) && DateTime.Now.Date <= new DateTime(2023, 09, 30))
                                    {
                                        price.PriceType.EnglishDescription = "National Day discount";
                                        price.PriceType.ArabicDescription = "خصم اليوم الوطنى";
                                    }
                                    else if (DateTime.Now.Date >= new DateTime(2023, 01, 5).Date)
                                    {
                                        price.PriceType.EnglishDescription = "Special Discount";
                                        price.PriceType.ArabicDescription = "خصم حصري";
                                    }
                                    //else if (DateTime.Now.Date >= new DateTime(2022, 03, 21) && DateTime.Now.Date <= new DateTime(2022, 06, 21)) // End Date --> To be appointed letter 
                                    //{
                                    //    price.PriceType.EnglishDescription = "Spring Discount";
                                    //    price.PriceType.ArabicDescription = "خصم الربيع";
                                    //}
                                    //else if (DateTime.Now.Date >= new DateTime(2022, 06, 21)) // End Date --> To be appointed letter 
                                    //{
                                    //    price.PriceType.ArabicDescription = "خصم الصيف";
                                    //    price.PriceType.EnglishDescription = "Summer Discount";
                                    //}
                                }
                                else if (insuranceCompanyId == 2 && DateTime.Now.Date >= new DateTime(2023, 09, 15) && DateTime.Now.Date <= new DateTime(2023, 09, 30)) // ACIG
                                {
                                    price.PriceType.EnglishDescription = "National Day discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطنى";
                                }
                                else if (insuranceCompanyId == 4 && DateTime.Now.Date >= new DateTime(2023, 09, 23) && DateTime.Now.Date <= new DateTime(2023, 09, 27)) // AICC
                                {
                                    price.PriceType.EnglishDescription = "National Day discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطنى";
                                }
                                else if (insuranceCompanyId == 5 && DateTime.Now.Date >= new DateTime(2023, 09, 23) && DateTime.Now.Date <= new DateTime(2023, 09, 24)) // TUIC
                                {
                                    price.PriceType.EnglishDescription = "National Day discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطنى";
                                }
                                else if (insuranceCompanyId == 7 && DateTime.Now.Date >= new DateTime(2023, 09, 22) && DateTime.Now.Date <= new DateTime(2023, 09, 24)) // Wala
                                {
                                    price.PriceType.EnglishDescription = "National Day discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطنى";
                                }
                                else if (insuranceCompanyId == 9 && DateTime.Now.Date >= new DateTime(2023, 02, 22) && DateTime.Now.Date <= new DateTime(2023, 02, 23)) // ArabianShield
                                {
                                    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                }
                                else if (insuranceCompanyId == 11 && DateTime.Now.Date >= new DateTime(2023, 09, 17) && DateTime.Now.Date <= new DateTime(2023, 09, 27)) // GGI
                                {
                                    price.PriceType.EnglishDescription = "National Day discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطنى";
                                }
                                else if (insuranceCompanyId == 12 && DateTime.Now.Date >= new DateTime(2023, 09, 11) && DateTime.Now.Date <= new DateTime(2023, 09, 30)) // Tawuniya
                                {
                                    price.PriceType.EnglishDescription = "National Day - Insure & Safe Discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطني - أمّن تسلم";
                                }
                                else if (insuranceCompanyId == 13 && DateTime.Now.Date >= new DateTime(2023, 02, 21) && DateTime.Now.Date <= new DateTime(2023, 02, 25)) // Salama
                                {
                                    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                }
                                else if ((insuranceCompanyId == 14 && insuranceTypeCode == 2) && DateTime.Now.Date >= new DateTime(2023, 09, 23) && DateTime.Now.Date <= new DateTime(2023, 09, 30)) // Wataniya
                                {
                                    price.PriceType.EnglishDescription = "Saudi National Day Discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطني";
                                }
                                else if (insuranceCompanyId == 17 && DateTime.Now.Date >= new DateTime(2023, 09, 21) && DateTime.Now.Date <= new DateTime(2023, 09, 30)) // UCA
                                {
                                    price.PriceType.EnglishDescription = "Saudi National Day Discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطني";
                                }
                                else if ((insuranceCompanyId == 24 && insuranceTypeCode != 2) && DateTime.Now.Date >= new DateTime(2023, 09, 21) && DateTime.Now.Date <= new DateTime(2023, 09, 28)) // Allianz
                                {
                                    price.PriceType.EnglishDescription = "Saudi National Day Discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطني";
                                }
                                else if (insuranceCompanyId == 25 && DateTime.Now.Date >= new DateTime(2023, 02, 22) && DateTime.Now.Date <= new DateTime(2023, 02, 23)) // (AXA / GIG)
                                {
                                    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                }
                                //else if (insuranceCompanyId == 26 && DateTime.Now.Date >= new DateTime(2022, 02, 22) && DateTime.Now.Date <= new DateTime(2022, 02, 24))
                                //{
                                //    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                //    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                //}
                                else if (insuranceCompanyId == 27 && DateTime.Now.Date >= new DateTime(2023, 09, 23) && DateTime.Now.Date <= new DateTime(2023, 09, 25)) // Buruj
                                {
                                    price.PriceType.EnglishDescription = "National Day discount";
                                    price.PriceType.ArabicDescription = "خصم اليوم الوطنى";
                                }
                                //else if (insuranceCompanyId == 22 && DateTime.Now.Date >= new DateTime(2022, 02, 21) && DateTime.Now.Date <= new DateTime(2022, 02, 23))
                                //{
                                //    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                //    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                //}
                                //else if (insuranceCompanyId == 9 && DateTime.Now.Date >= new DateTime(2022, 02, 21) && DateTime.Now.Date <= new DateTime(2022, 02, 23))
                                //{
                                //    price.PriceType.EnglishDescription = "Saudi Foundation Day discount";
                                //    price.PriceType.ArabicDescription = "خصم يوم التأسيس السعودي";
                                //}
                            }

                            if (insuranceCompanyId == 14 && price.PriceTypeCode == 3 && DateTime.Now.Date <= new DateTime(2022, 09, 30))
                            {
                                price.PriceType.EnglishDescription = "National Day Discount";
                                price.PriceType.ArabicDescription = "خصم اليوم الوطني";
                            }
                            priceDetails.Add(price);
                        }
                    }

                    ////
                    /// 1- BCare discount 5% As per Mubarak 18-12-2022
                    /// 2- https://bcare.atlassian.net/browse/VW-859
                    if (product.InsuranceTypeCode == 2 && DateTime.Now.Date >= new DateTime(2022, 12, 21))
                    {
                        var bcareDiscountPrice = new PriceDetailModel();
                        bcareDiscountPrice.PriceType = new PriceTypeModel();
                        bcareDiscountPrice.PriceType.ArabicDescription = "خصم بي كير";
                        bcareDiscountPrice.PriceType.EnglishDescription = "BCare discount";
                        bcareDiscountPrice.PriceValue = (product.ProductPrice >= 1350 && product.ProductPrice <= 3999) ? 200 : Math.Round((product.ProductPrice * 5) / 100, 2);

                        product.ProductPrice -= bcareDiscountPrice.PriceValue;
                        priceDetails.Add(bcareDiscountPrice);
                    }

                    if (priceDetails.Count() > 0)
                        product.PriceDetails = priceDetails;
                }
                if (product.Product_Benefits != null)
                {
                    foreach (var benfit in product.Product_Benefits)
                    {
                        if (benfit.BenefitId != 0)
                            continue;
                        var serviceProduct = quotationOutput.Products.Where(a => a.ProductId == product.ExternalProductId).FirstOrDefault();
                        if (serviceProduct == null)
                            continue;
                        // get specific benfit from the selected product above
                        var serviceBenfitInfo = serviceProduct.Benefits.Where(a => a.BenefitId == benfit.BenefitExternalId).FirstOrDefault();
                        if (serviceBenfitInfo == null)
                            continue;
                        benfit.Benefit.ArabicDescription = serviceBenfitInfo.BenefitNameAr;
                        benfit.Benefit.EnglishDescription = serviceBenfitInfo.BenefitNameEn;
                    }
                    product.Product_Benefits = product.Product_Benefits.OrderByDescending(a => a.IsReadOnly).ToList();
                    int indexOfBenefit14 = product.Product_Benefits.ToList().FindIndex(a => a.BenefitId == 14);
                    if (indexOfBenefit14 > 0)
                    {
                        product.Product_Benefits = product.Product_Benefits.Move(indexOfBenefit14, 1, 0).ToList();
                    }

                }
            }
            if (insuranceTypeCode == 2 || insuranceTypeCode == 9 || (insuranceTypeCode == 1 && insuranceCompanyId == 12))
            {
                if (!CompaniesIdForStaticDeductible.Contains(insuranceCompanyId))
                    responseModel.Products = responseModel.Products.OrderByDescending(x => x.DeductableValue).ToList();

                #region Rearrange deductible // As per Fayssal & Mubarak  @22-12-2022 to return list arranged Descending

                //var hasDeductable10000 = false;
                //var deductable10000Index = 0;
                //var hasDeductable4000 = false;
                //var deductable4000Index = 0;
                //for (int i = 0; i < responseModel.Products.Count; i++)
                //{
                //    if (responseModel.Products.ElementAt(i).DeductableValue == 10000 && insuranceCompanyId != 5)
                //    {
                //        hasDeductable10000 = true;
                //        deductable10000Index = i;
                //        break;
                //    }
                //    if (responseModel.Products.ElementAt(i).DeductableValue == 4000&& insuranceCompanyId==5)
                //    {
                //        hasDeductable4000 = true;
                //        deductable4000Index = i;
                //        break;
                //    }
                //}
                //if (hasDeductable10000)
                //{
                //    responseModel.Products = responseModel.Products.Move(deductable10000Index, 1, 0).ToList();
                //}
                //if (hasDeductable4000&& insuranceCompanyId == 5)
                //{
                //    responseModel.Products = responseModel.Products.Move(deductable4000Index, 1, 0).ToList();
                //}

                #endregion

                if (vehicleAgencyRepair && insuranceCompanyId == 22)
                {
                    var defaultProduct = responseModel.Products.FirstOrDefault();
                    var agencyRepairBenefit = defaultProduct.Product_Benefits.Where(a => a.BenefitId == 7).FirstOrDefault();
                    if (agencyRepairBenefit != null && agencyRepairBenefit.BenefitPrice.HasValue && agencyRepairBenefit.BenefitPrice > 0)
                    {
                        responseModel.Products.Remove(defaultProduct);
                        var benefitVat = (agencyRepairBenefit.BenefitPrice.Value * 15) / 100;
                        defaultProduct.ProductPrice = defaultProduct.ProductPrice + agencyRepairBenefit.BenefitPrice.Value + benefitVat;
                        responseModel.Products.Add(defaultProduct);
                        int listCount = responseModel.Products.Count();
                        responseModel.Products = responseModel.Products.Move(listCount - 1, 1, 0).ToList();
                        if (defaultProduct.DeductableValue != deductibleValue)
                        {
                            var deductableProduct = responseModel.Products.Where(a => a.DeductableValue == deductibleValue).FirstOrDefault();
                            if (deductableProduct != null)
                            {
                                var agencyBenefit = deductableProduct.Product_Benefits.Where(a => a.BenefitId == 7).FirstOrDefault();
                                if (agencyBenefit != null && agencyBenefit.BenefitPrice.HasValue && agencyBenefit.BenefitPrice > 0)
                                {
                                    int productIndex = responseModel.Products.ToList().IndexOf(deductableProduct);
                                    responseModel.Products.Remove(deductableProduct);
                                    var vat = (agencyBenefit.BenefitPrice.Value * 15) / 100;
                                    deductableProduct.ProductPrice = deductableProduct.ProductPrice + agencyBenefit.BenefitPrice.Value + vat;
                                    responseModel.Products.Add(deductableProduct);
                                    responseModel.Products = responseModel.Products.Move(listCount - 1, 1, productIndex).ToList();
                                }
                            }
                        }
                    }
                }
            }

            return responseModel;
        }

        private async void InsertQuotationResponseIntoInmemoryCache(string cacheKey, string jsonResponse)
        {
            try
            {
                _cacheManager.Set(cacheKey, jsonResponse, 30);
            }
            catch (Exception ex)
            {
                System.IO.File.WriteAllText(@"C:\inetpub\WataniyaLog\InsertQuotationResponseIntoInmemoryCache_" + cacheKey + "_Exception.txt", ex.ToString());
            }
        }

        #endregion


        #region Get From Caching

        private List<City> GetAllCities(int pageIndx = 0, int pageSize = int.MaxValue)
        {
            return _cacheManager.Get(string.Format("_CITY__aLl_CACHE_Key_", pageIndx, pageSize, 1440), () =>
            {
                return _cityRepository.TableNoTracking.ToList();
            });
        }

        private IList<VehicleColor> GetVehicleColors()
        {
            return _cacheManager.Get("tameenk.vehiclColor.all", () =>
            {
                return _vehicleColorRepository.Table.ToList();
            });
        }

        private IPagedList<VehicleInsurance.VehicleMaker> VehicleMakers(int pageIndex = 0, int pageSize = int.MaxValue)
        {
            return _cacheManager.Get(string.Format("tameenk.vehiclMaker.all.{0}.{1}", pageIndex, pageSize), () =>
            {
                return new PagedList<VehicleInsurance.VehicleMaker>(_vehicleMakerRepository.Table.OrderBy(e => e.Code), pageIndex, pageSize);
            });
        }
        
        private IPagedList<VehicleInsurance.VehicleModel> VehicleModels(int vehicleMakerId, int pageIndex = 0, int pageSize = int.MaxValue)
        {
            string vehicleMakerCode = vehicleMakerId.ToString();
            return _cacheManager.Get(string.Format("tameenk.vehiclMaker.all.{0}.{1}.{2}", vehicleMakerId, pageIndex, pageSize), () =>
            {
                return new PagedList<VehicleInsurance.VehicleModel>(_vehicleModelRepository.Table.Where(e => e.VehicleMakerCode == vehicleMakerId).OrderBy(e => e.Code), pageIndex, pageSize);
            });
        }

        private List<LicenseType> GetAllLicenseType(int pageIndx = 0, int pageSize = int.MaxValue)
        {
            return _cacheManager.Get(string.Format("_License___typE_CACHE_Key_", pageIndx, pageSize, 1440), () =>
            {
                return _licenseTypeRepository.TableNoTracking.ToList();
            });
        }

        #endregion
    }
}