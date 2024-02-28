using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class DriverViolationMap :IEntityTypeConfiguration<DriverViolation>
    {
        public void Configure(EntityTypeBuilder<DriverViolation> builder)
        {
            builder.ToTable("DriverViolation");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            builder.HasOne(e => e.Driver).WithMany(e => e.DriverViolations).HasForeignKey(e => e.DriverId);
        }
    }
}
