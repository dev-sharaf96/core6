using System;

namespace Tameenk.Loggin.DAL
{
    public class PolicyNotificationLogDataAccess
    {
        public static bool AddtoPolicyNotificationLogs(PolicyNotificationLog toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                toSaveLog.CreatedDate = DateTime.Now;
                // context.PolicyNotificationLogs.Add(toSaveLog);
                context.SaveChanges();
                return true;
            }
        }
    }
}
