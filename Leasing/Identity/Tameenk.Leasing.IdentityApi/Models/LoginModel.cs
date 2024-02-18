using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tameenk.Leasing.IdentityApi
{
    public class LoginModel
    {
        [JsonProperty("bankName")]
        public string BankName { get; set; }

        [JsonProperty("nationalId")]
        public string NationalId { get; set; }

        [JsonProperty("phoneNo")]
        public string PhoneNo { get; set; }

        [JsonProperty("hashed")]
        public string Hashed { get; set; }

        [JsonProperty("lang")]
        public string Language { get; set; }
    }
}