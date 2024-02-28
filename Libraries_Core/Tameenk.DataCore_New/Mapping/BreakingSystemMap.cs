using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class BreakingSystemMap : IEntityTypeConfiguration<BreakingSystem>
    {
        public void Configure(EntityTypeBuilder<BreakingSystem> builder)
        {
            builder.ToTable("BreakingSystem");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
