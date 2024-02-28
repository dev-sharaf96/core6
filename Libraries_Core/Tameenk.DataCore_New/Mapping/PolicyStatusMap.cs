using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PolicyStatusMap :IEntityTypeConfiguration<PolicyStatus>
    {
        public void Configure(EntityTypeBuilder<PolicyStatus> builder)
        {
            builder.Property(e => e.Key).HasMaxLength(200);
            builder.Property(e => e.NameEn).IsRequired().HasMaxLength(200);
            builder.Property(e => e.NameAr).IsRequired().HasMaxLength(200);
            builder.HasMany(e => e.CheckoutDetails)
                .WithOne(e => e.PolicyStatus)
                .HasForeignKey(e => e.PolicyStatusId);
        }
    }
}
