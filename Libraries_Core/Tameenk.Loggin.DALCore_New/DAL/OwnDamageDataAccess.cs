using System;

namespace Tameenk.Loggin.DAL
{
    public class OwnDamageDataAccess
    {
        public static bool AddToOwnDamageSMSLog(OwnDamageSMSLog toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                toSaveLog.CreatedDate = DateTime.Now;
                // context.OwnDamageSMSLogs.Add(toSaveLog);
                context.SaveChanges();
                return true;
            }
        }
    }
}
