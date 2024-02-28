using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Identity;

namespace Tameenk.Data.Mapping.Identity
{
    public class ClientMap :IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.ToTable("Clients");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Secret).IsRequired();
            builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
            builder.Property(e => e.AllowedOrigin).HasMaxLength(100);
            builder.Property(e => e.AuthServerUrl).HasMaxLength(100);
            builder.Property(e => e.RedirectUrl).HasMaxLength(100);
        }
    }
}