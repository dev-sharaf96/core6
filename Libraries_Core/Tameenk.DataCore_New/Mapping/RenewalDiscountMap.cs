using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class RenewalDiscountMap :IEntityTypeConfiguration<RenewalDiscount>
    {
        public void Configure(EntityTypeBuilder<RenewalDiscount> builder)
        {
            builder.ToTable("RenewalDiscount");
            builder.HasKey(e => e.Id);
        }
    }
}
