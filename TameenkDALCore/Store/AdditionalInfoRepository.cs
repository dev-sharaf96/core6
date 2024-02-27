using Tameenk.Core.Domain.Entities;
using static TameenkDAL.YourDbContext;

namespace TameenkDAL.Store
{
    public class AdditionalInfoRepository : GenericRepository<AdditionalInfo, string>
    {
        public AdditionalInfoRepository(YourDbContext context)
           : base(context)
        {
        }

        public void Save(AdditionalInfo additionalInfo)
        {
            DbSet.Add(additionalInfo);

        }
    }
}
