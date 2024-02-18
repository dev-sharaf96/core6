import { PolicyStatisticsOutput } from "./PolicyStatisticsOutput";

export class PolicyStatisticsResutlOutput {
    ErrorDescription: string;
    ErrorCode: number;
    Result: PolicyStatisticsOutput[];
    TotalCount: number;
      constructor(
        ErrorDescription?: string,
        ErrorCode?: number,
        Result?: PolicyStatisticsOutput[],
        TotalCount?: number,
      ) {
        this.ErrorDescription = ErrorDescription || null;
        this.ErrorCode = ErrorCode || null;
        this.Result = Result || null;
        this.TotalCount = TotalCount || null;
      }
  }