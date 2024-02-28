using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.Payments.Edaat
{
    public class OfferMap:IEntityTypeConfiguration<Offer>
    {
        public OfferMap()
        {
            
        }

        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder.ToTable("Offer");
            builder.HasKey(e => e.Id);
        }
    }
}
