export class SMSRenewalLogFilter {
  startDate: Date;
  endDate: Date;
  constructor(
    startDate?: Date,
    endDate?: Date,
  ) {
    this.startDate = startDate || null;
    this.endDate = endDate || null;
  }
}
