using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class InvoiceMap :IEntityTypeConfiguration<Invoice>
    {
        public InvoiceMap()
        {
        }

        public void Configure(EntityTypeBuilder<Invoice> builder)
        {

            builder.ToTable("Invoice");
            builder.HasKey(e => e.Id);
            builder.HasIndex(e => e.InvoiceNo).IsUnique();
            builder.Property(e => e.UserId).IsRequired().HasMaxLength(128);
            builder.Property(e => e.ReferenceId).HasMaxLength(200);
            builder.Property(e => e.ProductPrice)
               .HasPrecision(8, 2);
            builder.Property(e => e.Fees)
                .HasPrecision(8, 2);
            builder.Property(e => e.Vat)
                .HasPrecision(8, 2);

            builder.Property(e => e.SubTotalPrice)
                .HasPrecision(8, 2);

            builder.Property(e => e.TotalPrice)
                .HasPrecision(8, 2);

            builder.HasOne(e => e.InvoiceFile)
                .WithOne(e => e.Invoice).HasForeignKey<InvoiceFile>(d=> d.Id);
            builder.HasOne(e => e.InsuranceCompany).WithMany(e => e.Invoices).HasForeignKey(e => e.InsuranceCompanyId);
        }
    }
}
