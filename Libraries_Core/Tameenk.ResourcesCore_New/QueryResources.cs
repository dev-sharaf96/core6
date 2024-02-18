using System.Globalization;


namespace Tameenk.Resources
{
    public class QueryResources
    {
        public string GetValue(System.Resources.ResourceManager resourceManager, string key,string language)
        {
           var result= resourceManager.GetString(key, CultureInfo.GetCultureInfo(language));
           return result;
        }
    }
}
