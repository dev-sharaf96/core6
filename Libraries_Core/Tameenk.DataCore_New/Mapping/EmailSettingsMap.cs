using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class EmailSettingsMap : IEntityTypeConfiguration<EmailSettings>
    {
        public void Configure(EntityTypeBuilder<EmailSettings> builder)
        {
            builder.ToTable("EmailSettings");
            builder.HasKey(e => e.Id);
        }
    }
}
