using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class BankNinMap :IEntityTypeConfiguration<BankNins>
    {
        public void Configure(EntityTypeBuilder<BankNins> builder)
        {
            builder.ToTable("BankNins");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.NIN).HasMaxLength(500);
            builder.Property(e => e.BankId);
        }
    }
}
