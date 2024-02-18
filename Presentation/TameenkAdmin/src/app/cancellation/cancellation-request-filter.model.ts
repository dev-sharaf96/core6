export class CancelRequestFilter {
    vehicleId: string;
    nationalId: string;
    policyNo: string;
    referenceId:string;
    constructor(
        vehicleId?: string,
        nationalId?: string,
        policyNo?: string,
        referenceId?:string
    ) {
      this.vehicleId = vehicleId || "";
      this.nationalId = nationalId || "";
      this.policyNo = policyNo || "";
      this.referenceId = referenceId || "";
    }
  }