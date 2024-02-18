import {CancelPolicyResponse}from 'src/app/cancellation/cancel-policy-resp.model';

export class CancellPolicyOutput{
    ErrorDescription:string;
    ErrorCodes:number;
    ErrorCode:number;
    CancelPolicyResponse:CancelPolicyResponse;

constructor(
    ErrorDescription?: string,
    ErrorCodes?: number,
    ErrorCode?:number,
    CancelPolicyResponse?:CancelPolicyResponse,
  ) {
    this.ErrorDescription = ErrorDescription || null;
    this.ErrorCodes= ErrorCodes|| null;
    this.ErrorCode=ErrorCode|| null;
    this.CancelPolicyResponse =CancelPolicyResponse|| null;
     
  }
}