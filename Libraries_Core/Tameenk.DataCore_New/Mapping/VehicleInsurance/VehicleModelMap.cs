using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleModelMap :IEntityTypeConfiguration<VehicleModel>
    {
        public void Configure(EntityTypeBuilder<VehicleModel> builder)
        {
            builder.ToTable("VehicleModel");
            builder.HasKey(e => new { e.Code, e.VehicleMakerCode });
            builder.Property(e => e.Code).HasColumnOrder(0).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            builder.Property(e => e.VehicleMakerCode).HasColumnOrder(1).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            builder.Property(e => e.EnglishDescription).HasMaxLength(50);
            builder.Property(e => e.ArabicDescription).HasMaxLength(50);
        }
    }
}
