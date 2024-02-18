export class SMSRenewalLogModel {
  // id: number;
  MobileNumber: string;
  SMSMessage:string;
  ErrorCode:number;
  ErrorDescription:string;
  CreatedDate:Date;
  // UserIP:string;
  // ServerIP:string;
  // UserAgent:string;
  // ServiceURL:string;
  // ServiceRequest:string;
  // ServiceResponse:string;
  // ServiceResponseTimeInSeconds:number;
  // Channel:string;
  TransferOwnership:boolean;
  // status:string;

  constructor(obj:SMSRenewalLogModel){
    this.MobileNumber = obj.MobileNumber;
    this.SMSMessage = obj.SMSMessage;
    this.ErrorCode = obj.ErrorCode;
    this.ErrorDescription = obj.ErrorDescription;
    this.CreatedDate = obj.CreatedDate;
    this.TransferOwnership = obj.TransferOwnership;
  }
}

export class AllTypeSMSRenewalLogModel {
  sent28daysBefore:SMSRenewalLogModel[] = [];
  sent14daysBefore:SMSRenewalLogModel[] = [];
  sentDayBefore:SMSRenewalLogModel[] = [];
  sentInsuranceExpire:SMSRenewalLogModel[] = [];
  notSentDueTransferOfCarOwnership:SMSRenewalLogModel[] = [];
}


export class SMSRenewalCountsModel {
  type:string = '';
  count:number = 0;

  constructor(type:string,count:number){
    this.type = type;
    this.count = count;
  }
}
