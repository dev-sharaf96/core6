
namespace Tameenk.Services
{
    public class QuotatoinConfig : IQuotationConfig
    {
        public bool showZeroPremium { get; set; }
        public string Url { get; set; }
        public bool TestMode { get; set; }
        public bool UseRandomPlateNumber { get; set; }
    }
}
