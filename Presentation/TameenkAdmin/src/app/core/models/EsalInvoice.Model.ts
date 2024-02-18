export class IEsalInvoice {
  InvoiceNumber: string;
  ReferenceId: string;
  SadadBillsId: string;
  IsCancelled: boolean;
  CreatedDate: Date;
  Status: string;
  IsPaid: boolean;
  BillerId: string;
  CurAmt: number;
  PrcDt: Date;
  DueDt: Date;
  EfftDt: Date;
  BankPmtId: string;
  ProxyPayorOfficialIdType: string;
  PaymentStatus: string;
  ErrorCode: string;
  ErrorMessage: string;
  Method: string;
  ServerIP: string;
  ServerRequest: string
}
