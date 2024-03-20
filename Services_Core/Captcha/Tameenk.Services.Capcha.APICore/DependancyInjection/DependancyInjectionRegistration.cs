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

namespace Tameenk.Services.Capcha
{
    public static class DependancyInjectionRegistration
    {
        public static IServiceCollection AddCustomServicesInjection(this IServiceCollection services, IConfiguration configuration)
        {
            #region Read AppSetting Configuraion


            var BD_ConnactionSetting = services.Configure<ConnectionString>(configuration.GetSection("ConnectionStrings"));


          
            #endregion



 

           



            return services;
        }
    }
}
