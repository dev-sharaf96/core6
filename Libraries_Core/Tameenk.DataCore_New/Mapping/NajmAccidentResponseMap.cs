using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class NajmAccidentResponseMap :IEntityTypeConfiguration<NajmAccidentResponse>
    {

        public void Configure(EntityTypeBuilder<NajmAccidentResponse> builder)
        {
            builder.ToTable("NajmAccidentResponse");
            builder.HasKey(c => c.Id);
        }
    }
}