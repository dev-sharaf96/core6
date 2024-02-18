
export class najmPolicyResponseModel {
    companyName: string;
    policyNo: string;
    referenceId: string;
    responseTime: string;
        constructor(
            companyName?: string,
            policyNo?: string,
            referenceId?: string,
            responseTime?: string,   
        ) {
          this.companyName = companyName || null;
          this.policyNo = policyNo || null;
          this.referenceId = referenceId || null;
          this.responseTime = responseTime || null;
        }
    }
