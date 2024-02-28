﻿using System;
using System.Collections.Generic;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{
    public class EmailLogsDataAccess
    {
        public static bool AddToEmailLogsDataAccess(EmailLog toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                toSaveLog.CreatedDate = DateTime.Now;
                //context.EmailLogs.Add(toSaveLog);
                context.SaveChanges();
                return true;
            }
        }

        public static List<EmailLog> GetFromEmailNotification(string email, string ReferenceId)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    //var info = (from d in context.EmailLogs
                    //            where d.ReferenceId == ReferenceId
                    //               && d.Email.Contains(email)
                    //               && d.ErrorCode == 1
                    //            select d).ToList();
                    //return info;
                    return null;
                }
            }
            catch (Exception exp)
            {
                ErrorLogger.LogError(exp.Message, exp, false);
                return null;

            }
        }
    }
}
