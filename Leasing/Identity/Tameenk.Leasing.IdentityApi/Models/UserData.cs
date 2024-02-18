using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tameenk.Leasing.IdentityApi
{
    public class UserData
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("phoneNo", NullValueHandling = NullValueHandling.Ignore)]
        public string PhoneNo { get; set; }

        [JsonProperty("lang")]
        public string Language { get; set; }
    }
}