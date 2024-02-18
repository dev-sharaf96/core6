export class TicketLogFilter {
  methodName: string;
  channel: number;
  nin: string;
  referenceNo: string;
  fromDate: Date;
  toDate: Date;
  constructor(
    methodName?: string,
    channel?: number,
    nin?: string,
    referenceNo?: string,
    fromDate?: Date,
    toDate?: Date
  ) {
    this.methodName = methodName || '';
    this.channel = channel || null;
    this.nin = nin || '';
    this.referenceNo = referenceNo || '';
    this.fromDate = fromDate || null;
    this.toDate = toDate || null;
  }
}
