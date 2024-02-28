using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class SMSProviderSettingsMap :IEntityTypeConfiguration<SMSProviderSettings>
    {
        public void Configure(EntityTypeBuilder<SMSProviderSettings> builder)
        {
            builder.ToTable("SMSProviderSettings");
            builder.HasKey(e => e.Id);
        }
    }
}
