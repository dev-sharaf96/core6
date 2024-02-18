using Newtonsoft.Json;

namespace Tameenk.Integration.Providers.Wataniya.Dtos.Autolease
{
    class NaturalHazards
    {
        [JsonProperty("CoverageCode")]
        public string CoverageCode { get; set; }
        [JsonProperty("Deductible")]
        public int Deductible { get; set; }
        [JsonProperty("ActualPremium")]
        public float ActualPremium { get; set; }
    }
}
