using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Policies;

namespace Tameenk.Data.Mapping.Policies
{
    public class RenewalPoliciesMap :IEntityTypeConfiguration<RenewalPolicies>

    {

        public void Configure(EntityTypeBuilder<RenewalPolicies> builder)
        {
            builder.ToTable("RenewalPolicies");
            builder.HasKey(e => e.Id);
        }
    }
}
