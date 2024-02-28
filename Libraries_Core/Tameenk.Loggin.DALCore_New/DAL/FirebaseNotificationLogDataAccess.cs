using System;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{

    public class FirebaseNotificationLogDataAccess
    {
        public static bool AddToFirebaseNotificationLog(FirebaseNotificationLog log)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {

                    log.CreatedDate = DateTime.Now;
                    //context.FirebaseNotificationLogs.Add(log);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }

        }
        public static FirebaseNotificationLog GetFromFirebaseNotificationByRefernceId(string refernceId,string method)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {

                    //var notification = (from d in context.FirebaseNotificationLogs
                    //              where d.ReferenceId == refernceId &&d.ErrorCode==0&&d.MethodName== method
                    //                    orderby d.ID descending
                    //              select d).FirstOrDefault();
                    //return notification;
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
