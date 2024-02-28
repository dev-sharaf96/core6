using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class DrivingLicenceYearMap:IEntityTypeConfiguration<DrivingLicenceYear>
    {
        public void Configure(EntityTypeBuilder<DrivingLicenceYear> builder)
        {
            builder.ToTable("DrivingLicenceYear");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }
}
