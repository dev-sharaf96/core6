using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities;

namespace Tameenk.Data
{
    public class LoginSwitchAccountMap :IEntityTypeConfiguration<LoginSwitchAccount>
    {
        public LoginSwitchAccountMap()
        {
           
        }

        public void Configure(EntityTypeBuilder<LoginSwitchAccount> builder)
        {
            builder.ToTable("LoginSwitchAccount");
            builder.HasKey(c => c.Id);
        }
    }
}
