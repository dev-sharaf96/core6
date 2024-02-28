using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class AdditionalInfoMap:IEntityTypeConfiguration<AdditionalInfo>
    {
        public AdditionalInfoMap()
        {
           
        }

        public void Configure(EntityTypeBuilder<AdditionalInfo> builder)
        {
            builder.ToTable("AdditionalInfo");
            // Property(e => e.CheckoutDetailsId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            builder.HasKey(e => e.ReferenceId);
            //builder.HasOne(e => e.CheckoutDetail).WithOne();
        }
    }
}
