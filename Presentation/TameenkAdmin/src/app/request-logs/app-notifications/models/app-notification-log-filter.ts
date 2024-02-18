export class AppNotificationLogFilter {
  referenceId: string;
  statusCode: number;
  startDate: Date;
  endDate: Date;
  channel: number;
  export: boolean;
  constructor(
    referenceId?: string,
    statusCode?: number,
    startDate?: Date,
    endDate?: Date,
    channel?: number,
    isExport?: boolean
  ) {
    this.referenceId = referenceId || null;
    this.statusCode = statusCode || null;
    this.startDate = startDate || null;
    this.endDate = endDate || null;
    this.channel = channel || null;
    this.export = isExport || false;
  }
}
