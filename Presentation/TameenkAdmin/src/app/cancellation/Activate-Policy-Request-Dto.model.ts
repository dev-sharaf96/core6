export class ActivatePolicyRequestDto{
     ReferenceId  :string;
     PolicyNo :string;

constructor(
    ReferenceId?: string,
    PolicyNo?: string,
  ) {
    this.ReferenceId = ReferenceId || null;
    this.PolicyNo = PolicyNo || null;
  }
}