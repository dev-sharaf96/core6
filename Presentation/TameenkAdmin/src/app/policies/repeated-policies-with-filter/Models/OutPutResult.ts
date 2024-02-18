import { RepeatedProcessingQueueInfo } from "./RepeatedProcessingQueueInfo";

export class OutPutResult {
    ErrorCode:number;
    ErrorDescription:string;
    TotalCount:number;
    sheet:string;
    Result: RepeatedProcessingQueueInfo[];
  }