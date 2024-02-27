using System;
using System.Linq;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Entities.Policies;
using Tameenk.Services.Core.Policies;
using System.Data;

namespace Tameenk.Services.Implementation.Policies
{
    public class WataniyaNajmQueueService : IWataniyaNajmQueueService
    {
        private readonly IRepository<WataniyaNajmQueue> _wataniyaNamQueueRepository;
        private readonly IRepository<CheckoutDetail> _checkoutDetailRepository;
        public WataniyaNajmQueueService(IRepository<WataniyaNajmQueue> wataniyaNajmQueueRepository, IRepository<CheckoutDetail> checkoutDetailRepository)
        {
            _wataniyaNamQueueRepository = wataniyaNajmQueueRepository;
            _checkoutDetailRepository = checkoutDetailRepository;
        }
        //public List<WataniyaNajmQueue> GetFromWataniyaNajmQueue(out string exception)
        //{
        //    IDbContext idbContext = (IDbContext)EngineContext.Current.Resolve<IDbContext>();
        //    exception = string.Empty;
        //    try
        //    {
        //        idbContext.DatabaseInstance.CommandTimeout = new int?(60);
        //        var command = idbContext.DatabaseInstance.Connection.CreateCommand();
        //        command.CommandText = "GetWataniyaNajmProcessingQueue";
        //        command.CommandType = CommandType.StoredProcedure;
        //        idbContext.DatabaseInstance.Connection.Open();
        //        var reader = command.ExecuteReader();
        //        var result = ((IObjectContextAdapter)idbContext).ObjectContext.Translate<WataniyaNajmQueue>(reader).ToList();
        //        idbContext.DatabaseInstance.Connection.Close();
        //        return result;
              
        //    }
        //    catch (Exception ex)
        //    {
        //        idbContext.DatabaseInstance.Connection.Close();
        //        exception = ex.ToString();
        //        return null;
        //    }
        //}

        public bool GetAndUpdateWataniyaNajmQueue(int id, WataniyaNajmQueue policy, string serverIP, out string exception)
        {
            try
            {
                exception = string.Empty;
                var processQueue = _wataniyaNamQueueRepository.Table.FirstOrDefault(a => a.Id == id && a.ProcessedOn == null);
                if (processQueue == null)
                {
                    return false;
                }
                processQueue.ProcessedOn = policy.ProcessedOn;
                if (!string.IsNullOrEmpty(policy.ErrorDescription))
                {
                    processQueue.ErrorDescription = policy.ErrorDescription;
                }
                processQueue.ProcessingTries = (policy.ProcessingTries.HasValue) ? (policy.ProcessingTries + 1) : 1;
                processQueue.IsLocked = false;
                processQueue.ServerIP = serverIP;
                processQueue.ModifiedDate = DateTime.Now;
                processQueue.ServiceResponseTimeInSeconds = policy.ServiceResponseTimeInSeconds;
                processQueue.ErrorCode = policy.ErrorCode;
                if (!string.IsNullOrEmpty(policy.ServiceRequest))
                {
                    processQueue.ServiceRequest = policy.ServiceRequest;
                }
                if (!string.IsNullOrEmpty(policy.ServiceResponse))
                {
                    processQueue.ServiceResponse = policy.ServiceResponse;
                }
                _wataniyaNamQueueRepository.UpdateAsync(processQueue);
                return true;
            }
            catch (Exception exp)
            {
                exception = exp.ToString();
                var processQueue = _wataniyaNamQueueRepository.Table.Where(a => a.Id == id && a.IsLocked == true).FirstOrDefault();
                if (processQueue != null)
                {
                    processQueue.ModifiedDate = DateTime.Now;
                    processQueue.IsLocked = false;
                    _wataniyaNamQueueRepository.UpdateAsync(processQueue);
                }

                return false;
            }
        }

        public bool AddWataniyaNajmQueue(string policyNo,string referenceId, out string exception)
        {
            exception = string.Empty;
            try
            {
                var checkoutDetail = _checkoutDetailRepository.TableNoTracking.Where(x => x.ReferenceId == referenceId).FirstOrDefault();
                if (checkoutDetail == null)
                {
                    exception = "checkoutDetail is null";
                    return false;
                }
                else
                {

                    WataniyaNajmQueue najmQueue = new WataniyaNajmQueue();
                    najmQueue.CompanyID = checkoutDetail?.InsuranceCompanyId;
                    najmQueue.CompanyName = checkoutDetail?.InsuranceCompanyName;
                    najmQueue.Channel = checkoutDetail?.Channel;
                    najmQueue.CreatedDate = DateTime.Now;
                    najmQueue.InsuranceTypeCode = checkoutDetail?.SelectedInsuranceTypeCode;
                    najmQueue.PolicyReferenceNo = checkoutDetail?.ReferenceId;
                    najmQueue.InsuranceTypeCode = checkoutDetail?.SelectedInsuranceTypeCode;
                    najmQueue.VehicleId = checkoutDetail.VehicleId;
                    najmQueue.PolicyNo = policyNo;
                    _wataniyaNamQueueRepository.Insert(najmQueue);
                    return true;
                }
            }
            catch (Exception exp)
            {
                exception = exp.ToString();
                return false;
            }
        }
    }
}
