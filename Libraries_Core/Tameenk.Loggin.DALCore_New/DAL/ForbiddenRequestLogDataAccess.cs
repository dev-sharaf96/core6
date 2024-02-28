using System;

namespace Tameenk.Loggin.DAL
{
    public class ForbiddenRequestLogDataAccess
    {
        public static bool AddForbiddenRequestLog(ForbiddenRequestLog toSaveLog)
        {

                using (TameenkLog context = new TameenkLog())
                {
                    toSaveLog.CreatedDate = DateTime.Now;
                   // context.ForbiddenRequestLogs.Add(toSaveLog);
                    context.SaveChanges();
                    return true;
                }

            
        }

    }
}
