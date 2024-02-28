using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class CareerMap :IEntityTypeConfiguration<Career>
    {

        public void Configure(EntityTypeBuilder<Career> builder)
        {
            builder.ToTable("Career");
            builder.HasKey(e => e.Id);
        }
    }
}
