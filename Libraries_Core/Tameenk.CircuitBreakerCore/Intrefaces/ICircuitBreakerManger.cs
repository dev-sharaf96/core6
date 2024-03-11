

using System;
using System.Threading.Tasks;

namespace Tameenk.CircuitBreaker
{
    public interface ICircuitBreakerManger
    {
        Task<ProviderCircuitBreakModeModel> CheckProviderStatus(int insuranceCompanyId);
        Task<bool> CheckProviderHelth(Exception exception, int ProviderId);
        Task<bool> IsProviderBreaked(int insuranceCompanyId);//By Atheer
    }
}
