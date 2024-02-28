using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleUsagePercentageMap :IEntityTypeConfiguration<VehicleUsagePercentage>
    {
        public VehicleUsagePercentageMap()
        {

        }

        public void Configure(EntityTypeBuilder<VehicleUsagePercentage> builder)
        {
            builder.ToTable("VehicleUsagePercentage");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
