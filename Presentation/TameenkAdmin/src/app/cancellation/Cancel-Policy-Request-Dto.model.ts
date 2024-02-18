export class CancelPolicyRequestDto{
     ReferenceId  :string;
     PolicyNo :string;
    CancelDate :string;
    CancellationReasonCode  :number;
    CancellationAttachment :any;

constructor(
    ReferenceId?: string,
    PolicyNo?: string,
    CancelDate?: string,
    CancellationReasonCode?:number,
    CancellationAttachment?:any
  ) {
    this.ReferenceId = ReferenceId || null;
    this.PolicyNo = PolicyNo || null;
    this.CancelDate = CancelDate || null;
    this.CancellationReasonCode = CancellationReasonCode || null;
    this.CancellationAttachment = CancellationAttachment || null;
  }
}