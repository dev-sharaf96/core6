using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PriceDetailMap :IEntityTypeConfiguration<PriceDetail>
    {
        public PriceDetailMap()
        {

        }

        public void Configure(EntityTypeBuilder<PriceDetail> builder)
        {
            builder.ToTable("PriceDetail");
            builder.HasKey(e => e.DetailId);
            builder.Property(e => e.PriceValue).HasPrecision(8, 2);
            builder.Property(e => e.PercentageValue).HasPrecision(8, 2);
            builder.Property(e => e.PriceValue)
                .HasPrecision(8, 2);
            builder.Property(e => e.PercentageValue)
                .HasPrecision(8, 2);
        }
    }
}