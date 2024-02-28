using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class ProductTypeMap :IEntityTypeConfiguration<ProductType>
    {

        public void Configure(EntityTypeBuilder<ProductType> builder)
        {
            builder.ToTable("ProductType");
            builder.HasKey(p => p.Code);
            builder.Property(p => p.Code).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            builder.HasMany(p => p.QuotationResponses).WithOne(p => p.ProductType).HasForeignKey(p => p.InsuranceTypeCode);
            builder.Property(p => p.EnglishDescription).HasMaxLength(200);
            builder.Property(p => p.ArabicDescription).HasMaxLength(200);
            builder.HasMany(e => e.CheckoutDetails)
                .WithOne(e => e.ProductType)
                .HasForeignKey(e => e.SelectedInsuranceTypeCode);
            builder.HasMany(e => e.InsuranceCompanyProductTypeConfigs)
                .WithOne(e => e.ProductType)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(e => e.Invoices)
                .WithOne(e => e.ProductType)
                .HasForeignKey(e => e.InsuranceTypeCode);
        }
    }
}