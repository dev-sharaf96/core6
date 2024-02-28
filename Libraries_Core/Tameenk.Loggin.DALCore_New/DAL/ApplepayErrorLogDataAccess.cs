using System;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{
    public class ApplepayErrorLogDataAccess
    {
        public static bool AddtoApplepayErrorLogs(ApplepayErrorLog log)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    //context.Database.CommandTimeout = 30;
                    log.CreatedDate = DateTime.Now;

                    //context.ApplepayErrorLogs.Add(log);
                    context.SaveChanges();
                    return true;
                }
            }
            
            catch (Exception exp)
            {
                ErrorLogger.LogError(exp.Message, exp, false);
                return false;

            }
        }
    }
    
}
