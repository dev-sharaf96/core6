using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class PolicyDetailMap :IEntityTypeConfiguration<PolicyDetail>
    {
        public void Configure(EntityTypeBuilder<PolicyDetail> builder)
        {
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }
}
