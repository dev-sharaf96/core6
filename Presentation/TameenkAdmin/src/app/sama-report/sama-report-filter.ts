export class SamaReportFilter {
  insuranceCompanyId: number;
  invoiceNo: number;
  nationalId: string;
  insuredFirstNameAr: string;
  insuredLastNameAr: string;
  insuredEmail: string;
  policyNo: string;
  sequenceNo: string;
  customNo: string;
  referenceNo: string;
  productTypeId: number;
  najmStatusId: number;
  endDate: Date;
  startDate: Date;
  channel: number;
    constructor(
      insuranceCompanyId?: number,
      invoiceNo?: number,
      nationalId?: string,
      insuredFirstNameAr?: string,
      insuredLastNameAr?: string,
      insuredEmail?: string,
      policyNo?: string,
      sequenceNo?: string,
      customNo?: string,
      referenceNo?: string,
      productTypeId?: number,
      najmStatusId?: number,
      endDate?: Date,
      startDate?: Date,
      channel?: number
    ) {
      this.insuranceCompanyId = insuranceCompanyId || null;
      this.invoiceNo = invoiceNo || null;
      this.nationalId = nationalId || '';
      this.insuredFirstNameAr = insuredFirstNameAr || '';
      this.insuredLastNameAr = insuredLastNameAr || '';
      this.insuredEmail = insuredEmail || '';
      this.policyNo = policyNo || '';
      this.sequenceNo = sequenceNo || '';
      this.customNo = customNo || '';
      this.referenceNo = referenceNo || '';
      this.productTypeId = productTypeId || null;
      this.najmStatusId = najmStatusId || null;
      this.endDate = endDate || null;
      this.startDate = startDate || null;
      this.channel = channel || null;
    }
}
