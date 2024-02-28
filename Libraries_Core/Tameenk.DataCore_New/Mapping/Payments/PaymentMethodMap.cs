using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Tameenk.Core.Domain.Entities.Payments;

namespace Tameenk.Data.Mapping.Payments
{
    public class PaymentMethodMap :IEntityTypeConfiguration<PaymentMethod>
    {
        public PaymentMethodMap()
        {

        }

        public void Configure(EntityTypeBuilder<PaymentMethod> builder)
        {
            builder.ToTable("PaymentMethod");
            builder.HasKey(e => e.Id);
            builder.Ignore(e => e.PaymentMethodCode);
        }
    }
}
