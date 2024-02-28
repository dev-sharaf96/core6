using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleMakerMap :IEntityTypeConfiguration<VehicleMaker>
    {
 

        public void Configure(EntityTypeBuilder<VehicleMaker> builder)
        {
            builder.ToTable("VehicleMaker");
                builder.HasKey(vm => vm.Code);
            builder.Property(vm => vm.Code).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
                builder.Property(vm => vm.EnglishDescription).HasMaxLength(50);
                builder.Property(vm => vm.ArabicDescription).HasMaxLength(50);

            builder.HasMany(e => e.VehicleModels)
                    .WithOne(e => e.VehicleMaker)
                    .OnDelete(DeleteBehavior.Restrict);
        }
        }
}