using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class InsuaranceCompanyBenefitMap :IEntityTypeConfiguration<InsuaranceCompanyBenefit>
    {
        public void Configure(EntityTypeBuilder<InsuaranceCompanyBenefit> builder)
        {
            builder.ToTable("InsuaranceCompanyBenefit");
            builder.HasKey(e => e.BenifitID);
            builder.Property(e => e.BenifitPrice).HasPrecision(8, 2);
            builder.HasOne(e => e.InsuranceCompany).WithMany(e => e.InsuaranceCompanyBenefits).HasForeignKey(e => e.InsurnaceCompanyID);
            builder.HasOne(e => e.Benefit).WithMany(e => e.InsuaranceCompanyBenefits).HasForeignKey(e => e.BenifitCode);
        }
    }
}
