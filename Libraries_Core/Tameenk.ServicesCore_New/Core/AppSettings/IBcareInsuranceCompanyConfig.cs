﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tameenk.Services
{
    public interface IBcareInsuranceCompanyConfig
    {
        public int NIN { get; set; }
        public string VehicleChassisNumber { get; set; }
    }
}
