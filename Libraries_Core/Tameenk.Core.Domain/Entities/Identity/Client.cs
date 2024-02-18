﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tameenk.Core.Domain.Enums.Identity;

namespace Tameenk.Core.Domain.Entities.Identity
{
    public class Client : BaseEntity
    {
        public string Id { get; set; }

        public string Secret { get; set; }

        public string Name { get; set; }

        public ApplicationTypes ApplicationType { get; set; }

        public bool Active { get; set; }

        public int RefreshTokenLifeTime { get; set; }

        public string AllowedOrigin { get; set; }

        public string AuthServerUrl { get; set; }

        public string RedirectUrl { get; set; }
    }
}
