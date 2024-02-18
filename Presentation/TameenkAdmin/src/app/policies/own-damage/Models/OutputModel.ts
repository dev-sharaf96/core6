import { PolicyInfo } from "./PolicyInfo";

export class OutputModel {
    data: PolicyInfo[];
    totalCount: number;
  ErrorCode: number;
  
      constructor(
        data?: PolicyInfo[],
        totalCount?: number,
        ErrorCode?: number

      ) {
        this.data = data || null;
        this.totalCount = totalCount || null;
        this.ErrorCode = ErrorCode || null;

      }
  }