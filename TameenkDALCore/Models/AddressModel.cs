﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TameenkDAL.Models
{
    public class AddressModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string ObjLatLng { get; set; }
        public string BuildingNumber { get; set; }
        public string Street { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string AdditionalNumber { get; set; }
        public string RegionName { get; set; }
        public string PolygonString { get; set; }
        public string IsPrimaryAddress { get; set; }
        public string UnitNumber { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string CityId { get; set; }
        public string RegionId { get; set; }
        public string Restriction { get; set; }
        public string PKAddressID { get; set; }
        public Nullable<System.Guid> DriverId { get; set; }
    }
}
