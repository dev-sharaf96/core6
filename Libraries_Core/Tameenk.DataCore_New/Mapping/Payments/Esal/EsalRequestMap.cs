//using Tameenk.Core.Domain.Entities.Payments.Esal;

//namespace Tameenk.Data.Mapping.Payments.Esal
//{
//    public class EsalRequestMap:IEntityTypeConfiguration<EsalRequest>
//    {
//        public EsalRequestMap()
//        {
//            ToTable("EsalRequest");
//            HasKey(e => e.Id);
//            Property(e => e.TotalBeforeVAT)
//                .HasPrecision(18, 2);
//            Property(e => e.TotalVAT)
//                .HasPrecision(18, 2);
//            Property(e => e.GrandTotal)
//                .HasPrecision(18, 2);
//            Property(e => e.AdvanceAmount)
//                .HasPrecision(18, 2);
//            Property(e => e.OutstandingAmount)
//                .HasPrecision(18, 2);

//        }
//    }
//}
