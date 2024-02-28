using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Quotations;

namespace Tameenk.Data.Mapping.Quotations
{
    public class InsuredMap :IEntityTypeConfiguration<Insured>
    {
        public InsuredMap()
        {
            

            //HasOptional<Occupation>(e => e.Occupation).WithMany(x => x.Insureds).HasForeignKey<int?>(e => e.OccupationId);
        }

        public void Configure(EntityTypeBuilder<Insured> builder)
        {
            builder.ToTable("Insured");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.NationalId).IsRequired().HasMaxLength(20);
            builder.Property(e => e.CardIdTypeId).IsRequired();
            builder.Property(e => e.BirthDate).IsRequired();
            builder.Property(e => e.BirthDateH).HasMaxLength(10);
            builder.Property(e => e.NationalityCode).HasMaxLength(4);
            builder.Property(e => e.FirstNameAr).IsRequired().HasMaxLength(500);
            builder.Property(e => e.MiddleNameAr).HasMaxLength(50);
            builder.Property(e => e.LastNameAr).IsRequired().HasMaxLength(50);
            builder.Property(e => e.FirstNameEn).IsRequired().HasMaxLength(500);
            builder.Property(e => e.MiddleNameEn).HasMaxLength(50);
            builder.Property(e => e.LastNameEn).IsRequired().HasMaxLength(50);
            builder.Property(e => e.ResidentOccupation).HasMaxLength(50);

            builder.Ignore(e => e.Education);
            //Ignore(e => e.Occupation);
            builder.Ignore(e => e.SocialStatus);
            builder.Ignore(e => e.CardIdType);
            builder.Ignore(e => e.Gender);
            builder.HasOne(e => e.IdIssueCity).WithMany().HasForeignKey(e => e.IdIssueCityId);
            builder.HasOne(e => e.WorkCity).WithMany().HasForeignKey(e => e.WorkCityId);
            builder.HasOne(e => e.City).WithMany().HasForeignKey(e => e.CityId);
        }
    }
}
