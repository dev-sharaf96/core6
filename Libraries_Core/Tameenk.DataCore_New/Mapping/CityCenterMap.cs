using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CityCenterMap :IEntityTypeConfiguration<CityCenter>
    {
        public void Configure(EntityTypeBuilder<CityCenter> builder)
        {
            builder.ToTable("CityCenter");
            builder.HasKey(c => c.Id);
        }
    }
}