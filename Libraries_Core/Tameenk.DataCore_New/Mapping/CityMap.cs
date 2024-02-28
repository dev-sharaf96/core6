using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CityMap :IEntityTypeConfiguration<City>
    {
        public CityMap() {
            
        }

        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.ToTable("City");
            builder.HasKey(c => c.Code);
            builder.Property(c => c.EnglishDescription).HasMaxLength(128);
            builder.Property(c => c.ArabicDescription).HasMaxLength(128);
            builder.HasMany(e => e.QuotationRequests)
                .WithOne(e => e.City)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(e => e.Region).WithMany(e => e.Cities).HasForeignKey(e => e.RegionId);
        }
    }
}