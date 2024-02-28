using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CountryMap :IEntityTypeConfiguration<Country>
    {


        public void Configure(EntityTypeBuilder<Country> builder)
        {
            builder.ToTable("Country");
            builder.HasKey(e => e.Code);
            builder.Property(e => e.Code).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            builder.Property(e => e.EnglishDescription).HasMaxLength(256);
            builder.Property(e => e.ArabicDescription).HasMaxLength(256);
        }
    }
}
