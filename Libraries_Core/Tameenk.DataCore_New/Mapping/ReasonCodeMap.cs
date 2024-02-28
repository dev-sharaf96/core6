using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class ReasonCodeMap :IEntityTypeConfiguration<ReasonCode>
    {
        public void Configure(EntityTypeBuilder<ReasonCode> builder)
        {
            builder.ToTable("ReasonCode");
            builder.HasKey(e => e.Id);
        }
    }
}
