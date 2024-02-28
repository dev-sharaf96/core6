using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.Identity
{
    public class AspNetUserMap : IEntityTypeConfiguration<AspNetUser>
    {
        public void Configure(EntityTypeBuilder<AspNetUser> builder)
        {
            builder.ToTable("AspNetUsers");
            builder.HasKey(e => e.Id);
            builder.Property(u => u.Email).HasMaxLength(256);
            builder.Property(u => u.UserName).IsRequired().HasMaxLength(256);
            builder.HasMany(e => e.CheckoutDetails)
                .WithOne(e => e.AspNetUser)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(e => e.Invoices)
                .WithOne(e => e.AspNetUser)
                .HasForeignKey(e => e.UserId).OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(e => e.QuotationRequests)
                .WithOne(e => e.AspNetUser)
                .HasForeignKey(e => e.UserId);
        }
    }
}