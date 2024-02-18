using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tameenk.Leasing.IdentityApi
{
    public class UpdatedUserDataModel
    {
        [JsonProperty("updatedEmail")]
        public string UpdatedEmail { get; set; }

        [JsonProperty("referenceId")]
        public string ReferenceId { get; set; }

        [JsonProperty("lang")]
        public string lang { get; set; }
    }
}