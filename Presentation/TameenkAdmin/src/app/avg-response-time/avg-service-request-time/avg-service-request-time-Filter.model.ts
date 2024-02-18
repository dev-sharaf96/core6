export class AvgServiceRequestTimeFilter {
  statusCode: number;
  startDate: Date;
  endDate: Date;
  moduleId: number;
  insuranceCompanyId: string;
  insuranceTypeId: string;
  constructor(
    statusCode?: number,
    startDate?: Date,
    endDate?: Date,
    moduleId?: number,
    insuranceCompanyId?:string,
    insuranceTypeId?: string

  ) {
    this.statusCode = statusCode || null;
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.moduleId = moduleId || null;
    this.insuranceCompanyId = insuranceCompanyId || null;
    this.insuranceTypeId = insuranceTypeId || null;

  }
}
