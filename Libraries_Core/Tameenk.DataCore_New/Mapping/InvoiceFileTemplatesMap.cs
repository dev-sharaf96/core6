using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class InvoiceFileTemplatesMap :IEntityTypeConfiguration<InvoiceFileTemplates>
    {
        public void Configure(EntityTypeBuilder<InvoiceFileTemplates> builder)
        {
            builder.ToTable("InvoiceFileTemplates");
            builder.HasKey(e => e.Id);
        }
    }
}
