export class RequestFilter {
    vehicleId: number;
    nationalId: number;
    constructor(
        vehicleId?: number,
        nationalId?: number,
    ) {
      this.vehicleId = vehicleId || null;
      this.nationalId = nationalId || null;
    }
  }