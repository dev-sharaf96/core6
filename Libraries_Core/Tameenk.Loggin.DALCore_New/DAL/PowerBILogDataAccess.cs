using System;

namespace Tameenk.Loggin.DAL
{
    public class PowerBILogDataAccess
    {
        public static bool AddToPowerBILogDataAccess(PowerBIServicesLog toSaveLog)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    toSaveLog.CreatedDate = DateTime.Now;
                    //context.PowerBIServicesLogs.Add(toSaveLog);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
    }
