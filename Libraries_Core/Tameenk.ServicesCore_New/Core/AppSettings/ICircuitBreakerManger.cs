﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tameenk.ServicesCore
{
    public interface ICircuitBreakerMangerConfig
    {
        public int BreakCompanyAfterNoOfExceptionOccurCount { get; set; }
        public double ReleaseComapnyFromBreakingModeAfterTimeInMinutes { get; set; }
    }
}
