using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class LoginActiveTokensMap :IEntityTypeConfiguration<LoginActiveTokens>
    {
        public void Configure(EntityTypeBuilder<LoginActiveTokens> builder)
        {
            builder.ToTable("LoginActiveTokens");
            builder.HasKey(e => e.Id);
        }
    }
}
