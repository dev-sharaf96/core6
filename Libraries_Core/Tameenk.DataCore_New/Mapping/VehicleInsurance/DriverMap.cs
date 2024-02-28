using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping.VehicleInsurance
{
    public class DriverMap :IEntityTypeConfiguration<Driver>
    {


        public void Configure(EntityTypeBuilder<Driver> builder)
        {
            builder.ToTable("Driver");
            builder.HasKey(d => d.DriverId);

            builder.Property(d => d.DateOfBirthH).HasMaxLength(100);
            builder.Property(d => d.IdIssuePlace).HasMaxLength(50);
            builder.Property(d => d.IdExpiryDate).HasMaxLength(50);

            //Ignore(d => d.Occupation);
            builder.Ignore(d => d.SocialStatus);
            builder.Ignore(d => d.Education);
            builder.Ignore(d => d.MedicalCondition);
            builder.Ignore(d => d.Gender);

            builder.HasMany(e => e.DriverLicenses)
                .WithOne(e => e.Driver)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(e => e.QuotationRequests)
                .WithOne(e => e.Driver)
                .HasForeignKey(e => e.MainDriverId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder.HasMany(e => e.AdditionalDriverQuotationRequests)
            //    .WithMany(e => e.Drivers)
            //    .Map(m => m.ToTable("QuotationRequestAdditionalDrivers").MapLeftKey("AdditionalDriverId").MapRightKey("QuotationRequestId"));

            builder.HasMany(e => e.CheckoutAdditionalDrivers)
                .WithOne(e => e.Driver)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(e => e.CheckoutDetails)
                 .WithOne(e => e.Driver)
                 .HasForeignKey(e => e.MainDriverId);
            builder.HasMany(e => e.Addresses)
                 .WithOne(e => e.Driver)
                 .HasForeignKey(e => e.DriverId);
            builder.HasMany(e => e.DriverViolations)
             .WithOne(e => e.Driver)
             .HasForeignKey(e => e.DriverId);

            builder.HasOne(e => e.City).WithMany().HasForeignKey(e => e.CityId);
            builder.HasOne(e => e.WorkCity).WithMany().HasForeignKey(e => e.WorkCityId);
            //HasOptional<Occupation>(e => e.Occupation).WithMany(x => x.Drivers).HasForeignKey<int?>(e => e.OccupationId);

        }
    }
}