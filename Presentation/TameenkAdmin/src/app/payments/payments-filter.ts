export class PaymentsFilter {
  invoiceNo: string;
  referenceId: string;
  paymentMethodId: number;
  merchantId:string;
  constructor(
    invoiceNo?: string,
    referenceId?: string,
    paymentMethodId?: number,
    merchantId?:string
  ) {
    this.invoiceNo = invoiceNo || null;
    this.referenceId = referenceId || null;
    this.paymentMethodId = paymentMethodId || null;
    this.merchantId=merchantId||null;
  }
}
