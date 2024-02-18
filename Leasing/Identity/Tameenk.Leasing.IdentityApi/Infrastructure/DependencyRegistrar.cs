using Autofac;
using Autofac.Integration.WebApi;
using System.Linq;
using Tameenk.Core.Configuration;
using Tameenk.Core.Infrastructure;
using Tameenk.Core.Infrastructure.DependencyManagement;
using Tameenk.Services.Logging;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Data;
using Tameenk.Services.Core.Http;
using Tameenk.Services.Implementation.Http;
using Tameenk.Core.Caching;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Web;
using Tameenk.Core.Fakes;
using Tameenk.Api.Core.Context;
using Tameenk.Security.Services;
using Tameenk.Services.Implementation.Leasing;
using Tameenk.Services.Core.Leasing;
using Tameenk.Services.Implementation.Notifications;
using Tameenk.Services.Core.Notifications;

namespace Tameenk.Leasing.IdentityApi.Infrastructure
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
            builder.RegisterType<NotificationService>().As<INotificationService>().InstancePerLifetimeScope();
            log4net.Config.XmlConfigurator.Configure(new System.IO.FileInfo(dataSettingsManager.GetAbsoluteFilePath(config.Settings.LogConfigPath)));
            builder.RegisterType<Log4netLogger>().As<ILogger>().InstancePerLifetimeScope();
            builder.RegisterType<StandardHttpClient>().As<IHttpClient>().InstancePerLifetimeScope();

            // for any injected service
            builder.RegisterType<AuthorizationService>().As<IAuthorizationService>().InstancePerLifetimeScope();
            builder.RegisterType<QyadatSmsProvider>().As<ISmsProvider>().InstancePerLifetimeScope();
            builder.RegisterType<WebApiContext>().As<IWebApiContext>().InstancePerLifetimeScope();
            builder.RegisterType<LeasingUserService>().As<ILeasingUserService>().InstancePerLifetimeScope();

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
        }
    }
}