export class InquiryRequestLogModel {
  id:number;
  createdDate:Date;
  userId:string;
  userName:string;
  userIP:string;
  userAgent:string;
  serverIP:string;
  channel:string;
  errorCode: number;
  errorDescription:string;
  methodName:string;
  requestId:string;
  vehicleId:string;
  nin:string;
  cityCode:number;
  externalId:string;
  policyEffectiveDate:Date;
  najmNcdRefrence:string;
  najmNcdFreeYears:number;
  serviceRequest: string;
}
