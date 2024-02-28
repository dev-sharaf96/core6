using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.Quotations;

namespace Tameenk.Data.Mapping.Quotations
{
    public class TawuniyaProposalMap :IEntityTypeConfiguration<TawuniyaProposal>
    {
        public void Configure(EntityTypeBuilder<TawuniyaProposal> builder)
        {
            builder.ToTable("TawuniyaProposal");
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }
}
