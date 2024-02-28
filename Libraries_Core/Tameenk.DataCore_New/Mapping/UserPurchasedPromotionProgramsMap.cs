using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities.PromotionPrograms;

namespace Tameenk.Data.Mapping
{
    public class UserPurchasedPromotionProgramsMap :IEntityTypeConfiguration<UserPurchasedPromotionPrograms>
    {


        public void Configure(EntityTypeBuilder<UserPurchasedPromotionPrograms> builder)
        {
            builder.ToTable("UserPurchasedPromotionPrograms");
            builder.HasKey(e => e.Id);
            //builder.HasKey(e => e.Id);//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }
}
