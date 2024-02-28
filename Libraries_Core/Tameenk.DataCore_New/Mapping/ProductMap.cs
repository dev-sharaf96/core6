using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class ProductMap :IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Product");
            builder.HasKey(e => e.Id);
            builder.Property(p => p.ProductPrice).HasPrecision(19, 4);
            builder.Property(p => p.ExternalProductId).HasMaxLength(100);
            builder.Property(p => p.QuotaionNo).IsRequired().HasMaxLength(50);
            builder.Property(p => p.ProductImage).HasMaxLength(250);

            builder.Property(p => p.ProductImage).IsUnicode(false);
            builder.HasOne(p => p.QuotationResponse).WithMany(qr => qr.Products).HasForeignKey(p => p.QuotationResponseId);
            builder.HasMany(e => e.PriceDetails).WithOne(e => e.Product).OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.InsuranceCompany).WithMany(e => e.Products).HasForeignKey(e => e.ProviderId);
        }
    }
}