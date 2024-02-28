using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class IbanHistoryMap :IEntityTypeConfiguration<IbanHistory>
    {
        public void Configure(EntityTypeBuilder<IbanHistory> builder)
        {
            builder.ToTable("IbanHistory");
            builder.HasKey(e => e.Id);
        }
    }
}
