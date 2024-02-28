using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class AutoleasingUserMap :IEntityTypeConfiguration<AutoleasingUser>
    {
        public void Configure(EntityTypeBuilder<AutoleasingUser> builder)
        {
            builder.ToTable("AutoleasingUsers");
            builder.HasKey(e => e.Id);
        }
    }
}
