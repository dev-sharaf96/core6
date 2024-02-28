using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data.Mapping.Payments.Edaat
{
    public class UpdateProfileInfoOtpMap :IEntityTypeConfiguration<UpdateProfileInfoOtp>
    {
        public void Configure(EntityTypeBuilder<UpdateProfileInfoOtp> builder)
        {
            builder.ToTable("UpdateProfileInfoOtp");
            builder.HasKey(e => e.Id);
        }
    }
}
