using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CheckoutAdditionalDriverMap :IEntityTypeConfiguration<CheckoutAdditionalDriver>
    {

        public void Configure(EntityTypeBuilder<CheckoutAdditionalDriver> builder)
        {
            builder.Property(e => e.CheckoutDetailsId).IsRequired().HasMaxLength(50);
        }
    }
}
