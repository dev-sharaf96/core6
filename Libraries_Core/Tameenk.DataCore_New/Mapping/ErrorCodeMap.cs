using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class ErrorCodeMap : IEntityTypeConfiguration<ErrorCode>
    {
        public void Configure(EntityTypeBuilder<ErrorCode> builder)
        {
            builder.ToTable("ErrorCode");
            builder.HasKey(e => e.Code);
            builder.Property(e => e.Code).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            builder.Property(e => e.EnglishText).HasMaxLength(50);
            builder.Property(e => e.ArabicText).HasMaxLength(50);
            builder.Property(e => e.EnglishDescription).HasMaxLength(200);
            builder.Property(e => e.ArabicDescription).HasMaxLength(200);
        }
    }
}
