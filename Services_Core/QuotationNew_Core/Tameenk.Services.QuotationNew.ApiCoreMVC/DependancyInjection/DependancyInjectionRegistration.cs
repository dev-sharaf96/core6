using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Net.Http;
using Tameenk.Core.Caching;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Data;
using Tameenk.Integration.Core.Providers;
using Tameenk.Integration.Core.Providers.Configuration;
using Tameenk.Integration.DtoCore.ServiceLocator;
using Tameenk.Integration.Providers.AICC;
using Tameenk.Loggin.DAL;
using Tameenk.Services.Core.Addresses;
using Tameenk.Services.Core.Quotations;
using Tameenk.Services.Core.Vehicles;
using Tameenk.Services.Implementation.Addresses;
using Tameenk.Services.Implementation.Quotations;
using Tameenk.Services.Implementation.Vehicles;
using Tameenk.Services.QuotationNew.Components;
using TameenkDAL;

namespace Tameenk.Services.QuotationNew.ApiCore.DependancyInjection
{
    public static class DependancyInjectionRegistration
    {
        public static IServiceCollection AddCustomServicesInjection(this IServiceCollection services, IConfiguration configuration)
        {
            #region Read AppSetting Configuraion

            services.Configure<QuotatoinConfig>(configuration.GetSection("Quotation"));
            services.Configure<BcareInsuranceCompanyConfig>(configuration.GetSection("BcareInsuranceCompany"));

            //services.Configure<ConnectionString>(configuration.GetSection("ConnectionStrings"));
            var BD_ConnactionSetting = services.Configure<ConnectionString>(configuration.GetSection("ConnectionStrings"));


          

            services.AddSingleton<IBcareInsuranceCompanyConfig>(provider => provider.GetRequiredService<IOptions<BcareInsuranceCompanyConfig>>().Value);
            services.AddSingleton<IQuotationConfig>(provider => provider.GetRequiredService<IOptions<QuotatoinConfig>>().Value);
            services.AddSingleton<IConnectionString>(provider => provider.GetRequiredService<IOptions<ConnectionString>>().Value);

            #endregion

            #region Services Injection

            #region Singleton
            services.AddScoped<HttpClient>();
            #endregion

            #region Scope
            

            services.AddScoped<ICacheManager, MemoryCacheManager>();
            services.AddScoped<IQuotationService, QuotationService>();
            services.AddScoped<IAsyncQuotationContext, AsyncQuotationContext>();
            services.AddScoped<IAddressService, AddressService>();
            services.AddScoped<IVehicleService, VehicleService>();
            services.AddScoped<IProvidersServiceLocator, ProvidersServiceLocator>();
            services.AddScoped<RestfulInsuranceProvider>();
            services.AddScoped<AICCInsuranceProvider, AICCInsuranceProvider>();
            //services.AddScoped<DbContext, YourDbContext>();
            //services.AddScoped<YourDbContext>();
            //services.AddScoped<TameenkLog>();
            // services.AddScoped(typeof(IAsyncQuotationContext<>), typeof(AsyncQuotationContext<>));
            //services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddSingleton<RestfulConfiguration>();



            #endregion

            #region Transient
            #endregion

            services.AddDbContext<YourDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("Connection")));


            //services.AddScoped<YourDbContext/*, TameenkObjectContext*/>(); // No Need with .Net core 
           



           // services.AddIdentity<AspNetUser, IdentityRole>()
           //.AddEntityFrameworkStores<TameenkObjectContext>()
           //.AddDefaultTokenProviders();

            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

            #endregion


            return services;
        }
    }
}
