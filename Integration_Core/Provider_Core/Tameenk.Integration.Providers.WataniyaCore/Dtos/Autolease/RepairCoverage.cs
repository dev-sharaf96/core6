
using Newtonsoft.Json;

namespace Tameenk.Integration.Providers.Wataniya.Dtos.Autolease
{
    class RepairCoverage
    {
        [JsonProperty("CoverageCode")]
        public string CoverageCode { get; set; }
        [JsonProperty("LimitPerDay")]
        public int LimitPerDay { get; set; }
        [JsonProperty("NumberOfDays")]
        public int NumberOfDays { get; set; }
        [JsonProperty("Limit")]
        public float Limit{ get; set; }
        [JsonProperty("ActualPremium")]

        public float ActualPremium { get; set; }
    }
}
