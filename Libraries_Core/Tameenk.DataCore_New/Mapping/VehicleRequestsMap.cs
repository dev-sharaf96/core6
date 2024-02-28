using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class VehicleRequestsMap :IEntityTypeConfiguration<VehicleRequests>
    {

        public void Configure(EntityTypeBuilder<VehicleRequests> builder)
        {
            builder.ToTable("VehicleRequests");
            builder.HasKey(c => c.ID);
        }
    }
}
