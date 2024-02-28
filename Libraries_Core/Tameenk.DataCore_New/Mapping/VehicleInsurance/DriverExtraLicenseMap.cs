using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class DriverExtraLicenseMap :IEntityTypeConfiguration<DriverExtraLicense>
    {
        public void Configure(EntityTypeBuilder<DriverExtraLicense> builder)
        {
            builder.ToTable("DriverExtraLicense");
            builder.HasKey(d => d.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
            builder.HasOne(e => e.Driver)
                .WithMany(e => e.DriverExtraLicenses)
                .HasForeignKey(e => e.DriverId);
        }
    }
}
