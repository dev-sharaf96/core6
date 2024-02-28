using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CheckoutInsuredMappingTempMap :IEntityTypeConfiguration<CheckoutInsuredMappingTemp>
    {
        public void Configure(EntityTypeBuilder<CheckoutInsuredMappingTemp> builder)
        {
            builder.ToTable("CheckoutInsuredMappingTemp");
            builder.HasKey(e => e.Id);
        }
    }
}
