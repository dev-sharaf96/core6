﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Tameenk.Core.Domain.Dtos
{
    public class AttachedFiles
    {
        public string Extension { get; set; }
        public byte[] File { get; set; }
        public int TicketTypeFileNameId;
    }
}