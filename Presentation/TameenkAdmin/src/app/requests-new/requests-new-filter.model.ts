export class RequestsNewFilter {
  vehicleId: string;
  nationalId: string;
  referenceNo: string;
  method: string;
  statusCode: number;
  insuranceCompanyId: number;
  startDate: Date;
  endDate: Date;
  policyNo: string;
  insuranceTypeId: string;
  constructor(
    vehicleId?: string,
    nationalId?: string,
    referenceNo?: string,
    method?: string,
    statusCode?: number,
    insuranceCompanyId?: number,
    startDate?: Date,
    endDate?: Date,
    policyNo?: string,
    insuranceTypeId?: string
  ) {
    this.vehicleId = vehicleId || null;
    this.nationalId = nationalId || null;
    this.referenceNo = referenceNo || null;
    this.method = method || null;
    this.statusCode = statusCode || null;
    this.insuranceCompanyId = insuranceCompanyId || null;
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.policyNo = policyNo || null;
    this.insuranceTypeId=insuranceTypeId||null;
  }
}
