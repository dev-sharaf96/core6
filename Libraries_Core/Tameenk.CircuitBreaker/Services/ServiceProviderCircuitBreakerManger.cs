using system;
using system.collections.concurrent;
using system.collections.generic;
using system.linq;
using system.text;
using system.threading.tasks;
using system.web.configuration;

namespace tameenk.circuitbreaker.services
{
    public class serviceprovidercircuitbreakermanger
    {
        static serviceprovidercircuitbreakermanger _instance;
        //private readonly logger logger;

        private int breakserviceproviderafternoofexceptionoccurcount;
        private double releaseserviceproviderfrombreakingmodeaftertimeinminutes;
        private concurrentdictionary<string, int> providers = null;

        private serviceprovidercircuitbreakermanger()
        {
            breakserviceproviderafternoofexceptionoccurcount = int.parse(webconfigurationmanager.appsettings["breakserviceproviderafternoofexceptionoccurcount"]);
            releaseserviceproviderfrombreakingmodeaftertimeinminutes = double.parse(webconfigurationmanager.appsettings["releaseserviceproviderfrombreakingmodeaftertimeinminutes"]);
            providers = new concurrentdictionary<string, int>();
        }

        public static serviceprovidercircuitbreakermanger instance
        {
            get
            {
                if (_instance == null)
                    _instance = new serviceprovidercircuitbreakermanger();

                return _instance;
            }
        }

        public void updateserviceproviderexceptioncount(exception exception, string servicename)
        {
            try
            {
                var cachekey = $"breaker_{servicename}";
                if (!providers.keys.contains(cachekey))
                    providers.tryadd(cachekey, 0);

                var providermodel = rediscachemanager.instance.get<serviceprovidercircuitbreakmodemodel>(cachekey);
                if (providermodel == null)
                    providermodel = new serviceprovidercircuitbreakmodemodel();

                providermodel.noofexceptionshappened += 1;
                providermodel.breaktime = datetime.now;
                providermodel.nexttrytime = providermodel.breaktime.addminutes(releaseserviceproviderfrombreakingmodeaftertimeinminutes);
                if (providermodel.noofexceptionshappened >= breakserviceproviderafternoofexceptionoccurcount)
                    providermodel.isbreaked = true;

                rediscachemanager.instance.set(cachekey, providermodel, timespan.fromminutes(releaseserviceproviderfrombreakingmodeaftertimeinminutes));
            }
            catch (exception ex)
            {
                throw ex;
            }
        }
        public async task<list<providercircuitbreakmodemodel>> getallprovidersinbreakingmode()
        {
            list<providercircuitbreakmodemodel> results = new list<providercircuitbreakmodemodel>();
            foreach (var provider in providers)
            {
                var providermodel = await rediscachemanager.instance.getasync<serviceprovidercircuitbreakmodemodel>(provider.key);
                if (providermodel == null)
                {
                    providers.tryremove(provider.key, out int i);
                }
                else if (providermodel.isbreaked)
                {
                    results.add(new providercircuitbreakmodemodel()
                    {
                        isbreaked = providermodel.isbreaked,
                        breaktime = providermodel.breaktime,
                        nexttrytime = providermodel.nexttrytime,
                        noofcancellationexceptionshappened = providermodel.noofexceptionshappened,
                        providername = provider.key
                    });
                }
            }

            return results;
        }

        public bool isserviceproviderbreaked(string servicename)
        {
            var cachekey = $"breaker_{servicename}";
            var breakermodel = rediscachemanager.instance.get<serviceprovidercircuitbreakmodemodel>(cachekey);
            if (breakermodel != null && breakermodel.isbreaked)
                return true;

            return false;
        }

        #region private methods

        #endregion
    }
}
