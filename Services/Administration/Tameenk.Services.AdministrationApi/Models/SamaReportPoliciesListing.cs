﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tameenk.Services.AdministrationApi.Models
{
    public class SamaReportPoliciesListing
    {
        /// <summary>
        /// Policy Number
        /// </summary>
        [JsonProperty("policyNo")]
        public string PolicyNo { get; set; }

        /// <summary>
        /// Insured Full Name in Arabic
        /// </summary>
        [JsonProperty("insuredFullNameAr")]
        public string InsuredFullNameAr { get; set; }

        /// <summary>
        /// Insured Full Name in English
        /// </summary>
        [JsonProperty("insuredFullNameEn")]
        public string InsuredFullNameEn { get; set; }

        /// <summary>
        /// Insured Id
        /// </summary>
        [JsonProperty("insuredNIN")]
        public string InsuredNIN { get; set; }

        /// <summary>
        /// insurance company name ar
        /// </summary>
        [JsonProperty("insuranceCompanyNameAr")]
        public string InsuranceCompanyNameAr { get; set; }
        
        /// <summary>
        /// insurance company name en
        /// </summary>
        [JsonProperty("insuranceCompanyNameEn")]
        public string InsuranceCompanyNameEn { get; set; }

        /// <summary>
        /// English description
        /// </summary>
        [JsonProperty("productTypeDescEN")]
        public string EnglishDescription { get; set; }

        /// <summary>
        /// Arabic description
        /// </summary>
        [JsonProperty("productTypeDescAr")]
        public string ArabicDescription { get; set; }

        /// <summary>
        /// Policy Issue Date
        /// </summary>
        [JsonProperty("policyIssueDate")]
        public DateTime? PolicyIssueDate { get; set; }

        /// <summary>
        /// Checkout details id
        /// </summary>
        [JsonProperty("referenceId")]
        public string CheckOutDetailsId { get; set; }

        /// <summary>
        /// Policy File Id
        /// </summary>
        [JsonProperty("policyFileId")]
        public Guid? PolicyFileId { get; set; }

        /// <summary>
        /// Product Price
        /// </summary>
        [JsonProperty("productPrice")]
        public decimal ProductPrice { get; set; }

        /// <summary>
        /// Total Price id
        /// </summary>
        [JsonProperty("totalPrice")]
        public decimal TotalPrice { get; set; }

        /// <summary>
        /// Max Tries
        /// </summary>
        [JsonProperty("maxTries")]
        public int MaxTries { get; set; }

        /// <summary>
        /// Create date
        /// </summary>
        [JsonProperty("createDate")]
        public DateTime? CreateDate { get; set; }

        /// <summary>
        /// Policy Status Key
        /// </summary>
        [JsonProperty("policyStatuskey")]
        public string PolicyStatusKey { get; set; }

        /// <summary>
        /// Policy Status Name Ar
        /// </summary>
        [JsonProperty("policyStatusNameAr")]
        public string PolicyStatusNameAr { get; set; }

        /// <summary>
        /// Policy Status Name En
        /// </summary>
        [JsonProperty("policyStatusNameEN")]
        public string PolicyStatusNameEn { get; set; }

        /// <summary>
        /// BenfitsPrice
        /// </summary>
        [JsonProperty("benfitsPrice")]
        public decimal? BenfitsPrice { get; set; }

        /// <summary>
        /// Channel
        /// </summary>
        [JsonProperty("channel")]
        public string Channel { get; set; }

        /// <summary>
        /// Policy Status Id
        /// </summary>
        [JsonProperty("policyStatusId")]
        public int PolicyStatusId { get; set; }

        /// <summary>
        /// Checkout Email
        /// </summary>
        [JsonProperty("checkoutEmail")]
        public string CheckoutEmail { get; set; }
    }
}