using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class TawuniyaTempTableMap :IEntityTypeConfiguration<TawuniyaTempTable>
    {
        public TawuniyaTempTableMap()
        {

        }

        public void Configure(EntityTypeBuilder<TawuniyaTempTable> builder)
        {
            builder.ToTable("TawuniyaTempTable");
            builder.HasKey(x => x.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
