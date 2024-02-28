using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PaymentMap :IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.ToTable("Payment");
            builder.HasKey(e => e.BillNumber);
            builder.Property(e => e.ReferenceID).HasMaxLength(50);
            builder.Property(e => e.UserID).HasMaxLength(50);
            builder.Property(e => e.IBNA).HasMaxLength(25);
        }
    }
}
