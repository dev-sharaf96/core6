export class policyNotificationResponseModel {
    companyName: string;
    policyNo: string;
    referenceId: string;
    statusDescription:string;
        constructor(
            companyName?: string,
            policyNo?: string,
            referenceId?: string,  
            statusDescription?: string,   
 
        ) {
          this.companyName = companyName || null;
          this.policyNo = policyNo || null;
          this.referenceId = referenceId || null;
          this.statusDescription = statusDescription || null;

        }
    }
