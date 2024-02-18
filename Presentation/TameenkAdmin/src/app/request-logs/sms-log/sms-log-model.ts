export class SMSLogModel {
  id: number;
  mobileNumber: string;
  smsMessage:string;
  errorCode:number;
  errorDescription:string;
  createdDate:Date;
  method: string;
  UserIP:string;
  ServerIP:string;
  UserAgent:string;
  SMSProvider:string;
  ServiceURL:string;
  ServiceRequest:string;
  ServiceResponse:string;
  ServiceResponseTimeInSeconds:number;
  ReferenceId:string;
  Module:string;
  Channel:string;
}
