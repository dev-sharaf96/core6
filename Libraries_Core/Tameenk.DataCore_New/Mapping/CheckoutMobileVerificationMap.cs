using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CheckoutMobileVerificationMap : IEntityTypeConfiguration<CheckoutMobileVerification>
    {
        public void Configure(EntityTypeBuilder<CheckoutMobileVerification> builder)
        {
            builder.ToTable("CheckoutMobileVerification");
            builder.HasKey(e => e.Id);
        }
    }
}
