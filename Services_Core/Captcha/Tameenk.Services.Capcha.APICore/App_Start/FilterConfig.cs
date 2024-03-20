//using Microsoft.AspNetCore.Builder;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using System.Configuration;
//using System.Web.Http;
//using Tameenk.Core.Infrastructure;
//using Tameenk.Services.Capcha.API;

////namespace Tameenk.Services.Capcha.API
////{
////public class FilterConfig
////{
////    public static void RegisterGlobalFilters(Glopal filters)
////    {
////        filters.Add(new HandleErrorAttribute());
////    }
////}

//Configure(IApplicationBuilder app, IConfiguration Configuration)
//    {
//    app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

//    var config = new HttpConfiguration
//    {
//        IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always // Add this line to enable detail mode in release
//    };

//    WebApiConfig.Register(config);
//    CacheManagerConfig.Initialize();
//    RateLimitConfiguration.Register(config);
//    EngineContext.InitializeWebApi(false, config);

//    app.UseRouting();

//    app.UseEndpoints(endpoints =>
//    {
//        endpoints.MapControllers(); // Map controllers for Web API
//    });
//}
/////Added this code in program.cs
