export class FilterModel {
    endDate: Date;
    startDate: Date;
     pageNumber: number;
     pageSize: number;
     modelYear:number;
     lang: string;
      constructor(
        endDate?: Date,
        startDate?: Date,
         pageNumber?: number,
         pageSize?: number,
         modelYear?: number,
         lang?: string

      ) {
        this.endDate = endDate || null;
        this.startDate = startDate || null;
         this.pageNumber = pageNumber || null;
         this.pageSize = pageSize || null;
         this.modelYear = modelYear || null;
         this.lang = lang || null;
      }
  }
