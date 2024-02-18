export class DiscountDetail {
  BenefitDescriptionAr: string;
  BenefitDescriptionEn: string;
    DescountId: number;
    constructor(
        BenefitDescriptionAr?: string,
        BenefitDescriptionEn?: string,
        DescountId?: number
    ) {
      this.BenefitDescriptionAr = BenefitDescriptionAr || null;
      this.BenefitDescriptionEn = BenefitDescriptionEn ||null;
      this.DescountId = DescountId ||null
    }
}
