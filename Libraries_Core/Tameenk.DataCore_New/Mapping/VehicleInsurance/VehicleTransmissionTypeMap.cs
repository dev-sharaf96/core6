using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleTransmissionTypeMap :IEntityTypeConfiguration<VehicleTransmissionType>
    {
        public VehicleTransmissionTypeMap()
        {

        }

        public void Configure(EntityTypeBuilder<VehicleTransmissionType> builder)
        {
            builder.ToTable("VehicleTransmissionType");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
