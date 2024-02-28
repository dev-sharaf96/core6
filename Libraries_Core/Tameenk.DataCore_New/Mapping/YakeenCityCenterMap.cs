using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class YakeenCityCenterMap :IEntityTypeConfiguration<YakeenCityCenter>
    {
        public void Configure(EntityTypeBuilder<YakeenCityCenter> builder)
        {
            builder.ToTable("YakeenCityCenter");
            builder.HasKey(c => c.Id);
        }
    }
}