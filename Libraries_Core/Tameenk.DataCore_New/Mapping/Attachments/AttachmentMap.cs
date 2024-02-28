using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.Attachments
{
    public class AttachmentMap :IEntityTypeConfiguration<Attachment>
    {


        public void Configure(EntityTypeBuilder<Attachment> builder)
        {
            builder.ToTable("Attachment");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
               
            builder.Property(e => e.AttachmentFile).IsRequired();
            builder.Property(e => e.AttachmentType).IsRequired();
            builder.Property(e => e.AttachmentName).IsRequired();
            builder.Property(e => e.Guid).IsRequired();
            builder.HasMany(e => e.PolicyUpdateRequestAttachments); 
        }
    }
}
