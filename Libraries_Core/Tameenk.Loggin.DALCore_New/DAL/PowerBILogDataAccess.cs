
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
            //catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            //{
            //    foreach (var validationErrors in dbEx.EntityValidationErrors)
            //    {
            //        foreach (var validationError in validationErrors.ValidationErrors)
            //        {

            //        }
            //    }
            //    return false;
            //}

            catch (Exception dbEx)
            {
                return false;
            }
        }
    }
}