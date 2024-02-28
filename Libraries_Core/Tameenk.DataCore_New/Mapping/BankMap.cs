using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class BankMap :IEntityTypeConfiguration<Bank>
    {

        public void Configure(EntityTypeBuilder<Bank> builder)
        {
            builder.ToTable("Bank");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.NameAr).HasMaxLength(500);
            builder.Property(e => e.NameEn).HasMaxLength(500);
        }
    }
}
