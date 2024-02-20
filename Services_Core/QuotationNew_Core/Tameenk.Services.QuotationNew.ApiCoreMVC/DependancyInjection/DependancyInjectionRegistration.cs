

using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Data.Entity;
using Tameenk.Core.Caching;
using Tameenk.Core.Data;
using Tameenk.Data;
using Tameenk.Services.QuotationNew.Components;

namespace Tameenk.Services.QuotationNew.ApiCore.DependancyInjection
{
    public static class DependancyInjectionRegistration
    {
        public static IServiceCollection AddCustomServicesInjection(this IServiceCollection services, IConfiguration configuration)
        {
            #region Read AppSetting Configuraion

            services.Configure<QuotatoinConfig>(configuration.GetSection("Quotation"));
            services.Configure<ConnectionString>(configuration.GetSection("ConnectionStrings"));

            services.AddSingleton<IQuotationConfig>(provider => provider.GetRequiredService<IOptions<QuotatoinConfig>>().Value);
            services.AddSingleton<IConnectionString>(provider => provider.GetRequiredService<IOptions<ConnectionString>>().Value);

            #endregion

            #region Services Injection

            #region Singleton
            #endregion

            #region Scope

            services.AddScoped<ICacheManager, MemoryCacheManager>();
            services.AddScoped<IAsyncQuotationContext, AsyncQuotationContext>();

            #endregion

            #region Transient
            #endregion

            services.AddDbContext<TameenkObjectContext>(options => options.UseSqlServer(configuration.GetConnectionString("Connection")));
            services.AddScoped<IDbContext, TameenkObjectContext>();

            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

            #endregion


            return services;
        }
    }
}
