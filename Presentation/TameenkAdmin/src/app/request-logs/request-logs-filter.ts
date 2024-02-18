export class RequestLogsFilter {
  NIN: string;
  referenceId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  externalId: string;
  channel:number;
  methodName: string;
  constructor(
    NIN?: string,
    referenceId?: string,
    vehicleId?: string,
    startDate?: Date,
    endDate?: Date,
    externalId?:string,
    channel?:number,
    methodName?: string
  ) {
    this.NIN = NIN || '';
    this.referenceId = referenceId || '';
    this.vehicleId = vehicleId || '';
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.externalId = externalId || '';
    this.channel = channel || null;
    this.methodName = methodName || null;
  }
}
