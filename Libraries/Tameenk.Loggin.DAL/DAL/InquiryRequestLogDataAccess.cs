﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tameenk.Common.Utilities;

namespace Tameenk.Loggin.DAL
{
   public class InquiryRequestLogDataAccess
    {

        public static bool AddInquiryRequestLog(InquiryRequestLog inquiryRequestLog)
        {
            try
            {
                using (TameenkLog context = new TameenkLog())
                {

                    inquiryRequestLog.CreatedDate = DateTime.Now;
                    context.InquiryRequestLogs.Add(inquiryRequestLog);
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
        }
        public static List<InquiryRequestLog> GetAllInquiryRequestLogBasedOnFilter(string connectionString, RequestLogFilter requestLogFilter, out int total, int pageIndex = 0, int pageSize = int.MaxValue, string sortField = "Id", bool? sortOrder = false)

                if (string.IsNullOrEmpty(connectionString))

                    if (requestLogFilter.Channel != null)
                    {
                        var stringChannel = (Channel)requestLogFilter.Channel;
                        query = query.Where(q => q.Channel.Equals(stringChannel.ToString()));
                    }

                    if (requestLogFilter.StartDate == null && requestLogFilter.EndDate == null
                      && string.IsNullOrEmpty(requestLogFilter.ExternalId) && string.IsNullOrEmpty(requestLogFilter.NIN)
                       && string.IsNullOrEmpty(requestLogFilter.VehicleId) && requestLogFilter.Channel == null)
                    {
                        DateTime dtEnd = new DateTime(DateTime.Now.Date.Year, DateTime.Now.Date.Month, DateTime.Now.Date.Day, 23, 59, 59);
                        query = query.Where(e => e.CreatedDate >= dtStart && e.CreatedDate <= dtEnd);
                    }

                if (string.IsNullOrEmpty(connectionString))
    }
}