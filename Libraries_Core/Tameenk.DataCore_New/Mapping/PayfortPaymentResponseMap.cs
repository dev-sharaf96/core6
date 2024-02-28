using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PayfortPaymentResponseMap :IEntityTypeConfiguration<PayfortPaymentResponse>
    {
        public void Configure(EntityTypeBuilder<PayfortPaymentResponse> builder)
        {
            builder.ToTable("PayfortPaymentResponse");
            builder.Property(e => e.ResponseMessage).HasMaxLength(200);
            builder.Property(e => e.PaymentOption).HasMaxLength(20);
            builder.Property(e => e.CardNumber).HasMaxLength(20);
            builder.Property(e => e.CardHolerName).HasMaxLength(50);
            builder.Property(e => e.CardExpiryDate).HasMaxLength(5);
            builder.Property(e => e.CustomerIP).HasMaxLength(50);
            builder.Property(e => e.FortId).HasMaxLength(25);
            builder.Property(e => e.Amount)
                .HasPrecision(10, 4);
        }
    }
}
