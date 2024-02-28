using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class ForgotPasswordTokenMap : IEntityTypeConfiguration<ForgotPasswordToken>
    {
        public void Configure(EntityTypeBuilder<ForgotPasswordToken> builder)
        {
            builder.ToTable("ForgotPasswordToken");
            builder.HasKey(e => e.Id);
        }
    }
}
