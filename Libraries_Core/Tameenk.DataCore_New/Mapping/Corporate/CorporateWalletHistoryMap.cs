using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CorporateWalletHistoryMap :IEntityTypeConfiguration<CorporateWalletHistory>
    {

        public void Configure(EntityTypeBuilder<CorporateWalletHistory> builder)
        {
            builder.ToTable("CorporateWalletHistory");
            builder.HasKey(e => e.Id);
        }
    }
}
