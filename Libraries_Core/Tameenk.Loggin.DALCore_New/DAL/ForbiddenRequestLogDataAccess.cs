﻿using System;

namespace Tameenk.Loggin.DAL
{
    public class ForbiddenRequestLogDataAccess
    {
        public static bool AddForbiddenRequestLog(ForbiddenRequestLog toSaveLog)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    toSaveLog.CreatedDate = DateTime.Now;
                   // context.ForbiddenRequestLogs.Add(toSaveLog);
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
            catch (Exception exc)
            {
                return false;
            }
        }

    }
}
