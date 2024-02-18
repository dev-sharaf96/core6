using Newtonsoft.Json;

namespace Tameenk.Integration.Providers.Wataniya.Dtos.Autolease
{
    class MedicalExpenses
    {
        [JsonProperty("CoverageCode")]
        public string CoverageCode { get; set; }
        [JsonProperty("ActualPremium")]
        public float ActualPremium { get; set; }
    }
}
