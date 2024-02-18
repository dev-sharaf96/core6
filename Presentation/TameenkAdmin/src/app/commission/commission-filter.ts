export class commissionFilter {
  insuranceCompanyId: number;
  insuranceTypeCode: number;
  constructor(
    insuranceCompanyId?: number,
    insuranceTypeCode?: number,
  ) {
    this.insuranceCompanyId = insuranceCompanyId || null;
    this.insuranceTypeCode = insuranceTypeCode || null;
  }
}
