export class benfitResponseModel {
    policyNo: string;
    insuredNIN: string;
    policyIssueDate: string;
    insuranceCompanyNameAr: string;
    insuranceCompanyNameEn: string;
    policyExpiryDate: string;
    referenceId: string;
     
        constructor(
            policyNo?: string,
            insuredNIN?: string,
            policyIssueDate?: string,
            insuranceCompanyNameAr?: string,
            insuranceCompanyNameEn?: string,
            policyExpiryDate?: string, 
            referenceId?: string, 
         
        ) {
          this.policyNo = policyNo || null;
          this.insuredNIN = insuredNIN || null;
          this.policyIssueDate = policyIssueDate || null;
          this.insuranceCompanyNameAr = insuranceCompanyNameAr || null;
          this.insuranceCompanyNameEn = insuranceCompanyNameEn || null;
          this.policyExpiryDate = policyExpiryDate || null;
          this.referenceId = referenceId || null;
        }
    }
