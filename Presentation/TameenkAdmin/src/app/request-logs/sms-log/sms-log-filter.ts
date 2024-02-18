export class SMSLogFilter {
  mobileNumber: string;
  statusCode: number;
  startDate: Date;
  endDate: Date;
  method: string;
  channel:number;
  smsprovider:number;
  constructor(
    mobileNumber?: string,
    statusCode?: number,
    startDate?: Date,
    endDate?: Date,
    method?: string,
    channel?:number,
    smsprovider?:number
  ) {
    this.mobileNumber = mobileNumber || '';
    this.statusCode = statusCode || null;
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.method = method || '';
    this.channel = channel || null;
    this.smsprovider = smsprovider || null;
  }
}
