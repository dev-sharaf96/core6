using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.Identity
{
    public class CorporateUsersMap :IEntityTypeConfiguration<CorporateUsers>
    {
        public void Configure(EntityTypeBuilder<CorporateUsers> builder)
        {
            builder.ToTable("CorporateUsers");
            builder.HasKey(e => e.UserId);
        }
    }
}
