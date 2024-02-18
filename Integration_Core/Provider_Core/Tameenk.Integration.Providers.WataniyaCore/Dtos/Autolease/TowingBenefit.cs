using Newtonsoft.Json;

namespace Tameenk.Integration.Providers.Wataniya.Dtos.Autolease
{
    class TowingBenefit
    {
        [JsonProperty("CoverageCode")]
        public string CoverageCode { get; set; }
        [JsonProperty("ActualPremium")]
        public int ActualPremium { get; set; }
    }
}
