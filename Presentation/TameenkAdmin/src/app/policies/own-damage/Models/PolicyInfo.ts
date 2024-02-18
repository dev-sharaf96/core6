export class PolicyInfo {
    referenceId: string;
    policyNo: string;
    policyIssueDate: Date;
    policyExpiryDate:Date;
    InsuranceCompanyName:string;
    IsSelected:boolean;
        constructor(
          referenceId?: string,
          policyNo?: string,
          policyIssueDate?: Date,
          policyExpiryDate?:Date,
          InsuranceCompanyName?:string,
          IsSelected?:boolean


        ) {
          this.referenceId = referenceId || null;
          this.policyNo = policyNo || null;
          this.policyIssueDate = policyIssueDate || null;
          this.policyExpiryDate = policyExpiryDate || null;
          this.InsuranceCompanyName = InsuranceCompanyName || null;
          this.IsSelected = IsSelected || false;

        }
    }
    