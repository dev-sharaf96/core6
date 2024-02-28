using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class ProfileNotificationMap :IEntityTypeConfiguration<ProfileNotification>
    {

        public void Configure(EntityTypeBuilder<ProfileNotification> builder)
        {
            builder.ToTable("ProfileNotification");
            builder.HasKey(c => c.Id);
        }
    }
}