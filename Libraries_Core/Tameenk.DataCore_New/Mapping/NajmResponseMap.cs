using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class NajmResponseMap :IEntityTypeConfiguration<NajmResponseEntity>
    {
        public NajmResponseMap() {
             }

        public void Configure(EntityTypeBuilder<NajmResponseEntity> builder)
        {
            builder.ToTable("NajmResponse");
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            builder.Property(c => c.PolicyHolderNin).HasMaxLength(20);
            builder.Property(c => c.VehicleId).HasMaxLength(30);
            builder.Property(c => c.NCDReference).HasMaxLength(50);
        }
    }
}