using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Tameenk.Core.Infrastructure;

[assembly: OwinStartup(typeof(Tameenk.Services.InsuranceCompaniesCallBack.Startup))]
namespace Tameenk.Services.InsuranceCompaniesCallBack
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
            EngineContext.InitializeWebApi(false, config);
            SwaggerConfig.Register(config);
            app.UseWebApi(config);
        }
    }
}