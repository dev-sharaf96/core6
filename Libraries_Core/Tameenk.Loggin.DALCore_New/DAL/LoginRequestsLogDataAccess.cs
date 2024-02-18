
using System;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{
    public class LoginRequestsLogDataAccess
    {
        public static bool AddLoginRequestsLog(LoginRequestsLog toSaveLog)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    toSaveLog.CreatedDate = DateTime.Now;
                   // context.LoginRequestsLogs.Add(toSaveLog);
                    context.SaveChanges();
                    return true;
                }
            }
            //catch (DbEntityValidationException dbEx)
            //{
            //    foreach (var validationErrors in dbEx.EntityValidationErrors)
            //    {
            //        foreach (var validationError in validationErrors.ValidationErrors)
            //        {

            //        }
            //    }
            //    return false;
            //}
            catch (Exception exp)
            {
                System.IO.File.WriteAllText(@"C:\inetpub\wwwroot\AdministrationApi\log\db_log2.txt", exp.ToString());
                ErrorLogger.LogError(exp.Message, exp, false);
                return false;
            }

        }

    }
}
