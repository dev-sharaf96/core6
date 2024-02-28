namespace Tameenk.Loggin.DAL
{
    public class RegistrationRequestsLogDataAccess
    {
        public static bool AddRegistrationRequestsLog(RegistrationRequestsLog toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                //toSaveLog.CreatedDate = DateTime.Now;
                //context.RegistrationRequestsLogs.Add(toSaveLog);
                context.SaveChanges();
                return true;
            }
        }

    }
}
