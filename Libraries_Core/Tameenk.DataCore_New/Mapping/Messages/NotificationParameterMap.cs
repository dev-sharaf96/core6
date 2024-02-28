using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Messages;

namespace Tameenk.Data.Mapping.Messages
{
    public class NotificationParameterMap :IEntityTypeConfiguration<NotificationParameter>
    {
        public void Configure(EntityTypeBuilder<NotificationParameter> builder)
        {
            builder.ToTable("NotificationParameter");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).HasMaxLength(256).IsRequired();
            builder.Property(e => e.Value).IsRequired();
            builder.HasOne(e => e.Notification).WithMany(e => e.Parameters).HasForeignKey(e => e.NotificationId);
        }
    }
}
