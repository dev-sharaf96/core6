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
using Tameenk.Services.Core.Http;
using Tameenk.Services.Core.Notifications;
using Tameenk.Services.Implementation.Http;
using Tameenk.Services.Implementation.Notifications;
using Tameenk.Services.Logging;
using Tameenk.Services.Core.Policies;
using Tameenk.Services.Implementation.Policies;
using Tameenk.Services.Core.Attachments;
using Tameenk.Services.Implementation.Attachments;
using Tameenk.Services.Implementation.Leasing;
using Tameenk.Services.Core.Leasing;

namespace Tameenk.Leasing.ProfileApi.Infrastructure
{
    public class DependencyRegistrar : IDependencyRegistrar
    {
        public int Order => 0;

        public void Register(ContainerBuilder builder, ITypeFinder typeFinder, TameenkConfig config)
        {
            //controllers
            builder.RegisterApiControllers(typeFinder.GetAssemblies().ToArray());

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

            // data layer

            builder.RegisterType<MemoryCacheManager>().As<ICacheManager>().InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(EfRepository<>)).As(typeof(IRepository<>)).InstancePerLifetimeScope();
            builder.RegisterType<Log4netLogger>().As<ILogger>().InstancePerLifetimeScope();
            builder.RegisterType<StandardHttpClient>().As<IHttpClient>().InstancePerLifetimeScope();
            builder.RegisterType<WebApiContext>().As<IWebApiContext>().InstancePerLifetimeScope();
            builder.RegisterType<AuthorizationService>().As<IAuthorizationService>().InstancePerLifetimeScope();
            builder.RegisterType<QyadatSmsProvider>().As<ISmsProvider>().InstancePerLifetimeScope();
            var dataSettingsManager = new DataSettingsManager();
            var dataProviderSettings = dataSettingsManager.LoadSettings(config.Settings.Path);
            builder.Register<IDbContext>(c => new TameenkObjectContext(dataProviderSettings.DataConnectionString)).InstancePerLifetimeScope();
            builder.Register<IdentityDbContext<AspNetUser>>(c => new TameenkObjectContext(dataProviderSettings.DataConnectionString)).InstancePerLifetimeScope();
            log4net.Config.XmlConfigurator.Configure(new System.IO.FileInfo(dataSettingsManager.GetAbsoluteFilePath(config.Settings.LogConfigPath)));

            //builder.RegisterGeneric(typeof(OutputModel<>)).As(typeof(OutputModel<>)).InstancePerLifetimeScope();

            // for any injected service
            builder.RegisterType<LeasingProfileService>().As<ILeasingProfileService>().InstancePerLifetimeScope();
            builder.RegisterType<PolicyService>().As<IPolicyService>().InstancePerLifetimeScope();
            builder.RegisterType<NotificationService>().As<INotificationService>().InstancePerLifetimeScope();
            builder.RegisterType<AttachmentService>().As<IAttachmentService>().InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(EfRepository<>)).As(typeof(IRepository<>));

        }
    }
}