export class DiscountDescription {
    Id: number;
    DescountId: number;
    BenefitDescriptionAr: string;
    BenefitDescriptionEn: string;
    IsDeleted: boolean;

    constructor(
      Id?: number,
      DescountId?: number,
      BenefitDescriptionAr?: string,
      BenefitDescriptionEn?: string,
      IsDeleted?: boolean,
    ) {
      this.Id = Id ||0 ;
      this.DescountId = DescountId ||0 ;
      this.BenefitDescriptionAr = BenefitDescriptionAr ||"";
      this.BenefitDescriptionEn = BenefitDescriptionEn ||"";
      this.IsDeleted = IsDeleted || false;
    }
  }
