using System;

namespace Tameenk.Loggin.DAL
{
    public class PdfGenerationLogDataAccess
    {
        public static bool AddtoPdfGenerationLog(PdfGenerationLog toSaveLog)
        {
            using (TameenkLog context = new TameenkLog())
            {
                toSaveLog.CreatedDate = DateTime.Now;
                //context.PdfGenerationLogs.Add(toSaveLog);
                context.SaveChanges();
                return true;
            }
        }

    }
}
