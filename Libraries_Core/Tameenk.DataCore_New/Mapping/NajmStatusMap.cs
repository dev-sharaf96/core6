using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class NajmStatusMap :IEntityTypeConfiguration<NajmStatus>
    {

        public void Configure(EntityTypeBuilder<NajmStatus> builder)
        {
            builder.ToTable("NajmStatus");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
            builder.Property(e => e.NameAr).IsRequired().HasMaxLength(200);
            builder.Property(e => e.NameEn).IsRequired().HasMaxLength(200);
            builder.Property(e => e.Code).IsRequired().HasMaxLength(50);



            builder.HasMany<Policy>(g => g.Policies)
                .WithOne(s => s.NajmStatusObj).HasForeignKey(s => s.NajmStatusId);
        }
    }


   
}
