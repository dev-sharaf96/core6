using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class AddressMap :IEntityTypeConfiguration<Address>
    {
        public AddressMap()
        {
            
        }

        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable("Address");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Address1).HasMaxLength(500);
            builder.Property(e => e.Address2).HasMaxLength(500);
            builder.Property(e => e.ObjLatLng).HasMaxLength(500);
            builder.Property(e => e.BuildingNumber).HasMaxLength(500);
            builder.Property(e => e.Street).HasMaxLength(500);
            builder.Property(e => e.District).HasMaxLength(500);
            builder.Property(e => e.City).HasMaxLength(500);
            builder.Property(e => e.PostCode).HasMaxLength(500);
            builder.Property(e => e.AdditionalNumber).HasMaxLength(500);
            builder.Property(e => e.RegionName).HasMaxLength(500);
            builder.Property(e => e.IsPrimaryAddress).HasMaxLength(500);
            builder.Property(e => e.UnitNumber).HasMaxLength(500);
            builder.Property(e => e.AdditionalNumber).HasMaxLength(500);
            builder.Property(e => e.Latitude).HasMaxLength(500);
            builder.Property(e => e.Longitude).HasMaxLength(500);
            builder.Property(e => e.CityId).HasMaxLength(500);
            builder.Property(e => e.RegionId).HasMaxLength(500);
            builder.Property(e => e.Restriction).HasMaxLength(500);
            builder.Property(e => e.PKAddressID).HasMaxLength(500);
            builder.Property(e => e.AddressLoction).HasMaxLength(50);
            builder.HasOne(e => e.Driver).WithMany().HasForeignKey(e => e.DriverId);
        }
    }
}
