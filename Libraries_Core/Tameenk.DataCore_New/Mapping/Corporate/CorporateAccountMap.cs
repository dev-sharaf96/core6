using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CorporateAccountMap :IEntityTypeConfiguration<CorporateAccount>
    {

        public void Configure(EntityTypeBuilder<CorporateAccount> builder)
        {
           builder.ToTable("CorporateAccount");
            builder.HasKey(e => e.Id);
        }
    }
}
