import { Driver } from "./driver";

export class addDriverRequest {
    policyNo: string;
    referenceId: string;
    additionStartDate: string;
    driver:Driver
        constructor(
            policyNo?: string,
            referenceId?: string,
            additionStartDate?:string,
            driver?:Driver
        ) {
          this.policyNo = policyNo || null;
          this.referenceId = referenceId || null;
          this.additionStartDate = additionStartDate || null;
          this.driver = driver || null;

        
        }
    }