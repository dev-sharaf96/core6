//using System.ComponentModel.DataAnnotations.Schema;
//using Tameenk.Core.Domain.Entities;

//namespace Tameenk.Data.Mapping
//{
//    public class BankCodeMap :IEntityTypeConfiguration<BankCode>
//    {
//        public BankCodeMap()
//        {
//            ToTable("BankCode");
//            HasKey(e => e.Id);
//            Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
//            Property(e => e.EnglishDescription).HasMaxLength(200);
//            Property(e => e.Code).HasMaxLength(50);
//            Property(e => e.ArabicDescription).HasMaxLength(200);
//        }
//    }
//}
