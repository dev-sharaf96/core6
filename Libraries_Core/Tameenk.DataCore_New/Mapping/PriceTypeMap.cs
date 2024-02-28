using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PriceTypeMap :IEntityTypeConfiguration<PriceType>
    {
        public PriceTypeMap()
        {


        }

        public void Configure(EntityTypeBuilder<PriceType> builder)
        {
            builder.ToTable("PriceType");
            builder.HasKey(e => e.Code);
            builder.Property(e => e.Code).ValueGeneratedOnAdd();
            builder.Property(e => e.EnglishDescription).HasMaxLength(200);
            builder.Property(e => e.ArabicDescription).HasMaxLength(200);
            builder.HasMany(e => e.PriceDetails).WithOne(e => e.PriceType).OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(e => e.PriceDetails)
                .WithOne(e => e.PriceType)
               .OnDelete(DeleteBehavior.Restrict);
        }
    }
}