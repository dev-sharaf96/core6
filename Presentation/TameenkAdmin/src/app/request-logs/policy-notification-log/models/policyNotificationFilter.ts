export class policyNotificationFilter {
  policyNo:  string;
  referenceNo: string;
  startDate: Date;
  endDate: Date;
  insuranceCompanyId:number;
  methodName:string;
      constructor(
          policyNo?: string,
          referenceNo?: string,
          startDate?: Date,
          endDate?: Date,
          insuranceCompanyId?:number,
          methodName?:string
      ) {
          this.policyNo = policyNo || null;
          this.referenceNo = referenceNo || null;
        this.startDate = startDate || null;
        this.endDate = endDate || null;
        this.insuranceCompanyId = insuranceCompanyId || null;
        this.methodName = methodName || null;
      }
  }
