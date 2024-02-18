export class Benfit {
        BenefitId : string;
        BenefitCode: string;
        BenefitNameAr: string;
        BenefitNameEn: string;
        BenefitDescAr: string;
        BenefitDescEn: string;
        BenefitPrice: string;
        IsSelected: boolean;
        IsReadOnly: boolean;
        CoveredCountry: string;
        AveragePremium: string;
        BenefitEffectiveDate: string;
        BenefitExpiryDate: string;
        DeductibleValue: string;
        TaxableAmount:string;
        VATAmount:string;
        constructor(
            BenefitId ?: string,
            BenefitCode?: string,
            BenefitNameAr?: string,
            BenefitNameEn?: string,
            BenefitDescAr?: string,
            BenefitDescEn?: string,
            BenefitPrice?: string,
            IsSelected?: boolean,
            IsReadOnly?: boolean,
            CoveredCountry?: string,
            AveragePremium?: string,
            BenefitEffectiveDate?: string,
            BenefitExpiryDate?: string,
            DeductibleValue?: string,
            TaxableAmount?:string,
            VATAmount?:string

        ) {
          this.BenefitId  = BenefitId  || null;
          this.BenefitCode  = BenefitCode  || null;
          this.BenefitNameAr  = BenefitNameAr  || null;
          this.BenefitNameEn  = BenefitNameEn  || null;
          this.BenefitDescAr  = BenefitDescAr  || null;
          this.BenefitDescEn  = BenefitDescEn  || null;
          this.BenefitPrice  = BenefitPrice  || null;
          this.IsSelected  = IsSelected  || null;
          this.IsReadOnly  = IsReadOnly  || null;
          this.CoveredCountry  = CoveredCountry  || null;
          this.AveragePremium  = AveragePremium  || null;
          this.BenefitEffectiveDate  = BenefitEffectiveDate  || null;
          this.BenefitExpiryDate  = BenefitExpiryDate  || null;
          this.DeductibleValue  = DeductibleValue  || null;
          this.TaxableAmount  = TaxableAmount  || null;
          this.VATAmount  = VATAmount  || null;
       
          
        }
    }
  

