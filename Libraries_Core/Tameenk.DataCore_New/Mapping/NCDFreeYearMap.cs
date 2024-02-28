using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class NCDFreeYearMap : IEntityTypeConfiguration<NCDFreeYear>
    {
        public void Configure(EntityTypeBuilder<NCDFreeYear> builder)
        {
            builder.ToTable("NCDFreeYear");
            builder.HasKey(e => e.Code);
            builder.Property(e => e.EnglishDescription).HasMaxLength(200);
            builder.Property(e => e.ArabicDescription).HasMaxLength(200);
        }
    }
}
