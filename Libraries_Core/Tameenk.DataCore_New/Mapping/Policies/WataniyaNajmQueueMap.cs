using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Policies;

namespace Tameenk.Data.Mapping.Policies
{
    public class WataniyaNajmQueueMap :IEntityTypeConfiguration<WataniyaNajmQueue>

    {


        public void Configure(EntityTypeBuilder<WataniyaNajmQueue> builder)
        {
            builder.ToTable("WataniyaNajmQueue");
            builder.HasKey(e => e.Id);
        }
    }
}
