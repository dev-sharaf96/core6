using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class DeductibleMap :IEntityTypeConfiguration<Deductible>
    {
        public void Configure(EntityTypeBuilder<Deductible> builder)
        {
            builder.ToTable("Deductible");
            builder.HasKey(e => e.ID);
            builder.Property(e => e.Name).HasPrecision(8, 2);

            builder.HasOne(e => e.InsuranceCompany).WithMany(e => e.Deductibles).HasForeignKey(e => e.InsuranceCompanyID);
        }
    }
}
