using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;
using Tameenk.Redis;

namespace Tameenk.CircuitBreaker.Services
{
    public class ServiceProviderCircuitBreakerManger
    {
        static ServiceProviderCircuitBreakerManger _instance;
        //private readonly Logger logger;

        private int BreakServiceProviderAfterNoOfExceptionOccurCount;
        private double ReleaseServiceProviderFromBreakingModeAfterTimeInMinutes;
        private ConcurrentDictionary<string, int> providers = null;

        private ServiceProviderCircuitBreakerManger()
        {
            BreakServiceProviderAfterNoOfExceptionOccurCount = 5; // int.Parse(WebConfigurationManager.AppSettings["BreakServiceProviderAfterNoOfExceptionOccurCount"]);
            ReleaseServiceProviderFromBreakingModeAfterTimeInMinutes = 5; // double.Parse(WebConfigurationManager.AppSettings["ReleaseServiceProviderFromBreakingModeAfterTimeInMinutes"]);
            providers = new ConcurrentDictionary<string, int>();
        }

        public static ServiceProviderCircuitBreakerManger Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new ServiceProviderCircuitBreakerManger();

                return _instance;
            }
        }

        public void UpdateServiceProviderExceptionCount(Exception exception, string serviceName)
        {
            try
            {
                var cacheKey = $"Breaker_{serviceName}";
                if (!providers.Keys.Contains(cacheKey))
                    providers.TryAdd(cacheKey, 0);

                var providerModel = RedisCacheManager.Instance.Get<ServiceProviderCircuitBreakModeModel>(cacheKey);
                if (providerModel == null)
                    providerModel = new ServiceProviderCircuitBreakModeModel();

                providerModel.NoOfExceptionsHappened += 1;
                providerModel.BreakTime = DateTime.Now;
                providerModel.NextTryTime = providerModel.BreakTime.AddMinutes(ReleaseServiceProviderFromBreakingModeAfterTimeInMinutes);
                if (providerModel.NoOfExceptionsHappened >= BreakServiceProviderAfterNoOfExceptionOccurCount)
                    providerModel.IsBreaked = true;

                RedisCacheManager.Instance.Set(cacheKey, providerModel, TimeSpan.FromMinutes(ReleaseServiceProviderFromBreakingModeAfterTimeInMinutes));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ProviderCircuitBreakModeModel>> GetAllProvidersInBreakingMode()
        {
            List<ProviderCircuitBreakModeModel> results = new List<ProviderCircuitBreakModeModel>();
            foreach (var provider in providers)
            {
                var providerModel = await RedisCacheManager.Instance.GetAsync<ServiceProviderCircuitBreakModeModel>(provider.Key);
                if (providerModel == null)
                {
                    providers.TryRemove(provider.Key, out int i);
                }
                else if (providerModel.IsBreaked)
                {
                    results.Add(new ProviderCircuitBreakModeModel()
                    {
                        IsBreaked = providerModel.IsBreaked,
                        BreakTime = providerModel.BreakTime,
                        NextTryTime = providerModel.NextTryTime,
                        NoOfCancellationExceptionsHappened = providerModel.NoOfExceptionsHappened,
                        ProviderName = provider.Key
                    });
                }
            }

            return results;
        }

        public bool IsServiceProviderBreaked(string serviceName)
        {
            var cacheKey = $"Breaker_{serviceName}";
            var breakerModel = RedisCacheManager.Instance.Get<ServiceProviderCircuitBreakModeModel>(cacheKey);
            if (breakerModel != null && breakerModel.IsBreaked)
                return true;

            return false;
        }

        #region Private Methods

        #endregion
    }
}
