//using System.ComponentModel.DataAnnotations.Schema;
//using Tameenk.Core.Domain.Entities;

//namespace Tameenk.Data.Mapping
//{
//    public class AutomatedTestIntegrationTransactionMap :IEntityTypeConfiguration<AutomatedTestIntegrationTransaction>
//    {
//        public AutomatedTestIntegrationTransactionMap()
//        {
//            ToTable("AutomatedTestIntegrationTransaction");
//            HasKey(e => e.Id);
//            Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
//            Property(e => e.Message).HasMaxLength(200);
//        }
//    }
//}
