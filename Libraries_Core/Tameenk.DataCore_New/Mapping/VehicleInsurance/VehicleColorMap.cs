using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleColorMap :IEntityTypeConfiguration<VehicleColor>
    {
        public void Configure(EntityTypeBuilder<VehicleColor> builder)
        {
            builder.ToTable("VehicleColor");
            builder.HasKey(vc => vc.Code);
            builder.Property(vc => vc.EnglishDescription).HasMaxLength(200);
            builder.Property(vc => vc.ArabicDescription).HasMaxLength(200);
        }
    }
}