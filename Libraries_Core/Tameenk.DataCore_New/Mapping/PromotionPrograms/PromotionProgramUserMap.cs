//using System.ComponentModel.DataAnnotations.Schema;
//using Tameenk.Core.Domain.Entities.PromotionPrograms;

//namespace Tameenk.Data.Mapping.PromotionPrograms
//{
//    public class PromotionProgramUserMap :IEntityTypeConfiguration<PromotionProgramUser>
//    {
//        public PromotionProgramUserMap()
//        {
//            ToTable("PromotionProgramUser");
//            HasKey(e => e.Id);
//            Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

//            HasRequired(e => e.User).WithMany().HasForeignKey(e => e.UserId);
//        }
//    }
//}
