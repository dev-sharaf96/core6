using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Tameenk.Core.Domain.Entities
{

    public class CompanyBankAccountsMap :IEntityTypeConfiguration<CompanyBankAccounts>
    {



        public void Configure(EntityTypeBuilder<CompanyBankAccounts> builder)
        {
            builder.ToTable("CompanyBankAccounts");
            builder.HasKey(e => e.Id);
        }
    }
}
