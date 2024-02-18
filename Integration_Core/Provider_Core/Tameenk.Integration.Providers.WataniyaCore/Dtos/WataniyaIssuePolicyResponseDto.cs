using System.Collections.Generic;

namespace Tameenk.Integration.Providers.Wataniya.Dtos
{
    public class WataniyaIssuePolicyResponseDto
    {
        public bool Status { get; set; }
        public string PolicyNO { get; set; }
        public List<Errors> Errors { get; set; }
    }
}
