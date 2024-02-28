//using System.ComponentModel.DataAnnotations.Schema;
//using Tameenk.Core.Domain.Entities.PromotionPrograms;

//namespace Tameenk.Data.Mapping.PromotionPrograms
//{
//    public class PromotionProgramDomainMap:IEntityTypeConfiguration<PromotionProgramDomain>
//    {
//        public PromotionProgramDomainMap()
//        {
//            ToTable("PromotionProgramDomain");
//            HasKey(e => e.Id);
//            Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

//            HasRequired(e => e.PromotionProgram);

//        }
//    }
//}
