using System;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{
    public class LeasingAddDriverLogDataAccess
    {
        public static bool AddtoServiceRequestLogs(LeasingAddDriverLog log)
        {
            using (TameenkLog context = new TameenkLog())
            {
                //context.Database.CommandTimeout = 30;
                log.CreatedDate = DateTime.Now;

                // context.LeasingAddDriverLog.Add(log);
                context.SaveChanges();
                return true;
            }

        }
    }
}
