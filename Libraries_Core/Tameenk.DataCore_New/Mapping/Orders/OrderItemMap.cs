using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Orders;

namespace Tameenk.Data.Mapping.Orders
{
    public class OrderItemMap :IEntityTypeConfiguration<OrderItem>
    {
        public OrderItemMap()
        {

        }

        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.ToTable("OrderItem");
            builder.HasKey(e => e.Id);
            builder.Property(p => p.Price).HasPrecision(19, 4);
            builder.HasOne(e => e.Product).WithMany().HasForeignKey(e => e.ProductId);
            builder.HasOne(e => e.CheckoutDetail).WithMany(e => e.OrderItems).HasForeignKey(e => e.CheckoutDetailReferenceId);
        }
    }
}
