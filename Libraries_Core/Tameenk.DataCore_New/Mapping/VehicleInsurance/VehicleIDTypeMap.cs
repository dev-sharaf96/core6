using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleIDTypeMap :IEntityTypeConfiguration<VehicleIDType>
    {
        public void Configure(EntityTypeBuilder<VehicleIDType> builder)
        {
            builder.ToTable("VehicleIDType");
            builder.HasKey(e => e.Code);
            builder.Property(e => e.Code).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            builder.Property(e => e.EnglishDescription).HasMaxLength(200);
            builder.Property(e => e.ArabicDescription).HasMaxLength(200);
        }
    }
}
