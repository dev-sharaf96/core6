using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tameenk.Core.Domain.Entities
{
    public class AdditionalInfo : BaseEntity
    {
        public AdditionalInfo()
        {
            
        }
        public string ReferenceId { get; set; }
        public string InfoAsJsonString { get; set; }
        public string DriverAdditionalInfo { get; set; }

        [NotMapped]
        public CheckoutDetail CheckoutDetail { get; set; }
    }
}
