using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class ContactMap :IEntityTypeConfiguration<Contact>
    {


        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.ToTable("Contact");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.MobileNumber).HasMaxLength(50);
            builder.Property(e => e.HomePhone).HasMaxLength(50);
            builder.Property(e => e.Fax).HasMaxLength(50);
            builder.Property(e => e.Email).HasMaxLength(50);
        }
    }
}
