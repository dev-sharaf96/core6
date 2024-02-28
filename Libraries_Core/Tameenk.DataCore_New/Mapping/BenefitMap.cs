using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class BenefitMap : IEntityTypeConfiguration<Benefit>
    {
        public void Configure(EntityTypeBuilder<Benefit> builder)
        {
            builder.ToTable("Benefit");
            builder.HasKey(e => e.Code);
            builder.Property(e => e.EnglishDescription).HasMaxLength(200);
            builder.Property(e => e.ArabicDescription).HasMaxLength(200);

            builder.HasMany(e => e.InsuaranceCompanyBenefits)
                .WithOne(e => e.Benefit)
                .HasForeignKey(e => e.BenifitCode)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(e => e.Invoice_Benefits)
                .WithOne(e => e.Benefit)
                .HasForeignKey(e => e.BenefitId);

            builder.HasMany(e => e.Product_Benefits)
                .WithOne(e => e.Benefit)
                .HasForeignKey(e => e.BenefitId);

            builder.HasMany(e => e.Quotation_Product_Benefits)
                .WithOne(e => e.Benefit)
                .HasForeignKey(e => e.BenefitId);
        }
    }
}
