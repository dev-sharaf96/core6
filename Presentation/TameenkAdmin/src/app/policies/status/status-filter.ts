export class StatusFilter {
  invoiceNo: number;
  nationalId: string;
  insuredFirstNameAr: string;
  insuredLastNameAr: string;
  insuredEmail: string;
  policyNo: string;
  sequenceNo: string;
  customNo: string;
  referenceNo: string;
    constructor(
      invoiceNo?: number,
      nationalId?: string,
      insuredFirstNameAr?: string,
      insuredLastNameAr?: string,
      insuredEmail?: string,
      policyNo?: string,
      sequenceNo?: string,
      customNo?: string,
      referenceNo?: string
    ) {
      this.invoiceNo = invoiceNo || null;
      this.nationalId = nationalId || '';
      this.insuredFirstNameAr = insuredFirstNameAr || '';
      this.insuredLastNameAr = insuredLastNameAr || '';
      this.insuredEmail = insuredEmail || '';
      this.policyNo = policyNo || '';
      this.sequenceNo = sequenceNo || '';
      this.customNo = customNo || '';
      this.referenceNo = referenceNo || '';
    }
}
