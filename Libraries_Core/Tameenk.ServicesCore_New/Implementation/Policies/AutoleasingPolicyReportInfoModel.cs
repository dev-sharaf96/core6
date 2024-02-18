﻿using System;

namespace Tameenk.Services.Implementation.Policies
{
    public class AutoleasingPolicyReportInfoModel
    {
        public  string? PolicyNumber { get; set; }
        public  string? QuotationNumber { get; set; }
        public DateTime? PolicyIssueDate { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public DateTime? PolicyEndDate { get; set; }

        public int? LeasingContractNumber { get; set; }
        public  string? InsuranceCompanyName { get; set; }
        public  string? NajmStatus { get; set; }
        public  string? IssuedPolicyUser { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? NCDLevel { get; set; }
        public decimal? NCDPercentage { get; set; }
        public decimal? NoClaimsDiscountNCD { get; set; }
        public decimal? BasicPrimium { get; set; }
        public decimal? BasicPrimiumWithVAT { get; set; }
        public decimal? VAT { get; set; }
        public decimal? LesseeInsuranceAmount { get; set; }
        public  string? CustomerName { get; set; }
        public  string? NationalID { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public  string? Email { get; set; }
        public  string? PhoneNumber { get; set; }
        public  string? VehicleMakerName { get; set; }
        public  string? VehicleModelName { get; set; }
        public  string? VehicleBodyType { get; set; }
        public  string? VehicleColor { get; set; }
        public int? SumInsured { get; set; }
        public  string? Usage { get; set; }
        public  string? CustomCardNumber { get; set; }
        public  string? ChassisNumber { get; set; }
        public  string? SequenceNumber { get; set; }
        public  string? PlateNumber { get; set; }
        public short? ModelYear { get; set; }
        public Guid ProductId { get; set; }
    }
}