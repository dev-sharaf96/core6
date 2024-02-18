export class addDriverFilter {
    policyNo: string;
    referenceNo: string;
    insurredId: string;
        constructor(
            policyNo?: string,
            referenceNo?: string,
            insurredId?: string
         
        ) {
          this.policyNo = policyNo || null;
          this.referenceNo = referenceNo || null;
          this.insurredId = insurredId || null;
        
        }
    }