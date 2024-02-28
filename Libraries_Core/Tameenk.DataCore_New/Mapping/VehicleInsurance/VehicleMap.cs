using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class VehicleMap :IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.HasMany(v => v.QuotationRequests).WithOne(v => v.Vehicle)
                .HasForeignKey(v => v.VehicleId).OnDelete(DeleteBehavior.Restrict);
            builder.Property(v => v.SequenceNumber).HasMaxLength(30);
            builder.Property(v => v.CustomCardNumber).HasMaxLength(30);
            builder.Property(v => v.LicenseExpiryDate).HasMaxLength(20);
            builder.Property(v => v.MajorColor).HasMaxLength(20);
            builder.Property(v => v.MinorColor).HasMaxLength(20);
            builder.Property(v => v.RegisterationPlace).HasMaxLength(20);
            builder.Property(v => v.VehicleMaker).HasMaxLength(50);
            builder.Property(v => v.VehicleModel).IsRequired().HasMaxLength(30);
            builder.Property(v => v.ChassisNumber).HasMaxLength(30);
            builder.Property(v => v.CarPlateText1).HasMaxLength(1);
            builder.Property(v => v.CarPlateText2).HasMaxLength(1);
            builder.Property(v => v.CarPlateText3).HasMaxLength(1);
            builder.Property(v => v.ModificationDetails).HasMaxLength(200);

            builder.Ignore(e => e.EngineSize);
            builder.Ignore(e => e.VehicleUse);
            builder.Ignore(e => e.TransmissionType);
            builder.Ignore(e => e.AxlesWeight);
            builder.Ignore(e => e.ParkingLocation);
            builder.Ignore(e => e.MileageExpectedAnnual);
            builder.Ignore(e => e.VehicleIdType);

            builder.HasMany(e => e.CheckoutDetails)
                .WithOne(e => e.Vehicle)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(e => e.QuotationRequests)
                .WithOne(e => e.Vehicle)
                .OnDelete(DeleteBehavior.Restrict);
            //builder.HasMany(e => e.VehicleSpecifications).WithMany(e => e.Vehicles)
            //    .Map(vs => vs.MapLeftKey("VehicleId")
            //        .MapRightKey("VehicleSpecificationId")
            //        .ToTable("Vehicle_VehicleSpecification")
            //  );

        }
    }
}