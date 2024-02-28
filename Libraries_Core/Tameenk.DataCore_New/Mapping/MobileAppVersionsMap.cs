using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class MobileAppVersionsMap :IEntityTypeConfiguration<MobileAppVersions>
    {
        public MobileAppVersionsMap() {
              
            
        }

        void IEntityTypeConfiguration<MobileAppVersions>.Configure(EntityTypeBuilder<MobileAppVersions> builder)
        {
            builder.ToTable("MobileAppVersions");
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Version).HasMaxLength(20);
        }
    }
}