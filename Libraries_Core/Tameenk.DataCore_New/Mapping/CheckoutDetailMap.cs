using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CheckoutDetailMap : IEntityTypeConfiguration<CheckoutDetail>
    {
        public void Configure(EntityTypeBuilder<CheckoutDetail> builder)
        {
            builder.HasKey(e => e.ReferenceId);
            builder.Property(e => e.ReferenceId).HasMaxLength(50);
            builder.Property(e => e.Email).HasMaxLength(50);
            builder.Property(e => e.Phone).HasMaxLength(50);
            builder.Property(e => e.Channel);
            builder.Property(e => e.InsuranceCompanyName);
            builder.Property(e => e.BankCodeId);
            builder.Property(e => e.IBAN).HasMaxLength(50);
            builder.Property(e => e.UserId).IsRequired().HasMaxLength(128);

            //builder.HasOptional(checkout => checkout.InsuranceCompany).WithMany().HasForeignKey(qr => qr.InsuranceCompanyId);

            //builder.HasMany(e => e.CheckoutAdditionalDrivers)
            //    .WithRequired(e => e.CheckoutDetail)
            //    .HasForeignKey(e => e.CheckoutDetailsId)
            //    .WillCascadeOnDelete(false);

            //builder.HasMany(e => e.PayfortPaymentRequests)
            //    .WithMany(e => e.CheckoutDetails)
            //    .Map(m => m.ToTable("Checkout_PayfortPaymentReq").MapLeftKey("CheckoutdetailsId").MapRightKey("PayfortPaymentRequestId"));

            //builder.HasMany(e => e.Policies)
            //    .WithRequired(e => e.CheckoutDetail)
            //    .HasForeignKey(e => e.CheckOutDetailsId)
            //    .WillCascadeOnDelete(false);

            //builder.HasOptional(e => e.PaymentMethod).WithMany().HasForeignKey(e => e.PaymentMethodId);
            builder.HasOne(e => e.BankCode).WithMany().HasForeignKey(e => e.BankCodeId);
            //builder.HasOne(e => e.AdditionalInfo).WithOne();

            //builder.HasMany(e => e.HyperpayRequests)
            //    .WithMany(e => e.CheckoutDetails)
            // .Map(m => m.ToTable("Checkout_HyperpayPaymentReq").MapLeftKey("CheckoutdetailsId").MapRightKey("HyperpayPaymenRequestId"));
        }
    }
}
