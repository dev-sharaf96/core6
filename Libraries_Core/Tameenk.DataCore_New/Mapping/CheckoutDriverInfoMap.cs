using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CheckoutDriverInfoMap :IEntityTypeConfiguration<CheckoutDriverInfo>
    {
        public void Configure(EntityTypeBuilder<CheckoutDriverInfo> builder)
        {
            builder.ToTable("CheckoutDriverInfo");
            builder.HasKey(c => c.ID);
        }
    }
}
