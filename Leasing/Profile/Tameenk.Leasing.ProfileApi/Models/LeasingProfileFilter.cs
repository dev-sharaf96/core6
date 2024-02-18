using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tameenk.Leasing.ProfileApi.Models
{
    public class LeasingProfileFilter
    {
        public int BankId { get; set; }
        public string VehicleId { get; set; }
        public string DriverId { get; set; }
    }
}