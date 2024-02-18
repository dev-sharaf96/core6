﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tameenk.Common.Utilities;
using System.Linq.Dynamic;
namespace Tameenk.Loggin.DAL
{
    public class CheckoutRequestLogDataAccess
    {
        public static bool AddCheckoutRequestLog(CheckoutRequestLog checkoutRequestLog)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {

                    context.Database.CommandTimeout = 30;
                    checkoutRequestLog.CreatedDate = DateTime.Now;
                    context.CheckoutRequestLogs.Add(checkoutRequestLog);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {

                    }
                }
                return false;
            }
            catch (Exception ex)
                return false;
            }
        }
        public static List<CheckoutRequestLog> GetAllCheckoutRequestLogBasedOnFilter(string connectionString, RequestLogFilter requestLogFilter, out int total, int pageIndex = 0, int pageSize = int.MaxValue, string sortField = "Id", bool? sortOrder = false)

                if (string.IsNullOrEmpty(connectionString))
                            // DateTime dtEnd = serviceRequestFilter.EndDate.Value.AddHours(23).AddMinutes(59).AddSeconds(59);
                            query = query.Where(e => e.CreatedDate >= dtStart && e.CreatedDate <= dtEnd);

                    if (!string.IsNullOrEmpty(requestLogFilter.MethodName))

                    if (requestLogFilter.StartDate == null && requestLogFilter.EndDate == null
                        && string.IsNullOrEmpty(requestLogFilter.ReferenceId) && string.IsNullOrEmpty(requestLogFilter.NIN)
                         && string.IsNullOrEmpty(requestLogFilter.VehicleId))
                    {
                        DateTime dtEnd = new DateTime(DateTime.Now.Date.Year, DateTime.Now.Date.Month, DateTime.Now.Date.Day, 23, 59, 59);
                        query = query.Where(e => e.CreatedDate >= dtStart && e.CreatedDate <= dtEnd);
                    }

                if (string.IsNullOrEmpty(connectionString))
                                 where d.Id == Id
                                 select d).FirstOrDefault();
    }
}