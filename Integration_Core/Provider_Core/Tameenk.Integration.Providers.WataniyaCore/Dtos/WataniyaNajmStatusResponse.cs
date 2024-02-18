namespace Tameenk.Integration.Providers.Wataniya.Dtos
{
    public class WataniyaNajmStatusResponse
    {
        public string PolicyNo { get; set; }
        public string NajmID { get; set; }
        public string NajmStatus { get; set; }
        public string NajmReponseDecription { get; set; }
        public int Status { get; set; }
        public WataniyaNajmStatusError ErrorList { get; set; }
    }

    public class WataniyaNajmStatusError
    {
        public string ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
    }
}
