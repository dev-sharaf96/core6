export class IInvoice {
  id: number;
  invoiceNo: number;
  invoiceDate: Date;
  invoiceDueDate: Date;
  userId: string;
  referenceId: string;
  insuranceTypeCode: number;
  insuranceCompanyId: number;
  policyId: number;
  productPrice: number;
  extraPremiumPrice: number;
  discount: number;
  fees: number;
  vat: number;
  subTotalPrice: number;
  totalPrice: number;
  createrName: string;
  PolicyNo: string;
  insuranceCompanyNameEN: string;
  insuranceCompanyNameAR: string;
  insuranceCompanyName: string;
  productTypeEN: string;
  productTypeAR: string;
  productType: string;
}
