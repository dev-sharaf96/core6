using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Services.QuotationApi.Data.Mapping
{
    public class Quotation_Product_BenefitMap :IEntityTypeConfiguration<Quotation_Product_Benefit>
    {
        public void Configure(EntityTypeBuilder<Quotation_Product_Benefit> builder)
        {
            builder.Property(e => e.BenefitPrice).HasPrecision(19, 4);
            builder.Property(p => p.BenefitExternalId).HasMaxLength(50);
        }
    }
}