using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Tameenk.Core.Configuration;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities.Policies;
using Tameenk.Integration.Core.Providers;
using Tameenk.Integration.Core.Providers.Configuration;
using Tameenk.Integration.Dto.Providers;
using Tameenk.Loggin.DAL;
using Tameenk.Services;
using Tameenk.Services.Logging;

namespace Tameenk.Integration.Providers.BCARE
{
    /// <summary>
    /// This company is a fake company that return quotation with 1 SR
    /// </summary>
    public class BCAREInsuranceProvider : RestfulInsuranceProvider
    {
        #region Fields
        private readonly IBcareInsuranceCompanyConfig _CompanyConfig;
        private readonly IQuotationConfig _quotationConfig;

        #endregion

        #region Ctor
        public BCAREInsuranceProvider(IQuotationConfig quotationConfig,IBcareInsuranceCompanyConfig companyConfig,IRepository<PolicyProcessingQueue> policyProcessingQueueRepository)
     : base(quotationConfig,new RestfulConfiguration
     {
        ProviderName = "BCARE"
     },policyProcessingQueueRepository)
        {
            _CompanyConfig = companyConfig;
        }

        #endregion

        #region Methods



        protected override async Task<object> ExecuteQuotationRequest(QuotationServiceRequest quotation, ServiceRequestLog predefinedLogInfo)
        {
            try
            {
                HttpResponseMessage message = new HttpResponseMessage();
                message.StatusCode = System.Net.HttpStatusCode.OK;
                string responseData = string.Empty;
                //Only return a response if the user NIN : 1000353498 Seq: 529607110
                if ((quotation.InsuredId == _CompanyConfig.NIN 
                    && quotation.VehicleChassisNumber == "SALGA2EF7GA271462"
                    ) ||(quotation.InsuredId== 1072118639 && quotation.VehicleChassisNumber== "JTEBU11F88K048251"))
                {
                    const string nameOfFile = ".TestData.quotationTestData.json";
                    responseData = ReadResource(GetType().Namespace, nameOfFile);
                }
                message.Content = new StringContent(responseData);
                return message;
            }
            catch (Exception ex)
            {
                //_logger.Log($"BCAREInsuranceProvider -> ExecuteQuotationRequest - (Provider name: {Configuration.ProviderName})", ex);
            }

            return null;
        }

        protected override object ExecutePolicyRequest(PolicyRequest policy, ServiceRequestLog predefinedLogInfo)
        {
            try
            {
                const string nameOfFile = ".TestData.policyTestData.json";
                string responseData = ReadResource(GetType().Namespace, nameOfFile);
                HttpResponseMessage message = new HttpResponseMessage();
                message.Content = new StringContent(responseData);
                message.StatusCode = System.Net.HttpStatusCode.OK;
                return message;
            }
            catch (Exception ex)
            {
                //_logger.Log($"BCAREInsuranceProvider -> ExecutePolicyRequest - {Configuration.ProviderName}", ex);
            }

            return null;
        }

        #endregion

    }
}
