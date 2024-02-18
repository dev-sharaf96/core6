using System.Collections.Generic;

namespace Tameenk.Integration.Providers.Wataniya.Dtos
{
    public class WataniyaCompDraftPolicyRequestDto
    {
        public WataniyaCompDraftPolicyRequestDeatilsDto Details { get; set; }
        public int InsuranceCompanyCode { get; set; }
        public string PolicyRequestReferenceNo { get; set; }
        public long QuoteReferenceNo { get; set; }
        public string RequestReferenceNo { get; set; }
    }

    public class WataniyaCompDraftPolicyRequestDeatilsDto
    {
        public int DeductibleAmount { get; set; }
        public string DeductibleReferenceNo { get; set; }
        public decimal PolicyPremium { get; set; }
        public List<PolicyPremiunFeatures> PolicyPremiumFeatures { get; set; }
    }
}
