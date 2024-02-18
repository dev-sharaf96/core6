using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Linq;
using System.Web;
using Tameenk.Api.Core.Context;
using Tameenk.Core.Caching;
using Tameenk.Core.Configuration;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Fakes;
using Tameenk.Core.Infrastructure;
using Tameenk.Core.Infrastructure.DependencyManagement;
using Tameenk.Data;
using Tameenk.Security.Services;
using Tameenk.Services.Core.Addresses;
using Tameenk.Services.Core.Attachments;
using Tameenk.Services.Core.Checkouts;
using Tameenk.Services.Core.Http;
using Tameenk.Services.Core.Notifications;
using Tameenk.Services.Core.Occupations;
using Tameenk.Services.Core.Policies;
using Tameenk.Services.Core.Promotions;
using Tameenk.Services.Core.Settings;
using Tameenk.Services.Core.Vehicles;
using Tameenk.Services.Implementation.Addresses;
using Tameenk.Services.Implementation.Attachments;
using Tameenk.Services.Implementation.Checkouts;
using Tameenk.Services.Implementation.Http;
using Tameenk.Services.Implementation.Notifications;
using Tameenk.Services.Implementation.Occupations;
using Tameenk.Services.Implementation.Policies;
using Tameenk.Services.Implementation.Promotions;
using Tameenk.Services.Implementation.Quotations;
using Tameenk.Services.Implementation.Settings;
using Tameenk.Services.Implementation.Vehicles;
using Tameenk.Services.Inquiry.Components;
using Tameenk.Services.Logging;
using Tameenk.Services.Policy.Components;
using Tameenk.Services.Core.Quotations;
using Tameenk.Services.YakeenIntegration.Business.Services.Core;
using Tameenk.Services.YakeenIntegration.Business.Services.Implementation;
using Tameenk.Services.Core;
using Tameenk.Services.Implementation;
using Tameenk.Services.Core.InsuranceCompanies;
using Tameenk.Services.Implementation.InsuranceCompanies;
using Tameenk.Services.YakeenIntegration.Business.WebClients.Core;
using Tameenk.Services.YakeenIntegration.Business.WebClients.Implementation;
using Tameenk.Services.Checkout.Components;
using Tameenk.Services.Core.Payments;
using Tameenk.Services.Implementation.Payments;
using Tameenk.Services.Implementation.Orders;
using Tameenk.Services.Orders;
using Tameenk.Services.Implementation.Drivers;
using Tameenk.Services.Core.Drivers;
using Tameenk.Services.Implementation.Payments.Tabby;
using Tameenk.Services.Implementation.Leasing;
using Tameenk.Services.Core.Leasing;
using Tameenk.Services.Quotation.Components;

namespace Tameenk.Leasing.PolicyApi.Infrastructure
{
    public class DependencyRegistrar : IDependencyRegistrar
    {
        public int Order => 0;

        public void Register(ContainerBuilder builder, ITypeFinder typeFinder, TameenkConfig config)
        {
            //controllers
            builder.RegisterApiControllers(typeFinder.GetAssemblies().ToArray());

            // data layer

            var dataSettingsManager = new DataSettingsManager();
            var dataProviderSettings = dataSettingsManager.LoadSettings(config.Settings.Path);
            builder.Register<IDbContext>(c => new TameenkObjectContext(dataProviderSettings.DataConnectionString)).InstancePerLifetimeScope();
            builder.Register<IdentityDbContext<AspNetUser>>(c => new TameenkObjectContext(dataProviderSettings.DataConnectionString)).InstancePerLifetimeScope();
            builder.RegisterType<MemoryCacheManager>().As<ICacheManager>().InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(EfRepository<>)).As(typeof(IRepository<>)).InstancePerLifetimeScope();
            //builder.RegisterType<NotificationService>().As<INotificationService>().InstancePerLifetimeScope();
            builder.RegisterType<AutoleasingInquiryContext>().As<IAutoleasingInquiryContext>().InstancePerLifetimeScope();
            builder.RegisterType<PolicyModificationContext>().As<IPolicyModificationContext>().InstancePerLifetimeScope();
            //builder.RegisterType<NotificationService>().As<INotificationService>().InstancePerLifetimeScope();

            log4net.Config.XmlConfigurator.Configure(new System.IO.FileInfo(dataSettingsManager.GetAbsoluteFilePath(config.Settings.LogConfigPath)));
            builder.RegisterType<Log4netLogger>().As<ILogger>().InstancePerLifetimeScope();
            builder.RegisterType<StandardHttpClient>().As<IHttpClient>().InstancePerLifetimeScope();

            // for any injected service
            //builder.RegisterType<AuthorizationService>().As<IAuthorizationService>().InstancePerLifetimeScope();
            builder.RegisterType<QyadatSmsProvider>().As<ISmsProvider>().InstancePerLifetimeScope();
            builder.RegisterType<WebApiContext>().As<IWebApiContext>().InstancePerLifetimeScope();

            //HTTP context and other related stuff
            builder.Register(c =>
                //register FakeHttpContext when HttpContext is not available
                HttpContext.Current != null ?
                (new HttpContextWrapper(HttpContext.Current) as HttpContextBase) :
                (new FakeHttpContext("~/") as HttpContextBase))
                .As<HttpContextBase>()
                .InstancePerLifetimeScope();
            builder.Register(c => c.Resolve<HttpContextBase>().Request)
                .As<HttpRequestBase>()
                .InstancePerLifetimeScope();
            builder.Register(c => c.Resolve<HttpContextBase>().Response)
                .As<HttpResponseBase>()
                .InstancePerLifetimeScope();
            builder.Register(c => c.Resolve<HttpContextBase>().Server)
                .As<HttpServerUtilityBase>()
                .InstancePerLifetimeScope();
            builder.Register(c => c.Resolve<HttpContextBase>().Session)
                .As<HttpSessionStateBase>()
                .InstancePerLifetimeScope();
            builder.RegisterType<QyadatSmsProvider>().As<ISmsProvider>().InstancePerLifetimeScope();
            builder.RegisterType<AuthorizationService>().As<IAuthorizationService>().InstancePerLifetimeScope();

