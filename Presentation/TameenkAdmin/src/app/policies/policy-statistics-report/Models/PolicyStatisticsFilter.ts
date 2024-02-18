export class PolicyStatisticsFilter {
    startDate: Date;
    endDate: Date;
    insuranceCompanyId: number;
    isExcel: number;
    lang: string;
    pageNumber :number;
    pageSize :number;
      constructor(
        insuranceCompanyId?: number,
        endDate?: Date,
        startDate?: Date,
        isExcel?: number,
        lang?: string,
        pageNumber?: number,
        pageSize?: number,


      ) {
        this.insuranceCompanyId = insuranceCompanyId || null;
        this.endDate = endDate || null;
        this.startDate = startDate || null;
        this.isExcel = isExcel || null;
        this.lang = lang || null;
        this.pageNumber = pageNumber || null;
        this.pageSize = pageSize || null;
      }
  }