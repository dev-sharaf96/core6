using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Policies;

namespace Tameenk.Data.Mapping.Policies
{
    public class CancellationRequestMap :IEntityTypeConfiguration<CancellationRequest>

    {
        public void Configure(EntityTypeBuilder<CancellationRequest> builder)
        {
            builder.ToTable("CancellationRequest");
            builder.HasKey(e => e.Id);
        }
    }
}
