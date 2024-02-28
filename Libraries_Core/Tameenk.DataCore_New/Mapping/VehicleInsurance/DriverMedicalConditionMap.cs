using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class DriverMedicalConditionMap : IEntityTypeConfiguration<DriverMedicalCondition>
    {
        public void Configure(EntityTypeBuilder<DriverMedicalCondition> builder)
        {

            builder.ToTable("DriverMedicalCondition");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }
}
