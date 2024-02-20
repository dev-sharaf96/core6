

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Tameenk.Services.QuotationNew.ApiCore.AppSettingConfigs;

namespace Tameenk.Services.QuotationNew.ApiCore.DependancyInjection
{
    public static class DependancyInjectionRegistration
    {
        public static IServiceCollection AddCustomServicesInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<QuotatoinConfig>(configuration.GetSection("Quotation"));



            services.AddSingleton<IQuotationConfig>(provider => provider.GetRequiredService<IOptions<QuotatoinConfig>>().Value);


            return services;
        }
    }
}
