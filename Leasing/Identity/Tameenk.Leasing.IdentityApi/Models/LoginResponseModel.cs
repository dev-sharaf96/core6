using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tameenk.Leasing.IdentityApi
{
    public class LoginResponseModel
    {
        [JsonProperty("isSuccess")]

        public bool IsSuccess { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("Otp")]
        public string Otp { get; internal set; }
    }
}