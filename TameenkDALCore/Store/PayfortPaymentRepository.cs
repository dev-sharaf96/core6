using Tameenk.Core.Domain.Entities;
using static TameenkDAL.YourDbContext;

namespace TameenkDAL.Store
{
    public class PayfortPaymentRepository : GenericRepository<PayfortPaymentRequest, int>
    {
        public PayfortPaymentRepository(YourDbContext context)
            : base(context)
        {

        }
    }
}
