using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleSpecificationMap :IEntityTypeConfiguration<VehicleSpecification>
    {
        public VehicleSpecificationMap()
        {

        }

        public void Configure(EntityTypeBuilder<VehicleSpecification> builder)
        {
            builder.ToTable("VehicleSpecification");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            builder.Property(e => e.DescriptionAr).HasMaxLength(100);
            builder.Property(e => e.DescriptionEn).HasMaxLength(100);
        }
    }
}
