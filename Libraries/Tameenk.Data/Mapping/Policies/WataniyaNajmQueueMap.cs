﻿using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tameenk.Core.Domain.Entities.Policies;

namespace Tameenk.Data.Mapping.Policies
{
    public class WataniyaNajmQueueMap : EntityTypeConfiguration<WataniyaNajmQueue>

    {
        public WataniyaNajmQueueMap()
        {
            ToTable("WataniyaNajmQueue");
            HasKey(e => e.Id);
        }
    }
}