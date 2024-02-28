using Tameenk.Core.Domain.Entities.Payments.RiyadBank;

using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tameenk.Data.Mapping
{
    public class HyperpayRequestMap :IEntityTypeConfiguration<HyperpayRequest>
    {
        public void Configure(EntityTypeBuilder<HyperpayRequest> builder)
        {
            builder.ToTable("HyperpayRequest");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
   
            builder.Property(e => e.Amount)
                .HasPrecision(10, 4);
        }
    }


    public class HyperpayResponseMap :IEntityTypeConfiguration<HyperpayResponse>
    {
     
        public void Configure(EntityTypeBuilder<HyperpayResponse> builder)
        {
            builder.ToTable("HyperpayResponse");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            builder.Property(e => e.Amount)
                .HasPrecision(10, 4);
        }
    }
}
