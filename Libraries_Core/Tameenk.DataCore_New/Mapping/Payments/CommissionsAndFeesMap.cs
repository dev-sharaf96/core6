using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tameenk.Core.Domain.Entities
{

    public class CommissionsAndFeesMap :IEntityTypeConfiguration<CommissionsAndFees>
    {
        public CommissionsAndFeesMap()
        {

        }

        public void Configure(EntityTypeBuilder<CommissionsAndFees> builder)
        {
            builder.ToTable("CommissionsAndFees");
            builder.HasKey(e => e.Id);
        }
    }
}
