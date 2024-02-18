using Newtonsoft.Json;

namespace Tameenk.Integration.Providers.Wataniya.Dtos.Autolease
{
    class PersonalAccidentPassengerCover
    {
        [JsonProperty("CoverageCode")]
        public string CoverageCode { get; set; }
        [JsonProperty("Limit")]
        public float Limit { get; set; }
        [JsonProperty("ActualPremium")]
        public float ActualPremium { get; set; }
    }
}
