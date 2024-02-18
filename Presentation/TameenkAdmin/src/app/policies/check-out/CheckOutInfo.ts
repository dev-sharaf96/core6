export class CheckOutInfo {
  referenceId: string;
  channel: string;
  email: string;
  phone: string;
  iBAN: string;
  nIN: string;
  policyNo: string;
  policyIssueDate: Date;
  nationalId: string;
  fullName:string;
      constructor(
        referenceId?: string,
        channel?: string,
        email?: string,
        phone?: string,
        iBAN?: string,
        nIN?: string,
        policyNo?: string,
        policyIssueDate?: Date,
        nationalId?: string,
        fullName?:string,
        
      ) {
        this.referenceId = referenceId || null;
        this.channel = channel || '';
        this.email = email || '';
        this.phone = phone || '';
        this.iBAN = iBAN || '';
        this.nIN = nIN || '';
        this.policyNo = policyNo || null;
        this.policyIssueDate = policyIssueDate || null;
        this.nationalId = nationalId || null;
        this.fullName = fullName || null;
      }
  }

