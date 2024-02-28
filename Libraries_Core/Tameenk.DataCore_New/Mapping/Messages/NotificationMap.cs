using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Messages;

namespace Tameenk.Data.Mapping
{
    /// <summary>
    /// Represent the EF mapping for notification entity
    /// </summary>
    public class NotificationMap :IEntityTypeConfiguration<Notification>
    {


        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.ToTable("Notification");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Group).HasMaxLength(256).IsRequired();
            builder.Property(e => e.GroupReferenceId).HasMaxLength(256).IsRequired();
            builder.Property(e => e.TypeId).IsRequired();
            builder.Property(e => e.StatusId).IsRequired();
            builder.Ignore(e => e.Status);
            builder.Ignore(e => e.Type);
        }
    }
}
