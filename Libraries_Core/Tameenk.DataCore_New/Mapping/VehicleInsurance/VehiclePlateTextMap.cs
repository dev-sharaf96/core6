using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehiclePlateTextMap :IEntityTypeConfiguration<VehiclePlateText>
    {
        public void Configure(EntityTypeBuilder<VehiclePlateText> builder)
        {
            builder.ToTable("VehiclePlateText");
            builder.HasKey(e => e.Code);
            builder.Property(e => e.Code).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            builder.Property(e => e.EnglishDescription).HasMaxLength(50);
            builder.Property(e => e.ArabicDescription).HasMaxLength(50);
        }
    }
}
