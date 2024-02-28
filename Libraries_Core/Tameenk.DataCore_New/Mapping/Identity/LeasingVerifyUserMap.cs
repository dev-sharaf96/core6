using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class LeasingVerifyUserMap :IEntityTypeConfiguration<LeasingVerifyUser>
    {
        public void Configure(EntityTypeBuilder<LeasingVerifyUser> builder)
        {
            builder.ToTable("LeasingVerifyUsers");
            builder.HasKey(e => e.Id);
        }
    }
}
