﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tameenk.Services.Core
{
    public class IVRUpdateNationalAddressModel
    {
        [JsonProperty("nationalId")]
        public string NationalId { get; set; }
    }
}
