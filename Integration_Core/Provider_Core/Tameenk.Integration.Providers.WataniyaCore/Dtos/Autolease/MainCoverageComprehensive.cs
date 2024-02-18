using Newtonsoft.Json;

namespace Tameenk.Integration.Providers.Wataniya.Dtos.Autolease
{
    class MainCoverageComprehensive
    {
        [JsonProperty("CoverageCode")]
        public string CoverageCode { get; set; }
        [JsonProperty("ODLimit")]
        public float ODLimit { get; set; }
        [JsonProperty("ActualPremium")]
        public float ActualPremium { get; set; }
        [JsonProperty("AnnualPremiumBFD")]
        public float AnnualPremiumBFD { get; set; }
        [JsonProperty("TPLLimit")]
        public float TPLLimit { get; set; }
    }
}
