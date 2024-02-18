
export class WareefBenefitDetails {
    benefitDescriptionAr: string;
    benefitDescriptionEn:string;
    isDeleted: boolean;
      constructor(
        benefitDescriptionAr?: string,
        benefitDescriptionEn?: string,
        isDeleted?: boolean
      ) {
        this.benefitDescriptionAr = benefitDescriptionAr || null;
        this.benefitDescriptionEn = benefitDescriptionEn || null;
        this.isDeleted = isDeleted ||null;
      }
    }