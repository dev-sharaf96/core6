using Tameenk.Core.Domain.Entities;
using static TameenkDAL.YourDbContext;

namespace TameenkDAL.Store
{
    public class TawuniyaRepository : GenericRepository<TawuniyaTempTable, int>
    {
        public TawuniyaRepository(YourDbContext context)
         : base(context)
        {
        }
    }
}
