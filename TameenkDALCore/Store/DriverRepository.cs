using Microsoft.EntityFrameworkCore;
using Tameenk.Core.Domain.Entities.VehicleInsurance;
using static TameenkDAL.YourDbContext;

namespace TameenkDAL.Store
{
    public class DriverRepository : GenericRepository<Driver, Guid>
    {
        public DriverRepository(YourDbContext context)
            : base(context)
        {

        }

        public Driver GetDriverInfoByNIN(string nin)
        {
            return DbSet
                .Include(d => d.DriverLicenses)
                .Where(d => d.NIN == nin && !d.IsDeleted)
                .FirstOrDefault();
        }
    }
}