            if (config.Najm.TestMode)
            {
                builder.RegisterType<FakeNajmService>().As<INajmService>().InstancePerLifetimeScope();
            }
            else
            {
                builder.RegisterType<NajmService>().As<INajmService>().InstancePerLifetimeScope();
            }
            //builder.RegisterType<VehicleService>().As<IVehicleService>().InstancePerLifetimeScope();

            //  builder.RegisterType<QuotationService>().As<Core.Quotations.IQuotationService>().InstancePerLifetimeScope();
            //   builder.RegisterType<QuotationRequestService>().As<IQuotationRequestService>().InstancePerLifetimeScope();

            //  builder.RegisterType<Services.Implementation.QuotationRequestService>().As<Services.Core.IQuotationRequestService>().InstancePerLifetimeScope();
            builder.RegisterType<NotificationService>().As<INotificationService>().InstancePerLifetimeScope();
            builder.RegisterType<StandardHttpClient>().As<IHttpClient>().InstancePerLifetimeScope();
            builder.RegisterType<AttachmentService>().As<IAttachmentService>().InstancePerLifetimeScope();
            builder.RegisterType<PolicyService>().As<IPolicyService>().InstancePerLifetimeScope();
            builder.RegisterType<AddressService>().As<IAddressService>().InstancePerLifetimeScope();
            builder.RegisterType<OccupationService>().As<IOccupationService>().InstancePerLifetimeScope();
            builder.RegisterType<MemoryCacheManager>().As<ICacheManager>().InstancePerLifetimeScope();
            builder.RegisterType<SettingService>().As<ISettingService>().InstancePerLifetimeScope();
            builder.RegisterType<PromotionService>().As<IPromotionService>().InstancePerLifetimeScope();
            builder.RegisterType<CheckoutsService>().As<ICheckoutsService>().InstancePerLifetimeScope();
            builder.RegisterType<QuotationService>().As<IQuotationService>().InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(EfRepository<>)).As(typeof(IRepository<>));
            builder.RegisterType<VehicleService>().As<IVehicleService>().InstancePerLifetimeScope();
            builder.RegisterType<YakeenVehicleServices>().As<IYakeenVehicleServices>().InstancePerLifetimeScope();
            //builder.RegisterType<AutoleasingUserService>().As<IAutoleasingUserService>().InstancePerLifetimeScope();
            //builder.RegisterType<BankService>().As<IBankService>().InstancePerLifetimeScope();
            builder.RegisterType<InquiryUtilities>().As<IInquiryUtilities>().InstancePerLifetimeScope();
            builder.RegisterType<InsuranceCompanyService>().As<IInsuranceCompanyService>().InstancePerLifetimeScope();
            builder.RegisterType<YakeenClient>().As<IYakeenClient>().InstancePerLifetimeScope();
            builder.RegisterType<AutoleaseContext>().As<IAutoleaseContext>().InstancePerLifetimeScope();
            builder.RegisterType<CheckoutContext>().As<ICheckoutContext>().InstancePerLifetimeScope();
            builder.RegisterType<PolicyProcessingService>().As<IPolicyProcessingService>().InstancePerLifetimeScope();
            builder.RegisterType<BankService>().As<IBankService>().InstancePerLifetimeScope();
            builder.RegisterType<AutoleasingUserService>().As<IAutoleasingUserService>().InstancePerLifetimeScope();
            //builder.RegisterType<PaymentMethodService>().As<IPaymentMethodService>().InstancePerLifetimeScope();


            builder.RegisterType<ShoppingCartService>().As<IShoppingCartService>().InstancePerLifetimeScope();
            builder.RegisterType<OrderService>().As<IOrderService>().InstancePerLifetimeScope();
            builder.RegisterType<DriverService>().As<IDriverService>().InstancePerLifetimeScope();
            builder.RegisterType<SadadPaymentService>().As<ISadadPaymentService>().InstancePerLifetimeScope();
            builder.RegisterType<HyperpayPaymentService>().As<IHyperpayPaymentService>().InstancePerLifetimeScope();
            builder.RegisterType<QuotationContext>().As<IQuotationContext>().InstancePerLifetimeScope();
            builder.RegisterType<PolicyProcessingService>().As<IPolicyProcessingService>().InstancePerLifetimeScope();
            builder.RegisterType<PaymentMethodService>().As<IPaymentMethodService>().InstancePerLifetimeScope();
            builder.RegisterType<TabbyPaymentService>().As<ITabbyPaymentService>().InstancePerLifetimeScope();
            builder.RegisterType<AutoleasingQuotationFormService>().As<IAutoleasingQuotationFormService>().InstancePerLifetimeScope();

            builder.RegisterType<LeasingUserService>().As<ILeasingUserService>().InstancePerLifetimeScope();
            builder.RegisterType<PaymentService>().As<IPaymentService>().InstancePerLifetimeScope();
            builder.RegisterType<LeasingPolicyService>().As<ILeasingPolicyService>().InstancePerLifetimeScope();
            builder.RegisterType<LeasingProfileService>().As<ILeasingProfileService>().InstancePerLifetimeScope();

        }
    }
}