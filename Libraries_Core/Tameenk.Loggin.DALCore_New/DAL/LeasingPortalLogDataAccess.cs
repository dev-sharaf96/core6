using System;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{
    public class LeasingPortalLogDataAccess
    {
        public static bool AddtoServiceRequestLogs(LeasingPortalLog log)
        {
            using (TameenkLog context = new TameenkLog())
            {
                //context.Database.CommandTimeout = 30;
                log.CreatedDate = DateTime.Now;

                // context.LeasingPortalLog.Add(log);
                context.SaveChanges();
                return true;
            }
        }
    }
}
