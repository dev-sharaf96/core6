using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class SpeedStabilizerMap:IEntityTypeConfiguration<SpeedStabilizer>
    {
        public void Configure(EntityTypeBuilder<SpeedStabilizer> builder)
        {
            builder.ToTable("SpeedStabilizer");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }
}
