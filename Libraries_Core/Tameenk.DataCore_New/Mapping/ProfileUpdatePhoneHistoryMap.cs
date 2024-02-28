using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.Payments.Edaat
{
    public class ProfileUpdatePhoneHistoryMap :IEntityTypeConfiguration<ProfileUpdatePhoneHistory>
    {
        public void Configure(EntityTypeBuilder<ProfileUpdatePhoneHistory> builder)
        {
            builder.ToTable("ProfileUpdatePhoneHistory");
            builder.HasKey(e => e.Id);
        }
    }
}
