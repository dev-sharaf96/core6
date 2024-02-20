using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Web.Http;
using Tameenk.Services.QuotationNew.Components;

namespace Tameenk.Services.QuotationNew.ApiCore
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Add services to the container.

            services.AddMvc();
            services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddSingleton<IAsyncQuotationContext, AsyncQuotationContext>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();
            app.UseHttpsRedirection();

            app.UseAuthorization();
            //app.UseSystemWebAdapters();

            //app.MapControllers();
            app.UseEndpoints(endpoints => 
            {
                //endpoints.MapControllerRoute
                //(
                //    name: "GetQuotation",
                //    pattern: "api/quote",
                //    defaults: new { controller = "Quotation", action = "GetQuote" }
                // );
                
                endpoints.MapControllerRoute("Default", "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapControllers();
            });
            //app.MapForwarder("/{**catch-all}", app.Configuration["ProxyTo"]).Add(static builder => ((RouteEndpointBuilder)builder).Order = int.MaxValue);

            //app.MapControllerRoute("Default", "{controller=Home}/{action=Index}/{id?}");

        }
    }
}
