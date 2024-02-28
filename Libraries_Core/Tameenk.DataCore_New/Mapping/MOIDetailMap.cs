using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class MOIDetailMap :IEntityTypeConfiguration<MOIDetail>
    {

        public void Configure(EntityTypeBuilder<MOIDetail> builder)
        {
            builder.ToTable("MOIDetail");
            builder.HasKey(c => c.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }
}