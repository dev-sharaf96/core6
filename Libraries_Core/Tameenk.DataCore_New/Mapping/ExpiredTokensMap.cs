using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class ExpiredTokensMap : IEntityTypeConfiguration<ExpiredTokens>
    {
        public void Configure(EntityTypeBuilder<ExpiredTokens> builder)
        {
            builder.ToTable("ExpiredTokens");
            builder.HasKey(c => c.Id);
        }
    }
}