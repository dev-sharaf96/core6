﻿using System.Data.Entity.Validation;

namespace Tameenk.Loggin.DAL
{
    public class WhatsAppLogsDataAccess
    {
        public static bool AddToWhatsAppLogsDataAccess(WhatsAppLog toSaveLog)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    //toSaveLog.CreatedDate = DateTime.Now;
                    //context.WhatsAppLogs.Add(toSaveLog);
                    //context.SaveChanges();
                    return true;
                }
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {

                    }
                }
                return false;
            }
        }
    }
}
