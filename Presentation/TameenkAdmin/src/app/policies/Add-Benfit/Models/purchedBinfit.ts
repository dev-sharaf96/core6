import { purshedBenefitsId } from "./purshedBenefitsId";

export class purshedBenefit {
    ReferenceId: string;
    Benefits: purshedBenefitsId[];
   
        constructor(
            ReferenceId?: string,
            Benefits?: purshedBenefitsId[],
          
        ) {
          this.ReferenceId = ReferenceId || null;
          this.Benefits = Benefits || null;
      

        }
    }
