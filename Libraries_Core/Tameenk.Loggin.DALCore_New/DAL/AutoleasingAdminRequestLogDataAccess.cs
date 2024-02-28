using System;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{
    public class AutoleasingAdminRequestLogDataAccess
    {
        public static bool AddtoServiceRequestLogs(AutoleasingAdminRequestLog log)
        {

            using (TameenkLog context = new TameenkLog())
            {
                //context.Database.CommandTimeout = 30;
                //log.CreatedDate = DateTime.Now;

                //context.AutoleasingAdminRequestLogs.Add(log);
                context.SaveChanges();
                return true;
            }
        }
    }
}
