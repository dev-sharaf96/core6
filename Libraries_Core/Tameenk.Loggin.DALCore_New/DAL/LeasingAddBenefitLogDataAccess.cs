using System;
using Tameenk.Common.Utilities;
using Tameenk.Loggin.DAL.Entities;

namespace Tameenk.Loggin.DAL.DAL
{
    public class LeasingAddBenefitLogDataAccess
    {
        public static bool AddtoServiceRequestLogs(LeasingAddBenefitLog log)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    //context.Database.CommandTimeout = 30;
                    log.CreatedDate = DateTime.Now;

                    //context.LeasingAddBenefitLog.Add(log);
                    context.SaveChanges();
                    return true;
                }
            }
           
            catch (Exception exp)
            {
                System.IO.File.WriteAllText(@"C:\inetpub\wwwroot\AdministrationApi\log\db_log2.txt", exp.ToString());
                ErrorLogger.LogError(exp.Message, exp, false);
                return false;

            }
        }
    }
}
