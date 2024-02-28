using System;

namespace Tameenk.Loggin.DAL
{

    public class PolicyModificationLogDataAccess
    {

        /// <summary>
        /// Add Add Driver Log to tameenkLog context.
        /// </summary>
        /// <param name="quotationRequestLog"></param>
        /// <returns></returns>   
        public static bool AddPolicyModificationLog(PolicyModificationLog log)
        {
            using (TameenkLog context = new TameenkLog())
            {

                log.CreatedDate = DateTime.Now;
                //context.PolicyModificationLogs.Add(log);
                context.SaveChanges();
                return true;
            }

        }
    
    }
}
