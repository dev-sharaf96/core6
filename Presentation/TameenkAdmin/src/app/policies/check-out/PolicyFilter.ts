export class PolicyFilter {
    insuranceCompanyId: number;
    nationalId: string;
    insuredEmail: string;
    policyNo: string;
    vehicleId: string;
    referenceNo: string;
    productTypeId: number;
    endDate: Date;
    startDate: Date;
    exports:boolean;
    pageNumber: number;
    pageSize: number;
      constructor(
        insuranceCompanyId?: number,
        nationalId?: string,
        insuredEmail?: string,
        policyNo?: string,
        vehicleId?: string,
        referenceNo?: string,
        productTypeId?: number,
        endDate?: Date,
        startDate?: Date,
        exports?:boolean,
        pageNumber?: number,
        pageSize?: number
      ) {
        this.insuranceCompanyId = insuranceCompanyId || null;
        this.nationalId = nationalId || null;
        this.insuredEmail = insuredEmail || null;
        this.policyNo = policyNo || null;
        this.vehicleId = vehicleId || null;
        this.referenceNo = referenceNo || null;
        this.productTypeId = productTypeId || null;
        this.endDate = endDate || null;
        this.startDate = startDate || null;
        this.exports = exports || null;
        this.pageNumber = pageNumber || null;
        this.pageSize = pageSize || null;
      }
  }