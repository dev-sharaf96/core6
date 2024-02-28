using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Payments.RiyadBank;

namespace Tameenk.Data.Mapping.Payments.RiyadBank
{
    public class RiyadBankMigsResponseMap :IEntityTypeConfiguration<RiyadBankMigsResponse>
    {
        public void Configure(EntityTypeBuilder<RiyadBankMigsResponse> builder)
        {
            builder.ToTable("RiyadBankMigsResponse");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Amount).HasPrecision(19, 4);
            builder.HasOne(e => e.RiyadBankMigsRequest).WithMany(e => e.RiyadBankMigsResponses).HasForeignKey(e => e.RiyadBankMigsRequestId);
            builder.Property(e => e.RiyadBankMigsRequestId).IsRequired();
        }
    }
}
