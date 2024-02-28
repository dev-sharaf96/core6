using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.PromotionPrograms;

namespace Tameenk.Data.Mapping
{
    public class DeservingDiscountMap :IEntityTypeConfiguration<DeservingDiscount>
    {
        public void Configure(EntityTypeBuilder<DeservingDiscount> builder)
        {
            builder.ToTable("DeservingDiscount");
            builder.HasKey(c => c.Id);
        }
    }
}