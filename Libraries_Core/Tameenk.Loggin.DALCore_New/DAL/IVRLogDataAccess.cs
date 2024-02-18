﻿using System;
 

namespace Tameenk.Loggin.DAL
{
    public class IVRLogDataAccess
    {
        public static bool AddToIVRLogDataAccess(IVRServicesLog toSaveLog)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    toSaveLog.CreatedDate = DateTime.Now;
                   // context.IVRServicesLogs.Add(toSaveLog);
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
