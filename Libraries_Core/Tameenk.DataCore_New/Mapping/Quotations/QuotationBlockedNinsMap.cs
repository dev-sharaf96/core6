using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.Quotations
{
    public class QuotationBlockedNinsMap :IEntityTypeConfiguration<QuotationBlockedNins>
    {
        public void Configure(EntityTypeBuilder<QuotationBlockedNins> builder)
        {
            builder.ToTable("QuotationBlockedNins");
            builder.HasKey(e => e.Id);
        }
    }
}
