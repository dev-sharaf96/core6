export class InitInquiryRequestModel {
  sequenceNumber: number;
  nationalId: string;
  policyEffectiveDate: Date;
  captchaInput: string;
  captchaToken: string;
  VehicleIdTypeId: number;
  ownerTransfer: boolean;
  ownerNationalId: string;
  parentRequestId: string;
  constructor() {}
}
