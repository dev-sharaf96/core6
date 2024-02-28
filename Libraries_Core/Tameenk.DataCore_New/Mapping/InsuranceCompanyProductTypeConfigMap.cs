using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class InsuranceCompanyProductTypeConfigMap :IEntityTypeConfiguration<InsuranceCompanyProductTypeConfig>
    {
        public void Configure(EntityTypeBuilder<InsuranceCompanyProductTypeConfig> builder)
        {

            builder.ToTable("InsuranceCompanyProductTypeConfig");
            builder.HasKey(e => e.ProductTypeCode);
            builder.Property(e => e.ProductTypeCode).HasColumnOrder(0);
            builder.Property(e => e.ProductTypeCode).ValueGeneratedOnAdd();// HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            builder.HasKey(e => e.InsuranceCompanyID);
            builder.Property(e => e.InsuranceCompanyID).HasColumnOrder(1);
            builder.Property(e => e.InsuranceCompanyID).ValueGeneratedOnAdd();//.HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
        }
    }
}
