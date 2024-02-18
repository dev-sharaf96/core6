using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using System.Web.Http;
using System.Web.Routing;
using Tameenk.Leasing.IdentityApi.Infrastructure;
using Tameenk.Core.Infrastructure;
using Tameenk.Security.Services;

[assembly: OwinStartup(typeof(Tameenk.Leasing.IdentityApi.Startup))]
namespace Tameenk.Leasing.IdentityApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            HttpConfiguration config = new HttpConfiguration();

            WebApiConfig.Register(config);
            AutoMapperConfiguration.Init();
            EngineContext.InitializeWebApi(false, config);

            OAuthConfig.ConfigureOAuth(app);
            ConfigureAuth(app);
            //UnityWebApiActivator.Start(config);
            app.UseWebApi(config);

            RouteConfig.RegisterRoutes(RouteTable.Routes);
            SwaggerConfig.Register(config);
        }
    }
}