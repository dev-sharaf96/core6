﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tameenk.Services.QuotationNew.Components
{
    public class QuotationNewProductDto
    {
        public string ProductId { get; set; }
        public string ProductNameAr { get; set; }
        public string ProductNameEn { get; set; }
        public string ProductDescAr { get; set; }
        public string ProductDescEn { get; set; }
        public decimal ProductPrice { get; set; }
        public int? DeductibleValue { get; set; }
        public int? VehicleLimitValue { get; set; }
        public int InsuranceTypeCode { get; set; }
        public List<QuotationNewPriceDto> PriceDetails { get; set; }
        public List<QuotationNewBenefitDto> Benefits { get; set; }

        public bool IsPromoted { get; set; }
        public string DeductibleType { get; set; }
        public int? ODLimit { get; set; }
        public int? TPLLimit { get; set; }
        public decimal? PolicyPremium { get; set; }
        public decimal? AnnualPremiumBFD { get; set; }
    }
}
