using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Payments.RiyadBank;

namespace Tameenk.Data.Mapping.Payments.RiyadBank
{
    public class RiyadBankMigsRequestMap :IEntityTypeConfiguration<RiyadBankMigsRequest>
    {

        void IEntityTypeConfiguration<RiyadBankMigsRequest>.Configure(EntityTypeBuilder<RiyadBankMigsRequest> builder)
        {
            builder.ToTable("RiyadBankMigsRequest");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Amount).HasPrecision(19, 4);
            builder.HasMany(e => e.RiyadBankMigsResponses)
                .WithOne(e => e.RiyadBankMigsRequest)
                .HasForeignKey(e => e.RiyadBankMigsRequestId)
                .OnDelete(DeleteBehavior.Restrict);


            //builder.HasMany(e => e.CheckoutDetails)
            //   .WithMany()
            //   .Map(m => m.ToTable("Checkout_RiyadBankMigsRequest")
            //   .MapLeftKey("RiyadBankMigsRequestId")
            //   .MapRightKey("CheckoutdetailsId"));
        }
    }
}
