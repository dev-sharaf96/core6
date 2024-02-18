import { CheckOutInfo } from "./CheckOutInfo";

export class OutputModel {
    data: CheckOutInfo[];
    file: string;
    totalCount: number;
  
      constructor(
        data?: CheckOutInfo[],
        file?: string,
        totalCount?: number,
      ) {
        this.data = data || null;
        this.file = file || '';
        this.totalCount = totalCount || null;
      }
  }

