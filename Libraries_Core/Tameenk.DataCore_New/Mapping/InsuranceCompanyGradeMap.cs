using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping
{
    public class InsuranceCompanyGradeMap :IEntityTypeConfiguration<InsuranceCompanyGrade>
        {
        public void Configure(EntityTypeBuilder<InsuranceCompanyGrade> builder)
        {
            builder.ToTable("InsuranceCompanyGrade");
            builder.HasKey(e => e.Id);
        }
    }
}
