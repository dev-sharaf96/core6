using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Orders;

namespace Tameenk.Data.Mapping.Orders
{
    public class ShoppingCartItemBenefitMap :IEntityTypeConfiguration<ShoppingCartItemBenefit>
    {
        public void Configure(EntityTypeBuilder<ShoppingCartItemBenefit> builder)
        {
            builder.ToTable("ShoppingCartItemBenefit");
            builder.HasKey(e => e.Id);
            builder.HasOne(e => e.ShoppingCartItem).WithMany(e => e.ShoppingCartItemBenefits).HasForeignKey(e => e.ShoppingCartItemId);
            builder.HasOne(e => e.Product_Benefit).WithMany().HasForeignKey(e => e.ProductBenefitId);
        }
    }
}
