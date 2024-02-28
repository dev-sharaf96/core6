using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class MorniRequestMap :IEntityTypeConfiguration<MorniRequest>
    {
        public void Configure(EntityTypeBuilder<MorniRequest> builder)
        {
            builder.ToTable("MorniRequest");
            builder.HasKey(e => e.Id);
        }
    }
}
