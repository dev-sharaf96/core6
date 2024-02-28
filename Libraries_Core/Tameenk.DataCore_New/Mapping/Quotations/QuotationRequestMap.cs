using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
using Tameenk.Core.Domain.Entities.Quotations;

namespace Tameenk.Data.Mapping.Quotations
{
    public class QuotationRequestMap :IEntityTypeConfiguration<QuotationRequest>
    {

        public void Configure(EntityTypeBuilder<QuotationRequest> builder)
        {
            //builder.ToTable("QuotationRequest");
            //builder.Property(p => p.ExternalId).IsRequired().HasMaxLength(50);
            //builder.Property(p => p.UserId).HasMaxLength(128);
            //builder.Property(p => p.NajmNcdRefrence).HasMaxLength(128);
            //builder.HasOne(p => p.Driver).WithMany(d => d.QuotationRequests).HasForeignKey(q => q.MainDriverId);
            //builder.HasMany(e => e.QuotationResponses)
            //    .WithOne(e => e.QuotationRequest)
            //    .HasForeignKey(e => e.RequestId);
            //builder.HasOne(e => e.Insured).WithMany().HasForeignKey(e => e.InsuredId);



            builder.HasKey(qr => qr.ID);

            builder.Property(qr => qr.ExternalId)
                .IsRequired()
                .HasMaxLength(255); // Adjust the maximum length as needed

            builder.Property(qr => qr.MainDriverId)
                .IsRequired();

            builder.Property(qr => qr.CityCode)
                .IsRequired();

            // Configure other properties...

            // Relationships
            builder.HasOne(qr => qr.Driver)
                .WithMany(driver => driver.QuotationRequests)
                .HasForeignKey(qr => qr.MainDriverId)
                .OnDelete(DeleteBehavior.Restrict); // Adjust the delete behavior as needed
            builder.HasOne(qr => qr.Driver)
    .WithMany(driver => driver.QuotationRequests)
    .HasForeignKey(qr => qr.AdditionalDriverIdOne)
    .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(qr => qr.Driver)
    .WithMany(driver => driver.QuotationRequests)
    .HasForeignKey(qr => qr.AdditionalDriverIdTwo)
    .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(qr => qr.Driver)
    .WithMany(driver => driver.QuotationRequests)
    .HasForeignKey(qr => qr.AdditionalDriverIdThree)
    .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(qr => qr.Driver)
    .WithMany(driver => driver.QuotationRequests)
    .HasForeignKey(qr => qr.AdditionalDriverIdFour)
    .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(qr => qr.Vehicle)
                .WithMany(vehicle => vehicle.QuotationRequests)
                .HasForeignKey(qr => qr.VehicleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure other relationships...

            // Add additional validations as needed


            //modelBuilder.Entity<QuotationRequest>()
            //builder.HasMany(qr => qr.Drivers)
            //.WithOne(driver => driver.DriverLicenses)
            //.HasForeignKey(driver => driver.QuotationRequestId);
        }
    }  
}