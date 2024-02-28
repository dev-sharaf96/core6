using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class QuotationResponseCacheMap :IEntityTypeConfiguration<QuotationResponseCache>
    {
        public void Configure(EntityTypeBuilder<QuotationResponseCache> builder)
        {
            builder.ToTable("QuotationResponseCache");
            builder.HasKey(c => c.ID);
        }
    }
}
