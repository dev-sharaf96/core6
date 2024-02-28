namespace Tameenk.Loggin.DAL
{
    public class PromotionRequestLogDataAccess
    {
        public static bool AddPromotionRequestsLog(PromotionRequestLog toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                //toSaveLog.CreatedDate = DateTime.Now;
                //context.PromotionRequestLogs.Add(toSaveLog);
                context.SaveChanges();
                return true;
            }
        }
    }
}
