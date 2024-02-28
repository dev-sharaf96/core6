using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class CustomCardInfoMap :IEntityTypeConfiguration<CustomCardInfo>
    {

        public void Configure(EntityTypeBuilder<CustomCardInfo> builder)
        {
            builder.ToTable("CustomCardInfo");
            builder.HasKey(e => e.Id);
        }
    }
}