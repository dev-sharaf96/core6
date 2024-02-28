using System;

namespace Tameenk.Loggin.DAL
{
    public class ProfileRequestsLogDataAccess
    {
        public static bool AddProfileRequestsLog(ProfileRequestsLog toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                toSaveLog.CreatedDate = DateTime.Now;
                //context.ProfileRequestsLogs.Add(toSaveLog);
                context.SaveChanges();
                return true;
            }
        }

    }
}
