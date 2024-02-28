using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CheckoutUsersMap :IEntityTypeConfiguration<CheckoutUsers>
    {
        public void Configure(EntityTypeBuilder<CheckoutUsers> builder)
        {
            builder.ToTable("CheckoutUsers");
            builder.HasKey(c => c.Id);
        }
    }
}
