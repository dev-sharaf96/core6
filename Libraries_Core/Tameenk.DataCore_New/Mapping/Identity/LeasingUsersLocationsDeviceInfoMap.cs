using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class LeasingUsersLocationsDeviceInfoMap :IEntityTypeConfiguration<LeasingUsersLocationsDeviceInfo>
    {
        public void Configure(EntityTypeBuilder<LeasingUsersLocationsDeviceInfo> builder)
        {
            builder.ToTable("LeasingUsersLocationsDeviceInfo");
            builder.HasKey(e => e.Id);
        }
    }
}
