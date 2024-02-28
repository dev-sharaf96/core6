using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class WataniyaMotorPolicyInfoMap :IEntityTypeConfiguration<WataniyaMotorPolicyInfo>
    {

        public void Configure(EntityTypeBuilder<WataniyaMotorPolicyInfo> builder)
        {
            builder.ToTable("WataniyaMotorPolicyInfo");
            builder.HasKey(e => e.Id);
        }
    }
}
