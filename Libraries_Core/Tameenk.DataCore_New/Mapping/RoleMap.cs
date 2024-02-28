using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class RoleMap :IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Role");
            builder.Property(e => e.RoleNameEN).IsRequired().HasMaxLength(50);
            builder.Property(e => e.RoleNameAR).IsRequired().HasMaxLength(50);



            builder.HasMany(e => e.AspNetUsers)
                .WithOne(e => e.Role)
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
