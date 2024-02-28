using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class BankInsuranceCompanyMap :IEntityTypeConfiguration<BankInsuranceCompany>
    {

        public void Configure(EntityTypeBuilder<BankInsuranceCompany> builder)
        {
            builder.ToTable("BankInsuranceCompany");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.CompanyId);
            builder.Property(e => e.BankId);
        }
    }
}
