export class EdaatFilter  {
  invoiceNo: string;
  referenceId: string;
 
  constructor(
    invoiceNo?: string,
    referenceId?: string,
 
  ) {
    this.invoiceNo = invoiceNo || null;
    this.referenceId = referenceId || null; 
  }
}
