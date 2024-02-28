using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class InsuredAddressesCountMap :IEntityTypeConfiguration<InsuredAddressesCount>
    {
        public void Configure(EntityTypeBuilder<InsuredAddressesCount> builder)
        {
            builder.ToTable("InsuredAddressesCount");
            builder.HasKey(e => e.Id);
        }
    }
}
