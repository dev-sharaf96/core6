using Tameenk.Core.Configuration;
using Tameenk.Core.Data;
using Tameenk.Integration.Core.Providers;
using Tameenk.Integration.Core.Providers.Configuration;
using Tameenk.Integration.Dto.Providers;
using Tameenk.Services.Logging;
using Tameenk.Core.Domain.Entities.Policies;
using System.Net.Http;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Tameenk.Services;

namespace Tameenk.Integration.Providers.AXA
{
    public class AXAInsuranceProvider : RestfulInsuranceProvider
    {
        private readonly IQuotationConfig _quotationConfig;
        public AXAInsuranceProvider(IQuotationConfig quotationConfig, IRepository<PolicyProcessingQueue> policyProcessingQueueRepository)
             : base(quotationConfig,new RestfulConfiguration
             {
                 //GenerateQuotationUrl = "https://axa-leasing-uat.axa-cic.com/gateway/axaAggregators/1.0/tameenkservice/api/Tameenk/Quotation",
                 //GeneratePolicyUrl = "https://axa-leasing-uat.axa-cic.com/gateway/axaAggregators/1.0/tameenkservice/api/Tameenk/Policy",
                 GenerateQuotationUrl = "https://integration.gig.sa/gateway/motorAggregator/2.0/tameenkservice/api/Tameenk/Quotation",
                 GeneratePolicyUrl = "https://integration.gig.sa/gateway/motorAggregator/2.0/tameenkservice/api/Tameenk/Policy",
                 AccessToken = "gig_agg_tam:ueix6m1l22bn_",
                 ProviderName = "AXA"
             }, policyProcessingQueueRepository)
        {
        }

        protected override QuotationServiceRequest HandleQuotationRequestObjectMapping(QuotationServiceRequest quotation)
        {
            if (quotation.VehicleEngineSizeCode == 0)
                quotation.VehicleEngineSizeCode = 1;

            return quotation;
        }

        protected override QuotationServiceResponse GetQuotationResponseObject(object response, QuotationServiceRequest request)
        {
            QuotationServiceResponse responseValue = new QuotationServiceResponse();
            string result = string.Empty;

            result = ((HttpResponseMessage)response).Content.ReadAsStringAsync().Result;
            responseValue = JsonConvert.DeserializeObject<QuotationServiceResponse>(result);
            if (responseValue != null && responseValue.Products != null)
            {
                foreach (var product in responseValue.Products)
                {
                    if (product != null && product.Benefits != null)
                    {
                        foreach (var benefit in product.Benefits)
                        {
                            if (benefit.BenefitPrice == 0)// added as per waleed 
                            {
                                benefit.IsReadOnly = true;
                                benefit.IsSelected = true;
                            }
                        }
                    }
                }
            }

            return responseValue;
        }
    }
}
