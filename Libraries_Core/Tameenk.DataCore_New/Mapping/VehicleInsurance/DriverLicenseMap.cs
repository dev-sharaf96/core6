using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class DriverLicenseMap :IEntityTypeConfiguration<DriverLicense>
    {

        public void Configure(EntityTypeBuilder<DriverLicense> builder)
        {
            builder.ToTable("DriverLicense");
            builder.HasKey(e => e.LicenseId);
            builder.Property(e => e.ExpiryDateH).HasMaxLength(20);
        }
    }
}
