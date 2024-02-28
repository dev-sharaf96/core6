using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PayfortPaymentRequestMap :IEntityTypeConfiguration<PayfortPaymentRequest>
    {
     

        public void Configure(EntityTypeBuilder<PayfortPaymentRequest> builder)
        {
            builder.ToTable("PayfortPaymentRequest");
            builder.HasKey(e => e.ID);
            builder.Property(e => e.ID).ValueGeneratedOnAdd();
            builder.Property(e => e.UserId).IsRequired().HasMaxLength(128);
            builder.HasIndex(e => e.ReferenceNumber).IsUnique();
            builder.Property(e => e.ReferenceNumber).HasMaxLength(20);

            builder.Property(e => e.Amount)
                .HasPrecision(10, 4);

            builder.HasMany(e => e.PayfortPaymentResponses)
                .WithOne(e => e.PayfortPaymentRequest)
                .HasForeignKey(e => e.RequestId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
