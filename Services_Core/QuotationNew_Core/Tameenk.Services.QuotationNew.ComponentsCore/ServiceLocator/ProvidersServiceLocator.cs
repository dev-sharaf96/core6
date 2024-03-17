using Microsoft.Extensions.DependencyInjection;
using Tameenk.Integration.Core.Providers;
using Tameenk.Integration.Providers.ACIG;
using Tameenk.Integration.Providers.AICC;
using Tameenk.Integration.Providers.Alalamiya;
using Tameenk.Integration.Providers.Allianz;
using Tameenk.Integration.Providers.AlRajhi;
using Tameenk.Integration.Providers.Amana;
using Tameenk.Integration.Providers.ArabianShield;
using Tameenk.Integration.Providers.AXA;
using Tameenk.Integration.Providers.BCARE;
using Tameenk.Integration.Providers.GGI;
using Tameenk.Integration.Providers.Malath;
using Tameenk.Integration.Providers.MedGulf;
using Tameenk.Integration.Providers.SAICO;
using Tameenk.Integration.Providers.Salama;
using Tameenk.Integration.Providers.Solidarity;
using Tameenk.Integration.Providers.Tawuniya;
using Tameenk.Integration.Providers.TUIC;
using Tameenk.Integration.Providers.UCA;
using Tameenk.Integration.Providers.Wala;
using Tameenk.Integration.Providers.Buruj;
using Tameenk.Integration.Providers.Wataniya;

namespace Tameenk.Integration.DtoCore.ServiceLocator
{
    public class ProvidersServiceLocator : IProvidersServiceLocator
    {
        private readonly IServiceProvider _serviceProvider;

        public ProvidersServiceLocator(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IInsuranceProvider GetProviderHttpService(int insuarceCompanyId)
        {
            switch (insuarceCompanyId)
            {
              //case 1: return _serviceProvider.GetService<wafa>(); //Not used 
                case 2: 
                    return _serviceProvider.GetService<ACIGInsuranceProvider>();
                case 3:
                    return _serviceProvider.GetService<SolidarityInsuranceProvider>();
                case 4:
                    return _serviceProvider.GetService<AICCInsuranceProvider>();
                case 5:
                    return _serviceProvider.GetService<TUICInsuranceProvider>();
              //case 6: return _serviceProvider.GetService<Sagr>(); //link with Co. not correct
                case 7:
                    return _serviceProvider.GetService<WalaInsuranceProvider>();
                case 8: 
                    return _serviceProvider.GetService<MedGulfInsuranceProvider>(); //Soup
                case 9:
                    return _serviceProvider.GetService<ArabianShieldInsuranceProvider>();
              //case 10: return _serviceProvider.GetService<Ahlia>(); //Not used 
                case 11: return _serviceProvider.GetService<GGIInsuranceProvider>();
                case 12: return _serviceProvider.GetService<TawuniyaInsuranceProvider>();
                case 13 : return _serviceProvider.GetService<SalamaInsuranceProvider>();
                case 14: return _serviceProvider.GetService<WataniyaInsuranceProvider>();
                case 15: return _serviceProvider.GetService<BCAREInsuranceProvider>();
                case 17 : return _serviceProvider.GetService<UCAInsuranceProvider>();
                case 18 : return _serviceProvider.GetService<AlalamiyaInsuranceProvider>();
         ////// case  19: return _serviceProvider.GetService<GulfUnion>(); //Project Not here   
                case 20 : return _serviceProvider.GetService<AlRajhiInsuranceProvider>();
                case 21 : return _serviceProvider.GetService<SAICOInsuranceProvider>();
                case 22 : return _serviceProvider.GetService<MalathInsuranceProvider>();
          ///// case 23 : return _serviceProvider.GetService<TokioMarine>();  //Project Not here
                case 24 : return _serviceProvider.GetService<AllianzInsuranceProvider>();
                case 25 : return _serviceProvider.GetService<AXAInsuranceProvider>();
                case 26 : return _serviceProvider.GetService<AmanaInsuranceProvider>();
                case 27: return _serviceProvider.GetService<BurujInsuranceProvider>();
                default: return null;
            }
        }

    }

    public interface IProvidersServiceLocator
    {
        IInsuranceProvider GetProviderHttpService(int insuarceCompanyId);
    }
}