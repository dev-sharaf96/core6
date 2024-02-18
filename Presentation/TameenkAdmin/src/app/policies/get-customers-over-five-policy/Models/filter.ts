export class filter {
    startDate: Date;
    endDate: Date;
    isExport:boolean;
    pageSize:number;
    pageNumber:number;
    constructor(
      startDate?: Date,
      endDate?: Date,
      isExport?:boolean,
      pageSize?:number,
      pageNumber?:number

    ) {
      this.startDate = startDate || null;
      this.endDate = endDate || null;
      this.isExport = isExport || null;
      this.pageSize = pageSize || null;
      this.pageNumber = pageNumber || null;
    }
  }
