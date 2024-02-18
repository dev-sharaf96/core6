﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tameenk.Core.Domain.Entities
{
    public class CorporateVerifyUsers : BaseEntity
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string VerificationCode { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsVerified { get; set; }
        public string MethodName { get; set; }
    }
}
