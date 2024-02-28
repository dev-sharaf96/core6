using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Quotations;

namespace Tameenk.Data.Mapping
{
    public class QuotationSharesMap :IEntityTypeConfiguration<QuotationShares>
    {
        public void Configure(EntityTypeBuilder<QuotationShares> builder)
        {
            builder.ToTable("QuotationShares");
            builder.HasKey(c => c.Id);
        }
    }
}