using System;

namespace Tameenk.Loggin.DAL
{

    public class UserTicketLogDataAccess
    {
        public static bool AddUserTicketLog(UserTicketLog userTicketLog)
        {
            using (TameenkLog context = new TameenkLog())
            {

                userTicketLog.CreatedDate = DateTime.Now;
                // context.UserTicketLogs.Add(userTicketLog);
                context.SaveChanges();
                return true;
            }

        }

    }
}
