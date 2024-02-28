using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class VehicleDiscountsMap :IEntityTypeConfiguration<VehicleDiscounts>
    {

        public void Configure(EntityTypeBuilder<VehicleDiscounts> builder)
        {
            builder.ToTable("VehicleDiscounts");
            builder.HasKey(e => e.Id);
        }
    }
}
