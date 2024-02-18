export class ClaimsFilterModel {
  policyNo: string;
    vehicleId: string;
    nationalId: string;
      constructor(
        policyNo?: string,
        vehicleId?: string,
        nationalId?: string
       
      ) {
        this.policyNo = policyNo || null;
        this.vehicleId = vehicleId || null;
        this.nationalId = nationalId || null;
      
      }
  }
