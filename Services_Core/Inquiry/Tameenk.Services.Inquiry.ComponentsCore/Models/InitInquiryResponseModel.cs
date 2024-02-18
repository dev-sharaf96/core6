﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tameenk.Services.Inquiry.Components
{
    [JsonObject("InitInquiryResponse")]
    public class InitInquiryResponseModel
    {

        /// <summary>
        /// The city code.
        /// </summary>
        [JsonProperty("cityCode")]
        [Required]
        public long? CityCode { get; set; }

        /// <summary>
        /// The policy effective date.
        /// </summary>
        [JsonProperty("policyEffectiveDate")]
        [Required]
        public DateTime PolicyEffectiveDate { get; set; }


        /// <summary>
        /// Is the vehicle user commercially.
        /// </summary>
        [JsonProperty("isVehicleUsedCommercially")]
        public bool IsVehicleUsedCommercially { get; set; }



        /// <summary>
        /// Is the current cuatomer is the owner of this vehicle.
        /// </summary>
        [JsonProperty("isCustomerCurrentOwner")]
        public bool IsCustomerCurrentOwner { get; set; }

        /// <summary>
        /// Old owner national identification number.
        /// </summary>
        [JsonProperty("oldOwnerNin")]
        public long? OldOwnerNin { get; set; }

        /// <summary>
        /// Is customer have special need.
        /// </summary>
        [JsonProperty("isCustomerSpecialNeed")]
        public bool? IsCustomerSpecialNeed { get; set; }

        /// <summary>
        /// The addtional driver(s).
        /// </summary>
        [JsonProperty("drivers")]
        public List<DriverModel> Drivers { get; set; }

        /// <summary>
        /// The insured person information.
        /// </summary>
        [JsonProperty("insured")]
        public InsuredModel Insured { get; set; }

        /// <summary>
        /// The vheicle.
        /// </summary>
        [JsonProperty("vehicle")]
        public VehicleModel Vehicle { get; set; }


        [JsonProperty("isMainDriverExist")]
        public bool IsMainDriverExist { get; set; }

        [JsonProperty("isVehicleExist")]
        public bool IsVehicleExist { get; set; }

        // [JsonProperty("errors")]

        //public List<ErrorModel> Errors { get; set; }


        [JsonProperty("isRenualRequest")]
        public bool IsRenualRequest { get; set; }

        [JsonProperty("externalId")]
        public string ExternalId { get; set; }

        [JsonProperty("referenceId")]
        public string ReferenceId { get; set; }
    }
}

