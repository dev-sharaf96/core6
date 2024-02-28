using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PolicyRenewedByCompanyMap :IEntityTypeConfiguration<PolicyRenewedByCompany>
    {
        public void Configure(EntityTypeBuilder<PolicyRenewedByCompany> builder)
        {
            builder.ToTable("PolicyRenewedByCompany");
            builder.HasKey(e => e.Id);
        }
    }
}
