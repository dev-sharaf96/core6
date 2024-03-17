using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Net.Http;
using Tameenk.CircuitBreaker;
using Tameenk.CircuitBreaker.Services;
using Tameenk.Core.Caching;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Data;
using Tameenk.Integration.Core.Providers;
using Tameenk.Integration.Core.Providers.Configuration;
using Tameenk.Integration.DtoCore.ServiceLocator;
using Tameenk.Integration.Providers.ACIG;
using Tameenk.Integration.Providers.AICC;
using Tameenk.Integration.Providers.Alalamiya;
using Tameenk.Integration.Providers.Allianz;
using Tameenk.Integration.Providers.AlRajhi;
using Tameenk.Integration.Providers.Amana;
using Tameenk.Integration.Providers.ArabianShield;
using Tameenk.Integration.Providers.AXA;
using Tameenk.Integration.Providers.BCARE;
using Tameenk.Integration.Providers.Buruj;
using Tameenk.Integration.Providers.GGI;
using Tameenk.Integration.Providers.Malath;
using Tameenk.Integration.Providers.MedGulf;
using Tameenk.Integration.Providers.SAICO;
using Tameenk.Integration.Providers.Salama;
using Tameenk.Integration.Providers.Solidarity;
using Tameenk.Integration.Providers.Tawuniya;
using Tameenk.Integration.Providers.TUIC;
using Tameenk.Integration.Providers.UCA;
using Tameenk.Integration.Providers.Wala;
using Tameenk.Integration.Providers.Wataniya;
using Tameenk.Loggin.DAL;
using Tameenk.Services.Core.Addresses;
using Tameenk.Services.Core.Quotations;
using Tameenk.Services.Core.Vehicles;
using Tameenk.Services.Implementation.Addresses;
using Tameenk.Services.Implementation.Quotations;
using Tameenk.Services.Implementation.Vehicles;
using Tameenk.Services.QuotationNew.Components;
using Tameenk.ServicesCore;
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
            services.Configure<CircuitBreakerMangerConfig>(configuration.GetSection("CircuitBreakerManger"));

            //services.Configure<ConnectionString>(configuration.GetSection("ConnectionStrings"));
            var BD_ConnactionSetting = services.Configure<ConnectionString>(configuration.GetSection("ConnectionStrings"));


          

            services.AddSingleton<IBcareInsuranceCompanyConfig>(provider => provider.GetRequiredService<IOptions<BcareInsuranceCompanyConfig>>().Value);
            services.AddSingleton<IQuotationConfig>(provider => provider.GetRequiredService<IOptions<QuotatoinConfig>>().Value);
            services.AddSingleton<IConnectionString>(provider => provider.GetRequiredService<IOptions<ConnectionString>>().Value);
            services.AddSingleton<ICircuitBreakerMangerConfig>(provider => provider.GetRequiredService<IOptions<CircuitBreakerMangerConfig>>().Value);

            #endregion

            #region Services Injection

            #region Singleton    
            services.AddSingleton<RestfulConfiguration>();
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

            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));
            services.AddScoped<AICCInsuranceProvider, AICCInsuranceProvider>();
            services.AddScoped<AllianzInsuranceProvider, AllianzInsuranceProvider>();
            services.AddScoped<ACIGInsuranceProvider, ACIGInsuranceProvider>();
            services.AddScoped<SolidarityInsuranceProvider, SolidarityInsuranceProvider>();
            services.AddScoped<TUICInsuranceProvider, TUICInsuranceProvider>();
            services.AddScoped<WalaInsuranceProvider, WalaInsuranceProvider>();
            services.AddScoped<MedGulfInsuranceProvider, MedGulfInsuranceProvider>();
            services.AddScoped<ArabianShieldInsuranceProvider, ArabianShieldInsuranceProvider>();
            services.AddScoped<GGIInsuranceProvider, GGIInsuranceProvider>();
            services.AddScoped<TawuniyaInsuranceProvider, TawuniyaInsuranceProvider>();
            services.AddScoped<SalamaInsuranceProvider, SalamaInsuranceProvider>();
            services.AddScoped<WataniyaInsuranceProvider, WataniyaInsuranceProvider>();
            services.AddScoped<BCAREInsuranceProvider, BCAREInsuranceProvider>();
            services.AddScoped<UCAInsuranceProvider, UCAInsuranceProvider>();
            services.AddScoped<AlalamiyaInsuranceProvider, AlalamiyaInsuranceProvider>();
            services.AddScoped<AXAInsuranceProvider, AXAInsuranceProvider>();
            services.AddScoped<AmanaInsuranceProvider, AmanaInsuranceProvider>();
            services.AddScoped<BurujInsuranceProvider, BurujInsuranceProvider>();
            services.AddScoped<MalathInsuranceProvider, MalathInsuranceProvider>();
            services.AddScoped<AlRajhiInsuranceProvider, AlRajhiInsuranceProvider>();
            services.AddScoped<SAICOInsuranceProvider, SAICOInsuranceProvider>();





            #endregion

            #region Transient
            #endregion

            services.AddDbContext<YourDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("Connection")));


            //services.AddScoped<YourDbContext/*, TameenkObjectContext*/>(); // No Need with .Net core 
           



           // services.AddIdentity<AspNetUser, IdentityRole>()
           //.AddEntityFrameworkStores<TameenkObjectContext>()
           //.AddDefaultTokenProviders();

           

            #endregion


            return services;
        }
    }
}
