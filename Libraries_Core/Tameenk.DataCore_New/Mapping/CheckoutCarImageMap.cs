using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CheckoutCarImageMap : IEntityTypeConfiguration<CheckoutCarImage>
    {
        public void Configure(EntityTypeBuilder<CheckoutCarImage> builder)
        {
            builder.HasMany(e => e.CheckoutDetails4)
                .WithOne(e => e.ImageRight).IsRequired(false)
                .HasForeignKey(e => e.ImageRightId);
            builder.Property(e => e.ImageData).HasColumnType("image");

            builder.HasMany(e => e.CheckoutDetails)
                .WithOne(e => e.ImageBack).IsRequired(false)
                .HasForeignKey(e => e.ImageBackId);

            builder.HasMany(e => e.CheckoutDetails1)
                .WithOne(e => e.ImageBody).IsRequired(false)
                .HasForeignKey(e => e.ImageBodyId);

            builder.HasMany(e => e.CheckoutDetails2)
                .WithOne(e => e.ImageFront).IsRequired(false)
                .HasForeignKey(e => e.ImageFrontId);

            builder.HasMany(e => e.CheckoutDetails3)
                .WithOne(e => e.ImageLeft).IsRequired(false)
                .HasForeignKey(e => e.ImageLeftId);

            builder.HasMany(e => e.CheckoutDetails4)
               .WithOne(e => e.ImageRight).IsRequired(false)
               .HasForeignKey(e => e.ImageRightId);
        }
    }
}
