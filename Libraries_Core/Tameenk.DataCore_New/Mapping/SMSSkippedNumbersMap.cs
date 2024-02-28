using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class SMSSkippedNumbersMap :IEntityTypeConfiguration<SMSSkippedNumbers>
    {
        public void Configure(EntityTypeBuilder<SMSSkippedNumbers> builder)
        {
            builder.ToTable("SMSSkippedNumbers");
            builder.HasKey(e => e.Id);
        }
    }
}
