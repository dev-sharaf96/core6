using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Reflection;
using System.Reflection.Emit;
using Tameenk.Core.Domain;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Entities.Payments;
using Tameenk.Core.Domain.Entities.PromotionPrograms;
using Tameenk.Core.Domain.Entities.Quotations;
using Tameenk.Core.Domain.Entities.VehicleInsurance;
using Tameenk.Data;
using Tameenk.Data.Mapping;
using Tameenk.Data.Mapping.Attachments;
using Tameenk.Data.Mapping.Identity;
using Tameenk.Data.Mapping.Messages;
using Tameenk.Data.Mapping.Orders;
using Tameenk.Data.Mapping.Payments;
using Tameenk.Data.Mapping.Payments.Edaat;
using Tameenk.Data.Mapping.Policies;
using Tameenk.Data.Mapping.Quotations;
using Tameenk.Data.Mapping.VehicleInsurance;
using Tameenk.Services.QuotationApi.Data.Mapping;

namespace TameenkDAL
{
    public class YourDbContext : DbContext
    {
        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options)
        {
        }
        public virtual DbSet<Address> Addresses { get; set; }
       // public virtual DbSet<Attachment> Attachments { get; set; }
        public virtual DbSet<BankCode> BankCodes { get; set; }
        public virtual DbSet<Benefit> Benefits { get; set; }
        public virtual DbSet<CheckoutAdditionalDriver> CheckoutAdditionalDrivers { get; set; }
        public virtual DbSet<CheckoutCarImage> CheckoutCarImages { get; set; }
        public virtual DbSet<CheckoutDetail> CheckoutDetails { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Deductible> Deductibles { get; set; }
        public virtual DbSet<Driver> Drivers { get; set; }
        public virtual DbSet<DriverLicense> DriverLicenses { get; set; }
        public virtual DbSet<DriverType> DriverTypes { get; set; }
        //public virtual DbSet<ErrorCode> ErrorCodes { get; set; }
        public virtual DbSet<InsuaranceCompanyBenefit> InsuaranceCompanyBenefits { get; set; }
        public virtual DbSet<InsuranceCompany> InsuranceCompanies { get; set; }
        public virtual DbSet<InsuranceCompanyProductTypeConfig> InsuranceCompanyProductTypeConfigs { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<Invoice_Benefit> Invoice_Benefit { get; set; }
        public virtual DbSet<InvoiceFile> InvoiceFiles { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<LicenseType> LicenseTypes { get; set; }
        //public virtual DbSet<NajmStatusHistory> NajmStatusHistories { get; set; }
        public virtual DbSet<NCDFreeYear> NCDFreeYears { get; set; }
        public virtual DbSet<PayfortPaymentRequest> PayfortPaymentRequests { get; set; }
        public virtual DbSet<PayfortPaymentResponse> PayfortPaymentResponses { get; set; }
        //public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<PaymentMethod> PaymentMethods { get; set; }
        public virtual DbSet<Policy> Policies { get; set; }
        public virtual DbSet<PolicyDetail> PolicyDetails { get; set; }
        public virtual DbSet<PolicyFile> PolicyFiles { get; set; }
        public virtual DbSet<PolicyStatus> PolicyStatus { get; set; }
        public virtual DbSet<PriceDetail> PriceDetails { get; set; }
        public virtual DbSet<PriceType> PriceTypes { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Product_Benefit> Product_Benefit { get; set; }
        public virtual DbSet<ProductType> ProductTypes { get; set; }
        public virtual DbSet<QuotationRequest> QuotationRequest { get; set; }
        public virtual DbSet<QuotationResponse> QuotationResponses { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RoleType> RoleTypes { get; set; }

        public virtual DbSet<VehicleBodyType> VehicleBodyTypes { get; set; }
        public virtual DbSet<VehicleColor> VehicleColors { get; set; }
        public virtual DbSet<VehicleIDType> VehicleIDTypes { get; set; }
        public virtual DbSet<VehicleMaker> VehicleMakers { get; set; }
        public virtual DbSet<VehicleModel> VehicleModels { get; set; }
        public virtual DbSet<VehiclePlateText> VehiclePlateTexts { get; set; }
        public virtual DbSet<VehiclePlateType> VehiclePlateTypes { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<BreakingSystem> BreakingSystems { get; set; }
        public virtual DbSet<SpeedStabilizer> SpeedStabilizers { get; set; }
        public virtual DbSet<Sensor> Sensors { get; set; }
        public virtual DbSet<DistanceRange> DistanceRanges { get; set; }
        public virtual DbSet<CameraType> CameraTypes { get; set; }
        public virtual DbSet<ParkingPlace> ParkingPlaces { get; set; }
        public virtual DbSet<VehicleTransmissionType> VehicleTransmissionTypes { get; set; }
        public virtual DbSet<AdditionalInfo> AdditionalInfos { get; set; }
        public virtual DbSet<DrivingLicenceYear> DrivingLicenceYears { get; set; }
        public virtual DbSet<DriverMedicalCondition> DriverMedicalConditions { get; set; }
        public virtual DbSet<VehicleUsagePercentage> VehicleUsagePercentages { get; set; }
        public virtual DbSet<QuotationRequestInfoModel> QuotationRequestInfoModels { get; set; }

        public virtual DbSet<UserPurchasedPromotionPrograms> UserPurchasedPromotionPrograms { get; set; }
        public virtual DbSet<Setting> Setting { get; set; }

        public virtual DbSet<MobileAppVersions> MobileAppVersions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<QuotationRequestInfoModel>();
            builder.ApplyConfiguration(new AdditionalInfoMap());
            builder.ApplyConfiguration(new AddressMap());
            //builder.ApplyConfiguration(new AutoleasingAgencyRepairHistoryMap());
            //builder.ApplyConfiguration(new AutoleasingAgencyRepairMap());
            //builder.ApplyConfiguration(new AutoleasingBenefitMap());
            //builder.ApplyConfiguration(new AutoleasingDeductiblesMap());
            //builder.ApplyConfiguration(new AutoleasingDepreciationSettingHistoryMap());
            //builder.ApplyConfiguration(new AutoleasingDepreciationSettingMap());
            //builder.ApplyConfiguration(new AutoleasingInitialQuotationCompaniesMap());
            //builder.ApplyConfiguration(new AutoleasingMinimumPremiumHistoryMap());
            //builder.ApplyConfiguration(new AutoleasingMinimumPremiumMap());
            //builder.ApplyConfiguration(new AutoleasingQuotationFormMap());
            //builder.ApplyConfiguration(new AutoleasingQuotationFormSettingsMap());
            //builder.ApplyConfiguration(new AutoleasingQuotationResponseCacheMap());
            //builder.ApplyConfiguration(new AutoleasingRenewalPolicyStatisticsMap());
            //builder.ApplyConfiguration(new AutomatedTestIntegrationTransactionMap());
            //builder.ApplyConfiguration(new BankCodeMap());
            builder.ApplyConfiguration(new BankInsuranceCompanyMap());
            builder.ApplyConfiguration(new BankMap());
            builder.ApplyConfiguration(new BankNinMap());
            //builder.ApplyConfiguration(new BcareWithdrawalWinnerMap());
            builder.ApplyConfiguration(new BenefitMap());
            builder.ApplyConfiguration(new BreakingSystemMap());
            //builder.ApplyConfiguration(new CameraTypeMap());
            builder.ApplyConfiguration(new CancellationRequestMap());
            builder.ApplyConfiguration(new CareerMap());
            builder.ApplyConfiguration(new CheckoutAdditionalDriverMap());
            builder.ApplyConfiguration(new CheckoutCarImageMap());
            builder.ApplyConfiguration(new CheckoutDetailMap());
            builder.ApplyConfiguration(new CheckoutDriverInfoMap());
            builder.ApplyConfiguration(new CheckoutInsuredMappingTempMap());
            builder.ApplyConfiguration(new CheckoutMobileVerificationMap());
            builder.ApplyConfiguration(new CheckoutUsersMap());
            builder.ApplyConfiguration(new CityCenterMap());
            builder.ApplyConfiguration(new CityMap());
            builder.ApplyConfiguration(new ContactMap());
            builder.ApplyConfiguration(new ContactUsMap());
            builder.ApplyConfiguration(new CountryMap());
            builder.ApplyConfiguration(new DeductibleMap());
            builder.ApplyConfiguration(new DeservingDiscountMap());
            builder.ApplyConfiguration(new DistanceRangeMap());
            builder.ApplyConfiguration(new EmailSettingsMap());
            builder.ApplyConfiguration(new ErrorCodeMap());
            builder.ApplyConfiguration(new ExpiredTokensMap());
            builder.ApplyConfiguration(new ForgotPasswordTokenMap());
            builder.ApplyConfiguration(new HyperpayRequestMap());
            builder.ApplyConfiguration(new IbanHistoryMap());
            builder.ApplyConfiguration(new InsuaranceCompanyBenefitMap());
            builder.ApplyConfiguration(new InsuranceCompanyGradeMap());
            builder.ApplyConfiguration(new InsuranceCompanyMap());
            builder.ApplyConfiguration(new InsuranceCompanyProductTypeConfigMap());
            builder.ApplyConfiguration(new InsuredAddressesCountMap());
            builder.ApplyConfiguration(new InvoiceFileMap());
            builder.ApplyConfiguration(new InvoiceFileTemplatesMap());
            builder.ApplyConfiguration(new InvoiceMap());
            builder.ApplyConfiguration(new LanguageMap());
            builder.ApplyConfiguration(new LicenseTypeMap());
            builder.ApplyConfiguration(new MobileAppVersionsMap());
            builder.ApplyConfiguration(new MOIDetailMap());
            builder.ApplyConfiguration(new MorniRequestMap());
            builder.ApplyConfiguration(new NajmAccidentResponseMap());
            builder.ApplyConfiguration(new NajmResponseMap());
            builder.ApplyConfiguration(new NajmStatusHistoryMap());
            builder.ApplyConfiguration(new NajmStatusMap());
            builder.ApplyConfiguration(new NCDFreeYearMap());
            builder.ApplyConfiguration(new OccupationMap());
            builder.ApplyConfiguration(new OfferMap());
            builder.ApplyConfiguration(new OtpInfoMap());
            builder.ApplyConfiguration(new ParkingPlaceMap());
            builder.ApplyConfiguration(new PayfortPaymentRequestMap());
            builder.ApplyConfiguration(new PayfortPaymentResponseMap());
            builder.ApplyConfiguration(new PaymentMap());
            builder.ApplyConfiguration(new PolicyDetailMap());
            builder.ApplyConfiguration(new PolicyFileMap());
            builder.ApplyConfiguration(new PolicyMap());
            builder.ApplyConfiguration(new PolicyRenewedByCompanyMap());
            builder.ApplyConfiguration(new PolicyStatusMap());
            builder.ApplyConfiguration(new PriceDetailMap());
            builder.ApplyConfiguration(new PriceTypeMap());
            builder.ApplyConfiguration(new ProductMap());
            builder.ApplyConfiguration(new ProductTypeMap());
            builder.ApplyConfiguration(new Product_BenefitMap());
            builder.ApplyConfiguration(new ProfileNotificationMap());
            builder.ApplyConfiguration(new ProfileUpdatePhoneHistoryMap());
            builder.ApplyConfiguration(new QuotationResponseCacheMap());
            builder.ApplyConfiguration(new Quotation_Product_BenefitMap());
            builder.ApplyConfiguration(new ReasonCodeMap());
            builder.ApplyConfiguration(new RegionMap());
            builder.ApplyConfiguration(new RenewalDiscountMap());
            builder.ApplyConfiguration(new RoleMap());
            builder.ApplyConfiguration(new RoleTypeMap());
            builder.ApplyConfiguration(new ScheduleTaskMap());
            builder.ApplyConfiguration(new SensorMap());
            builder.ApplyConfiguration(new SettingMap());
            builder.ApplyConfiguration(new SMSProviderSettingsMap());
            builder.ApplyConfiguration(new SMSSkippedNumbersMap());
            builder.ApplyConfiguration(new SpeedStabilizerMap());
            builder.ApplyConfiguration(new TawuniyaTempTableMap());
            builder.ApplyConfiguration(new UpdateProfileInfoOtpMap());
            builder.ApplyConfiguration(new UserInfoMap());
            builder.ApplyConfiguration(new UserPurchasedPromotionProgramsMap());
            builder.ApplyConfiguration(new VehicleDiscountsMap());
            builder.ApplyConfiguration(new VehicleRequestsMap());
            builder.ApplyConfiguration(new WataniyaDraftPolicyMap());
            builder.ApplyConfiguration(new WataniyaMotorPolicyInfoMap());
            builder.ApplyConfiguration(new YakeenCityCenterMap());
            //builder.ApplyConfiguration(new YakeenDriversMap());
            //builder.ApplyConfiguration(new YakeenVehiclesMap());

            builder.ApplyConfiguration(new AttachmentMap());
            //builder.ApplyConfiguration(new AutoleasingSelectedBenifitsMap());
            //builder.ApplyConfiguration(new RenwalStatitics_OldMap());
            //builder.ApplyConfiguration(new AutoleasingWalletHistoryMap());
            //builder.ApplyConfiguration(new UserClaimFileMap());
            //builder.ApplyConfiguration(new UserClaimHistoryMap());
            //builder.ApplyConfiguration(new UserClaimMap());
            //builder.ApplyConfiguration(new UserClaimStatusMap());
            builder.ApplyConfiguration(new CorporateAccountMap());
            builder.ApplyConfiguration(new CorporateWalletHistoryMap());
            builder.ApplyConfiguration(new AspNetUserMap());
            builder.ApplyConfiguration(new AutoleasingUserMap());
            builder.ApplyConfiguration(new AutoleasingVerifyUsersMap());
            builder.ApplyConfiguration(new ClientMap());
            builder.ApplyConfiguration(new CorporateUsersMap());
            builder.ApplyConfiguration(new CorporateVerifyUsersMap());
            builder.ApplyConfiguration(new LeasingUserMap());
            builder.ApplyConfiguration(new LeasingUsersLocationsDeviceInfoMap());
            builder.ApplyConfiguration(new LeasingVerifyUserMap());
            builder.ApplyConfiguration(new LoginActiveTokensMap());
            builder.ApplyConfiguration(new NotificationMap());
            builder.ApplyConfiguration(new NotificationParameterMap());
            builder.ApplyConfiguration(new OrderItemBenefitMap());
            builder.ApplyConfiguration(new OrderItemMap());
            builder.ApplyConfiguration(new ShoppingCartItemBenefitMap());
            builder.ApplyConfiguration(new ShoppingCartItemMap());
            builder.ApplyConfiguration(new CommissionsAndFeesMap());
            builder.ApplyConfiguration(new CompanyBankAccountsMap());
            builder.ApplyConfiguration(new PaymentMethodMap());
            //builder.ApplyConfiguration(new CustomCardQueueMap());
            //builder.ApplyConfiguration(new EndorsmentBenefitMap());
            //builder.ApplyConfiguration(new EndorsmentMap());
            //builder.ApplyConfiguration(new MissingPolicyPolicyProcessingQueueMap());
            //builder.ApplyConfiguration(new MorniSMSMap());
            //builder.ApplyConfiguration(new OwnDamageQueueMap());
            //builder.ApplyConfiguration(new PolicyAdditionalBenefitMap());
            //builder.ApplyConfiguration(new PolicyModificationMap());
            //builder.ApplyConfiguration(new PolicyProcessingQueueMap());
            //builder.ApplyConfiguration(new PolicyUpdatePaymentMap());
            //builder.ApplyConfiguration(new PolicyUpdateRequestAttachmentMap());
            //builder.ApplyConfiguration(new PolicyUpdateRequestMap());
            builder.ApplyConfiguration(new RenewalPoliciesMap());
            builder.ApplyConfiguration(new WataniyaNajmQueueMap());
            //builder.ApplyConfiguration(new PromotionProgramAttachmentsMap());
            //builder.ApplyConfiguration(new PromotionProgramCodeMap());
            //builder.ApplyConfiguration(new PromotionProgramDomainMap());
            //builder.ApplyConfiguration(new PromotionProgramMap());
            //builder.ApplyConfiguration(new PromotionProgramNinsMap());
            //builder.ApplyConfiguration(new PromotionProgramUserMap());
            //builder.ApplyConfiguration(new PromotionUserMap());
            builder.ApplyConfiguration(new InsuredMap());
            builder.ApplyConfiguration(new QuotationBlockedNinsMap());
            builder.ApplyConfiguration(new QuotationRequestMap());
            builder.ApplyConfiguration(new QuotationResponseMap());
            builder.ApplyConfiguration(new QuotationSharesMap());
            builder.ApplyConfiguration(new TawuniyaProposalMap());
            //builder.ApplyConfiguration(new UserTicketAttachmentMap());
            //builder.ApplyConfiguration(new UserTicketHistoryMap());
            //builder.ApplyConfiguration(new UserTicketMap());
            //builder.ApplyConfiguration(new UserTicketStatusMap());
            //builder.ApplyConfiguration(new UserTicketTypeMap());
            builder.ApplyConfiguration(new CustomCardInfoMap());
            builder.ApplyConfiguration(new DriverExtraLicenseMap());
            builder.ApplyConfiguration(new DriverLicenseMap());
            builder.ApplyConfiguration(new DriverMap());
            builder.ApplyConfiguration(new DriverMedicalConditionMap());
            builder.ApplyConfiguration(new DriverTypeMap());
            builder.ApplyConfiguration(new DriverViolationMap());
            builder.ApplyConfiguration(new DrivingLicenceYearMap());
            builder.ApplyConfiguration(new VehicleBodyTypeMap());
            builder.ApplyConfiguration(new VehicleColorMap());
            builder.ApplyConfiguration(new VehicleIDTypeMap());
            builder.ApplyConfiguration(new VehicleMakerMap());
            builder.ApplyConfiguration(new VehicleMap());
            builder.ApplyConfiguration(new VehicleModelMap());
            builder.ApplyConfiguration(new VehiclePlateTextMap());
            builder.ApplyConfiguration(new VehiclePlateTypeMap());
            builder.ApplyConfiguration(new VehicleSpecificationMap());
            builder.ApplyConfiguration(new VehicleTransmissionTypeMap());
            builder.ApplyConfiguration(new VehicleUsageMap());
            builder.ApplyConfiguration(new VehicleUsagePercentageMap());
            //builder.ApplyConfiguration(new WareefCategoryMap());
            //builder.ApplyConfiguration(new WareefDescountsMap());
            //builder.ApplyConfiguration(new WareefDiscountBenefitMap());
            //builder.ApplyConfiguration(new WareefMap());
            //builder.ApplyConfiguration(new WathqInfoMap());




        }
    }
}
