using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class RoleTypeMap :IEntityTypeConfiguration<RoleType>
    {
        public void Configure(EntityTypeBuilder<RoleType> builder)
        {
            builder.ToTable("RoleType");
            builder.Property(e => e.TypeNameEN).IsRequired().HasMaxLength(50);
            builder.Property(e => e.TypeNameAR).IsRequired().HasMaxLength(50);
            builder.HasMany(e => e.Roles)
                .WithOne(e => e.RoleType)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
