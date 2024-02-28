using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PolicyMap : IEntityTypeConfiguration<Policy>
    {
        public PolicyMap()
        {
        }

        public void Configure(EntityTypeBuilder<Policy> builder)
        {
            builder.ToTable("Policy");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.PolicyNo).IsRequired().HasMaxLength(36);
            builder.Property(e => e.CheckOutDetailsId).IsRequired().HasMaxLength(50);
            builder.Property(e => e.NajmStatusId).IsRequired();
            //builder.HasOne(e => e.PolicyDetail)
            //    .WithOne(e => e.Policy).HasForeignKey<PolicyDetail>(d=> d.Id);
            builder.HasOne(e => e.InsuranceCompany).WithMany(e => e.Policies).HasForeignKey(e => e.InsuranceCompanyID);
        }
    }
}
