using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleBodyTypeMap : IEntityTypeConfiguration<VehicleBodyType>
    {
        public void Configure(EntityTypeBuilder<VehicleBodyType> builder)
        {
            builder.ToTable("VehicleBodyType");
            builder.HasKey(e => e.Code);
            builder.Property(e => e.Code).ValueGeneratedOnAdd();
            builder.Property(e => e.EnglishDescription).HasMaxLength(200);
            builder.Property(e => e.ArabicDescription).HasMaxLength(200);
            builder.HasMany(e => e.Vehicles)
                .WithOne(e => e.VehicleBodyType)
                .HasForeignKey(e => e.VehicleBodyCode)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}