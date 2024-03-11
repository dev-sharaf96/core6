using Newtonsoft.Json;
using NLog;
using StackExchange.Redis;
using System;
using System.Threading.Tasks;

namespace Tameenk.Redis
{
    public class RedisCacheManager : IRedisCacheManager
    {
        static RedisCacheManager? _instance;
        private readonly IDatabase _database;
        private readonly Logger logger;


        private RedisCacheManager()
        {
            this._database = RedisConnectorHelper.Connection.GetDatabase();
            this.logger = LogManager.GetCurrentClassLogger();
        }

        public static RedisCacheManager Instance
        {
            get
            {
                if (_instance == null)
                {
                    //System.IO.File.WriteAllText(@"C:\inetpub\WataniyaLog\newInstance_" + DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss_mms") + ".txt", "");
                    _instance = new RedisCacheManager();
                }

                return _instance;
            }
        }

        public async Task<T> GetAsync<T>(string key) where T : new()
        {
            try
            {
                if (_database == null)
                    return new T();

                var result = await _database.StringGetAsync(key);
                if (string.IsNullOrEmpty(result))
                    return new T();

                return JsonConvert.DeserializeObject<T>(result);
            }
            catch (Exception ex)
            {
                Log("GetAsync", ex);
                return new T();
            }
        }
        public async Task<string?> GetAsync(string key)
        {
            try
            {
                if (_database == null)
                    return null;

                var result = await _database.StringGetAsync(key);
                if (string.IsNullOrEmpty(result))
                    return null;

                return result.ToString();
            }
            catch (Exception ex)
            {
                Log("GetAsync", ex);
                return null;
            }
        }

        public T Get<T>(string key) where T : new()
        {
            try
            {
                if (_database == null)
                    return new T();

                var result = _database.StringGet(key);
                if (string.IsNullOrEmpty(result))
                    return new T();

                return JsonConvert.DeserializeObject<T>(result);
            }
            catch (Exception ex)
            {
                Log("GetAsync", ex);
                return new T();
            }
        }

        public async Task SetAsync<T>(string key, T value, int duration = int.MaxValue)
        {
            try
            {
                if (_database == null)
                    return;

                string storeValue = JsonConvert.SerializeObject(value);
                await _database.StringSetAsync(key, storeValue, TimeSpan.FromSeconds(duration), When.Always);
            }
            catch (Exception ex)
            {
                Log("SetAsync", ex);
                return;
            }
        }

        public async Task<bool> TrySetAsync<T>(string key, T value, int duration = int.MaxValue, When when = When.Always)
        {
            try
            {
                if (_database == null)
                    return false;

                string storeValue = JsonConvert.SerializeObject(value);
                await _database.StringSetAsync(key, storeValue, TimeSpan.FromSeconds(duration), when);
                return true;
            }
            catch (Exception ex)
            {
                Log("TrySetAsync", ex);
                return false;
            }
        }

        public T Set<T>(string key, T value, TimeSpan fromDuration) where T : new()
        {
            try
            {

                if (_database == null)
                    return new T();


                string storeValue = JsonConvert.SerializeObject(value);
                _database.StringSet(key, storeValue, fromDuration, When.Always);
                return (T)value;
            }
            catch (Exception ex)
            {
                Log("SetAsync", ex);
                return new T();


            }
        }

        public async Task DeleteKeyAsync(string key)
        {
            try
            {
                if (_database == null)
                    return;

                await _database.KeyDeleteAsync(key);
            }
            catch (Exception ex)
            {
                Log("DeleteKeyAsync", ex);
                return;
            }
        }

        public async Task UpdateAsync<T>(string key, T value, int duration = int.MaxValue)
        {
            try
            {
                if (_database == null)
                    return;

                var _key = key;
                string storeValue = JsonConvert.SerializeObject(value);
                await _database.StringSetAsync(_key, storeValue, TimeSpan.FromSeconds(duration), When.Always);
            }
            catch (Exception ex)
            {
                Log("UpdateAsync", ex);
                return;
            }
        }

        public void Dispose()
        {
        }

        private void Log(string method, Exception exception)
        {
            //Log4NetManager.Instance.Log(method, exception);
            logger.Error(method, exception);
        }
    }
}
