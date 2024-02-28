using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Entities.Quotations;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Data.Mapping
{
    public class OccupationMap :IEntityTypeConfiguration<Occupation>
    {
        public void Configure(EntityTypeBuilder<Occupation> builder)
        {
            builder.ToTable("Occupation");
            builder.HasKey(e => e.ID);
            builder.Property(e => e.NameAr).HasMaxLength(200);
            builder.Property(e => e.NameEn).HasMaxLength(200);
            builder.Property(e => e.Code).HasMaxLength(50);
            builder.HasMany<Insured>(g => g.Insureds).WithOne(s => s.Occupation).HasForeignKey(s => s.OccupationId);
            builder.HasMany<Driver>(g => g.Drivers).WithOne(s => s.Occupation).HasForeignKey(s => s.OccupationId);
        }
    }
}
