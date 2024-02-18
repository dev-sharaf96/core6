import { najmPolicyResponseModel } from "./najmResponeModel";

export class najmPolicyResponseOutput {
    ErrorDescription: string;
    ErrorCode: string;
    Result: najmPolicyResponseModel[];
    totalCount:number;
    File:any
        constructor(
            ErrorDescription?: string,
            ErrorCode?: string,
            Result?: najmPolicyResponseModel[],
            totalCount?: number,  
            File?:any 
   
        ) {
          this.ErrorDescription = ErrorDescription || null;
          this.ErrorCode = ErrorCode || null;
          this.Result = Result || null;
          this.totalCount = totalCount || null;
          this.File = File || null;
        }
    }