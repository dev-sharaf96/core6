using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tameenk.Services.AdministrationApi.Models
{
    /// <summary>
    /// Driver Addresses Model
    /// </summary>
    [JsonObject("driverAddresses")]
    public class AddressesModel
    {
        /// <summary>
        /// Driver
        /// </summary>
        [JsonProperty("driver")]
        public DriverModel Driver { get; set; }

        /// <summary>
        /// Addresses
        /// </summary>
        [JsonProperty("address")]
        public List<AddressModel> Addresses { get; set; }


    }
}