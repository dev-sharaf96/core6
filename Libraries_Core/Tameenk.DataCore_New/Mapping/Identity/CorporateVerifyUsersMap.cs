using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.Identity
{
    public class CorporateVerifyUsersMap : IEntityTypeConfiguration<CorporateVerifyUsers>
    {
        public void Configure(EntityTypeBuilder<CorporateVerifyUsers> builder)
        {
            builder.ToTable("CorporateVerifyUsers");
            builder.HasKey(e => e.Id);
        }
    }
}
