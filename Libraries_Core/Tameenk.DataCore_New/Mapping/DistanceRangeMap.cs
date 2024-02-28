using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class DistanceRangeMap : IEntityTypeConfiguration<DistanceRange>
    {
        public DistanceRangeMap()
        {

        }

        public void Configure(EntityTypeBuilder<DistanceRange> builder)
        {
            builder.ToTable("DistanceRange");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
