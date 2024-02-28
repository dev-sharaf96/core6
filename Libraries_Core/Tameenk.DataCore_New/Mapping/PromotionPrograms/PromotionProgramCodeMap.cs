//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using System.ComponentModel.DataAnnotations.Schema;
//using Tameenk.Core.Domain.Entities.PromotionPrograms;

//namespace Tameenk.Data.Mapping.PromotionPrograms
//{
//    public class PromotionProgramCodeMap :IEntityTypeConfiguration<PromotionProgramCode>
//    {

//        public void Configure(EntityTypeBuilder<PromotionProgramCode> builder)
//        {
//            builder.ToTable("PromotionProgramCode");
//            builder.HasKey(e => e.Id);
//            builder.Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
//            builder.HasRequired(e => e.ProductType).WithMany().HasForeignKey(e => e.InsuranceTypeCode);
//            builder.HasRequired(e => e.InsuranceCompany).WithMany().HasForeignKey(e => e.InsuranceCompanyId);
//            builder.HasOptional(code => code.Creator).WithMany().HasForeignKey(usr => usr.CreatorId);
//            builder.HasOptional(code => code.Modifier).WithMany().HasForeignKey(usr => usr.ModifierId);
//        }
//    }
//}
