﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tameenk.Loggin.DAL
{

   [Table("CompetitionRequestLogs")]
   public class CompetitionRequestLog
    {
        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserIP { get; set; }
        public string UserAgent { get; set; }
        public string ServerIP { get; set; }
        public string Channel { get; set; }
        public int? ErrorCode { get; set; }
        public string ErrorDescription { get; set; }
        public string Method { get; set; }
        public string VehicleId { get; set; }
        public string Nin { get; set; }
        public string ServiceRequest { get; set; }
    }
}