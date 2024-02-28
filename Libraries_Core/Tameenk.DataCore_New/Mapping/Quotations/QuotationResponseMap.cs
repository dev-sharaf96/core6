using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Quotations;

namespace Tameenk.Data.Mapping.Quotations
{
    public class QuotationResponseMap :IEntityTypeConfiguration<QuotationResponse>
    {
        public void Configure(EntityTypeBuilder<QuotationResponse> builder)
        {
            builder.ToTable("QuotationResponse");
            builder.Property(qr => qr.ReferenceId).IsRequired().HasMaxLength(50);

            builder.HasOne(qr => qr.InsuranceCompany).WithMany().HasForeignKey(qr => qr.InsuranceCompanyId);

        }
    }
}