using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PolicyFileMap :IEntityTypeConfiguration<PolicyFile>
    {
        public void Configure(EntityTypeBuilder<PolicyFile> builder)
        {
            builder.ToTable("PolicyFile");
            builder.Property(e => e.PolicyFileByte).HasColumnType("image");
        }
    }
}
