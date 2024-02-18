import { result } from './result';

export class outputsModel {
    ErrorDescription: string;
    ErrorCode: number;
    Result: result;
 
        constructor(
            ErrorDescription?: string,
            ErrorCode?: number,
            Result?: result,
         
        ) {
          this.ErrorDescription = ErrorDescription || null;
          this.ErrorCode = ErrorCode || null;
          this.Result = Result || null;
        
        }
    }