using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class LeasingUserMap :IEntityTypeConfiguration<LeasingUser>
    {
       public void Configure(EntityTypeBuilder<LeasingUser> builder)
        {
            builder.ToTable("LeasingUsers");
            builder.HasKey(e => e.Id);
        }
    }
}
