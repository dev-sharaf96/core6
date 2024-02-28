using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class SettingMap :IEntityTypeConfiguration<Setting>
    {
        public SettingMap()
        {
            //Property(e => e.MaxNumberOfPolicies).(256);
            //Property(e => e.ArabicDescription).HasMaxLength(256);
        }

        public void Configure(EntityTypeBuilder<Setting> builder)
        {
            builder.ToTable("Setting");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();

        }
    }
}
