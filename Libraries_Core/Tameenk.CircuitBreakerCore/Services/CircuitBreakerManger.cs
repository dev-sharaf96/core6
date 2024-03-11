using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;
using Tameenk.Redis;

namespace Tameenk.CircuitBreaker.Services
{
    public class CircuitBreakerManger
    {
        static CircuitBreakerManger _instance;
        //private readonly Logger logger;

        private int BreakCompanyAfterNoOfExceptionOccurCount;
        private double ReleaseComapnyFromBreakingModeAfterTimeInMinutes;
        private object locker;

        private CircuitBreakerManger()
        {
            BreakCompanyAfterNoOfExceptionOccurCount = 5; // int.Parse(WebConfigurationManager.AppSettings["BreakCompanyAfterNoOfExceptionOccurCount"]);
            ReleaseComapnyFromBreakingModeAfterTimeInMinutes = 5; // double.Parse(WebConfigurationManager.AppSettings["ReleaseComapnyFromBreakingModeAfterTimeInMinutes"]);
        }

        public static CircuitBreakerManger Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new CircuitBreakerManger();

                return _instance;
            }
        }


        public async Task UpdateCompanyExceptionCount(Exception exception, int insuranceCompanyId)
        {
            try
            {
                var cacheKey = $"Breaker_{insuranceCompanyId}";
                //if (IsExceptionOfTypeTaskCanceledException(exception))
                {
                    var providerModel = await RedisCacheManager.Instance.GetAsync<ProviderCircuitBreakModeModel>(cacheKey);
                    if (providerModel == null)
                        providerModel = new ProviderCircuitBreakModeModel();

                    providerModel.NoOfCancellationExceptionsHappened += 1;
                    providerModel.BreakTime = DateTime.Now;
                    providerModel.NextTryTime = providerModel.BreakTime.AddMinutes(ReleaseComapnyFromBreakingModeAfterTimeInMinutes);
                    if (providerModel.NoOfCancellationExceptionsHappened >= BreakCompanyAfterNoOfExceptionOccurCount)
                    {
                        providerModel.IsBreaked = true;
                    }

                    int time = (int)(ReleaseComapnyFromBreakingModeAfterTimeInMinutes * 60);
                    await RedisCacheManager.Instance.SetAsync(cacheKey, providerModel, time); //By Atheer
                    //await RedisCacheManager.Instance.SetAsync(cacheKey, providerModel, TimeSpan.FromMinutes(ReleaseComapnyFromBreakingModeAfterTimeInMinutes));
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> IsProviderBreaked(int insuranceCompanyId)
        {
            var cacheKey = $"Breaker_{insuranceCompanyId}";
            var breakerModel = await RedisCacheManager.Instance.GetAsync<ProviderCircuitBreakModeModel>(cacheKey);
            if (breakerModel != null && breakerModel.IsBreaked)
                return true;

            return false;
        }

        #region Private Methods

        private bool IsExceptionOfTypeTaskCanceledException(Exception exception)
        {
            if (exception == null)
                return false;

            if (exception is TaskCanceledException)
                return true;

            if (exception.InnerException != null)
            {
                var innerException = exception.InnerException.GetType();
                if (innerException != null && innerException.Name == "TaskCanceledException")
                    return true;
            }

            return false;
        }

        #endregion
    }
}
