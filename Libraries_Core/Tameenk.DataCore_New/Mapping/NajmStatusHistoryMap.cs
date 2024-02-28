using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class NajmStatusHistoryMap :IEntityTypeConfiguration<NajmStatusHistory>
    {
        public void Configure(EntityTypeBuilder<NajmStatusHistory> builder)
        {
            builder.ToTable("NajmStatusHistory");
            builder.Property(e => e.ReferenceId).IsRequired().HasMaxLength(50);
            builder.Property(e => e.PolicyNo).IsRequired().HasMaxLength(50);
            builder.Property(e => e.StatusDescription).HasMaxLength(2000);
            builder.Property(e => e.UploadedReference).HasMaxLength(50);
        }
    }
}
