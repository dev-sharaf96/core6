using System;

namespace Tameenk.Loggin.DAL
{
    public class LoginRequestsLogDataAccess
    {
        public static bool AddLoginRequestsLog(LoginRequestsLog toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                toSaveLog.CreatedDate = DateTime.Now;
                // context.LoginRequestsLogs.Add(toSaveLog);
                context.SaveChanges();
                return true;
            }
        }

    }
}
