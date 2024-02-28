using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class OtpInfoMap :IEntityTypeConfiguration<OtpInfo>
    {
        public OtpInfoMap()
        {
            
        }

        public void Configure(EntityTypeBuilder<OtpInfo> builder)
        {
            builder.ToTable("OtpInfo");
            builder.HasKey(c => c.Id);
        }
    }
}
