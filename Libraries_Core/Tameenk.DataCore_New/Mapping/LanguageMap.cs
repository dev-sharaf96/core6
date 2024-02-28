using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class LanguageMap :IEntityTypeConfiguration<Language>
    {
        public void Configure(EntityTypeBuilder<Language> builder)
        {
            builder.ToTable("Language");
            builder.Property(e => e.NameAR).IsRequired().HasMaxLength(50);
            builder.Property(e => e.NameEN).IsRequired().HasMaxLength(50);

            builder.HasMany(e => e.AspNetUsers)
                .WithOne(e => e.Language)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
