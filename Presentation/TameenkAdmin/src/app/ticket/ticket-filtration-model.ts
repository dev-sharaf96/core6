export class TicketFiltrationModel {
  id: number;
  userEmail: string;
  statusId: number;
  fromDate: Date;
  toDate: Date;
  nin: string;
  policyNo: string;
  invoiceNo: number;
  checkoutEmail: string;
  checkoutphone: string;
  referenceNo: string;
  channel: number;
  ticketTypeId: number;
  constructor(
    id?: number,
    userEmail?: string,
    statusId?: number,
    fromDate?: Date,
    toDate?: Date,
    nin?: string,
    policyNo?: string,
    invoiceNo?: number,
    checkoutEmail?: string,
    checkoutphone?: string,
    referenceNo?: string,
    channel?: number,
    ticketTypeId?: number,
  ) {
    this.id = id || null;
    this.userEmail = userEmail || '';
    this.statusId = statusId || null;
    this.fromDate = fromDate || null;
    this.toDate = toDate || null;
    this.nin = nin || '';
    this.policyNo = policyNo || '';
    this.invoiceNo = invoiceNo || null;
    this.checkoutEmail = checkoutEmail || '';
    this.checkoutphone = checkoutphone || '';
    this.referenceNo = referenceNo || '';
    this.channel = channel || null;
    this.ticketTypeId = ticketTypeId || null;
  }
}
