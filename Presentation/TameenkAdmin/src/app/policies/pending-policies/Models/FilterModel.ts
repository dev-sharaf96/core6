export class FilterModel {
  endDate: Date;
  startDate: Date;
  pageNumber: number;
  pageSize: number;
  nationalId: string;
  vehicleId: string;
  referenceNo: string;
  companyId: number;
  productTypeId: number;
  isExport: boolean;
  constructor(
    endDate?: Date,
    startDate?: Date,
    pageNumber?: number,
    pageSize?: number,
    nationalId?: string,
    vehicleId?: string,
    referenceNo?: string,
    companyId?: number,
    productTypeId?: number,
    isExport?: boolean
  ) {
    this.endDate = endDate || null;
    this.startDate = startDate || null;
    this.pageNumber = pageNumber || null;
    this.pageSize = pageSize || null;
    this.nationalId = nationalId || null;
    this.vehicleId = vehicleId || null;
    this.referenceNo = referenceNo || null;
    this.companyId = companyId || null;
    this.productTypeId = productTypeId || null;
    this.isExport = isExport || false;
  }
}
