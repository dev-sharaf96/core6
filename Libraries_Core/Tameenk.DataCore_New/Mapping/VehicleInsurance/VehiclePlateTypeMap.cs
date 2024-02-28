using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehiclePlateTypeMap :IEntityTypeConfiguration<VehiclePlateType>
    {
        public VehiclePlateTypeMap() {

        }

        public void Configure(EntityTypeBuilder<VehiclePlateType> builder)
        {
            builder.ToTable("VehiclePlateType");
            builder.HasKey(vp => vp.Code);
            builder.Property(vp => vp.Code).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            builder.Property(vp => vp.EnglishDescription).HasMaxLength(200);
            builder.Property(vp => vp.ArabicDescription).HasMaxLength(200);

            builder.HasMany(e => e.Vehicles)
                .WithOne(e => e.VehiclePlateType)
                .HasForeignKey(e => e.PlateTypeCode)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}