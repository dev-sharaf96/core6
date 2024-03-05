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
               // case 1: return _serviceProvider.GetService<wafa>();
                case 2: 
                    return _serviceProvider.GetService<ACIGInsuranceProvider>();
                case 3:
                    return _serviceProvider.GetService<SolidarityInsuranceProvider>();
                case 4:
                    return _serviceProvider.GetService<AICCInsuranceProvider>();
                case 5:
                    return _serviceProvider.GetService<TUICInsuranceProvider>();
                //case 6: return _serviceProvider.GetService<Sagr>();
                case 7:
                    return _serviceProvider.GetService<WalaInsuranceProvider>();
                case 8: 
                    return _serviceProvider.GetService<MedGulfInsuranceProvider>();
                case 9:
                    return _serviceProvider.GetService<ArabianShieldInsuranceProvider>();
                //case 10: return _serviceProvider.GetService<Ahlia>();
                case 11: return _serviceProvider.GetService<GGIInsuranceProvider>();
                case 12: return _serviceProvider.GetService<TawuniyaInsuranceProvider>();
                case 13 : return _serviceProvider.GetService<SalamaInsuranceProvider>();
                case  14: return _serviceProvider.GetService<WataniyaInsuranceProvider>();
                case  15: return _serviceProvider.GetService<BCAREInsuranceProvider>();
                case 17 : return _serviceProvider.GetService<UCAInsuranceProvider>();
                case 18 : return _serviceProvider.GetService<AlalamiyaInsuranceProvider>();
               ////// case  19: return _serviceProvider.GetService<GulfUnion>();
                case 20 : return _serviceProvider.GetService<AlRajhiInsuranceProvider>();
                case 21 : return _serviceProvider.GetService<SAICOInsuranceProvider>();
                case 22 : return _serviceProvider.GetService<MalathInsuranceProvider>();
               ///// case 23 : return _serviceProvider.GetService<TokioMarine>();
                case 24 : return _serviceProvider.GetService<AllianzInsuranceProvider>();
                case 25 : return _serviceProvider.GetService<AXAInsuranceProvider>();
                case 26 : return _serviceProvider.GetService<AmanaInsuranceProvider>();
                //case 27: return _serviceProvider.GetService<BurujInsuranceProvider>();
                default: return null;
            }
        }

    }

    public interface IProvidersServiceLocator
    {
        IInsuranceProvider GetProviderHttpService(int insuarceCompanyId);
    }
}
//InsuranceCompanyID NamespaceTypeName	isActive	Key
//1	    Tameenk.Integration.Providers.Wafa	0	Wafa
//2	    Tameenk.Integration.Providers.ACIG	1	ACIG
//3	    Tameenk.Integration.Providers.Solidarity	1	Solidarity
//4	    Tameenk.Integration.Providers.AICC	1	AICC
//5	    Tameenk.Integration.Providers.TUIC	1	TUIC
//6	    Tameenk.Integration.Providers.Saqr	1	Sagr
//7	    Tameenk.Integration.Providers.Wala	1	Walaa
//8	    Tameenk.Integration.Providers.MedGulf	1	MedGulf
//9	    Tameenk.Integration.Providers.ArabianShield	1	ArabianShield
//10	Tameenk.Integration.Providers.Ahlia	1	Ahlia
//11	Tameenk.Integration.Providers.GGI	1	GGI
//12	Tameenk.Integration.Providers.Tawuniya	1	Tawuniya
//13	Tameenk.Integration.Providers.Salama	1	Salama
//14	Tameenk.Integration.Providers.Wataniya	1	Wataniya
//15	Tameenk.Integration.Providers.BCARE	1	BCARE
//17	Tameenk.Integration.Providers.UCA	1	UCA
//18	Tameenk.Integration.Providers.Alalamiya	1	Alalamiya
//19	Tameenk.Integration.Providers.GulfUnion	1	GulfUnion
//20	Tameenk.Integration.Providers.AlRajhi	1	AlRajhi
//21	Tameenk.Integration.Providers.SAICO	1	SAICO
//22	Tameenk.Integration.Providers.Malath	1	Malath
//23	Tameenk.Integration.Providers.TokioMarine	1	TokioMarine
//24	Tameenk.Integration.Providers.Allianz	1	Allianz
//25	Tameenk.Integration.Providers.AXA	1	AXA
//26	Tameenk.Integration.Providers.Amana	1	Amana
//27	Tameenk.Integration.Providers.Buruj	1	Buruj