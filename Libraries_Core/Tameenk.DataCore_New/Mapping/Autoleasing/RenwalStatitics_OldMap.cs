using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entitie;

namespace Tameenk.Data.Mapping.Autoleasing
{
    class RenwalStatitics_OldMap :IEntityTypeConfiguration<RenwalStatitics_Old>
    {
        public RenwalStatitics_OldMap()
        {

        }

        public void Configure(EntityTypeBuilder<RenwalStatitics_Old> builder)
        {
            builder.ToTable("RenwalStatitics_Old");
            builder.HasKey(c => c.Id);
        }
    }
}
