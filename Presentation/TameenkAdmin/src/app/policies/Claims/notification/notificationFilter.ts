export class notificationFilter {
    referenceId: string;
    policyNo: string;
    claimNo: string;
        constructor(
            referenceId?: string,
            policyNo?: string,
            claimNo?: string
         
        ) {
          this.referenceId = referenceId || null;
          this.policyNo = policyNo || null;
          this.claimNo = claimNo || null;
        
        }
    }
  