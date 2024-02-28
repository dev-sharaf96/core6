using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Identity;

namespace Tameenk.Data.Mapping.Identity
{
    public class AutoleasingVerifyUsersMap :IEntityTypeConfiguration<AutoleasingVerifyUsers>
    {
        public void Configure(EntityTypeBuilder<AutoleasingVerifyUsers> builder)
        {
            builder.ToTable("AutoleasingVerifyUsers");
            builder.HasKey(e => e.Id);
        }
    }
}
