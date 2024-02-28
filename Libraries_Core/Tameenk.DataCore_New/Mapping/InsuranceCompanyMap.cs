using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class InsuranceCompanyMap :IEntityTypeConfiguration<InsuranceCompany>
    {
        public void Configure(EntityTypeBuilder<InsuranceCompany> builder)
        {

            builder.ToTable("InsuranceCompany");

            builder.HasKey(e => e.InsuranceCompanyID);
            builder.Property(e => e.InsuranceCompanyID).ValueGeneratedOnAdd();// HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            builder.Property(e => e.NameAR).IsRequired().HasMaxLength(50);
            builder.Property(e => e.NameEN).IsRequired().HasMaxLength(50);
            builder.Property(e => e.Key).IsRequired().HasMaxLength(50);
            builder.Property(e => e.DescAR).HasMaxLength(1000);
            builder.Property(e => e.DescEN).HasMaxLength(1000);

            builder.HasMany(e => e.Deductibles)
                .WithOne(e => e.InsuranceCompany)
               .OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(e => e.InsuaranceCompanyBenefits)
                            .WithOne(e => e.InsuranceCompany)
                            .HasForeignKey(e => e.InsurnaceCompanyID)
                            .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(e => e.Products)
                .WithOne(e => e.InsuranceCompany)
                .HasForeignKey(e => e.ProviderId);

            builder.HasOne(e => e.Address).WithMany(e => e.InsuranceCompanies).HasForeignKey(e => e.AddressId);
            builder.HasOne(e => e.Contact).WithMany(e => e.InsuranceCompanies).HasForeignKey(e => e.ContactId);

       
        }
    }
}
