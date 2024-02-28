using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class InvoiceFileMap :IEntityTypeConfiguration<InvoiceFile>
    {
        public void Configure(EntityTypeBuilder<InvoiceFile> builder)
        {
            builder.ToTable("InvoiceFile");
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
            builder.Property(e => e.InvoiceData).HasColumnType("image");
        }
    }
}
