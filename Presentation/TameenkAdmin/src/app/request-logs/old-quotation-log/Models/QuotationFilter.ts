export class QuotationFilter {
  pageNumber: number;
  pageSize: number;
  nationalId: string;
  sequenceNumber: string;
  referenceNo: string;
  isExport: boolean;
  constructor(
    pageNumber?: number,
    pageSize?: number,
    nationalId?: string,
    sequenceNumber?: string,
    referenceNo?: string,
    isExport?: boolean
  ) {
    this.pageNumber = pageNumber || null;
    this.pageSize = pageSize || null;
    this.nationalId = nationalId || null;
    this.sequenceNumber = sequenceNumber || null;
    this.referenceNo = referenceNo || null;
    this.isExport = isExport || false;
  }
}
