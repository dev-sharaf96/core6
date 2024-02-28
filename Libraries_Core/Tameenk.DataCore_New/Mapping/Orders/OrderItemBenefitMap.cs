using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Orders;

namespace Tameenk.Data.Mapping.Orders
{
    public class OrderItemBenefitMap :IEntityTypeConfiguration<OrderItemBenefit>
    {
        public void Configure(EntityTypeBuilder<OrderItemBenefit> builder)
        {
            builder.ToTable("OrderItemBenefit");
            builder.HasKey(e => e.Id);
            builder.HasOne(e => e.OrderItem).WithMany(e => e.OrderItemBenefits).HasForeignKey(e => e.OrderItemId);
            builder.HasOne(e => e.Benefit).WithMany().HasForeignKey(e => e.BenefitId);
        }
    }
}
