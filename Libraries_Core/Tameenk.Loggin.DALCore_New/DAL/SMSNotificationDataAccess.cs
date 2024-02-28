using System;
using System.Collections.Generic;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{
    public class SMSNotificationDataAccess
    {
        public static bool AddToSMSNotification(SMSNotification toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                //toSaveLog.CreatedDate = DateTime.Now;
                //context.SMSNotifications.Add(toSaveLog);
                //context.SaveChanges();
                return true;
            }
        }
        public static List<SMSNotification> GetFromMSNotification(string mobileNumber,string vehicleId, int notificationNo,string ReferenceId)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {
                    //var info = (from d in context.SMSNotifications
                    //              where d.MobileNumber == mobileNumber&&(d.SequenceNumber== vehicleId || d.CustomCard== vehicleId)
                    //              &&d.NotificationNo==notificationNo&&d.ReferenceId==ReferenceId
                    //              &&(d.ErrorCode==0|| d.ErrorCode == 6 || d.ErrorCode == 7|| d.ErrorCode == 8)
                    //              select d).ToList();
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
