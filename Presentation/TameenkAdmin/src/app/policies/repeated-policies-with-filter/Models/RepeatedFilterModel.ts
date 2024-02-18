export class RepeatedFilterModel {
  endDate: Date;
  startDate: Date;
  duplicatedData: number;
  isExport: boolean;
  pageIndex: number;
  pageSize: number;
  language: string;

  constructor(
    endDate?: Date,
    startDate?: Date,
    duplicatedData?:number,
    isExport?: boolean,
    pageIndex?:number,
    pageSize?: number,
    language?: string,
  ) {
    this.endDate = endDate || null;
    this.startDate = startDate || null;
    this.duplicatedData = duplicatedData || null;
    this.isExport = isExport || false;
    this.pageIndex = pageIndex || null;
    this.pageSize = pageSize || null;
    this.language = language || null;
  }
}
