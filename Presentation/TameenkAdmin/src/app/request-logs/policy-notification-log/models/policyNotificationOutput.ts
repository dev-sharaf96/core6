import { policyNotificationResponseModel } from "./policyNotificationResponseModel";

export class policyNotificationResponseOutput {
    ErrorDescription: string;
    ErrorCode: string;
    Result: policyNotificationResponseModel[];
    totalCount:number
        constructor(
            ErrorDescription?: string,
            ErrorCode?: string,
            Result?: policyNotificationResponseModel[],  
            totalCount?: number,   
 
        ) {
          this.ErrorDescription = ErrorDescription || null;
          this.ErrorCode = ErrorCode || null;
          this.Result = Result || null;
          this.totalCount = totalCount || null;

        }
    }