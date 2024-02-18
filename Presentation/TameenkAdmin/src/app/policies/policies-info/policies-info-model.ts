export class PoliciesInfoModel {
  policyNo: string;
  insuranceCompanyId: number;
  referenceNo: string;
  najmStatusId: number;
  invoiceNo: number;
  paymentMethodId: number;
    constructor(
      policyNo?: string,
      insuranceCompanyId?: number,
      referenceNo?: string,
      najmStatusId?: number,
      invoiceNo?: number,
      paymentMethodId?: number,
    ) {
      this.policyNo = policyNo || '';
      this.insuranceCompanyId = insuranceCompanyId || null;
      this.referenceNo = referenceNo || '';
      this.najmStatusId = najmStatusId || null;
      this.invoiceNo = invoiceNo || null;
      this.paymentMethodId = paymentMethodId || null;
    }
}
