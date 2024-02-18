export class AppNotificationLogModel {
  id: number;
  smsMessage:string;
  errorCode:number;
  errorDescription:string;
  createdDate:Date;
  ServiceRequest:string;
  ServiceResponse:string;
  ServiceResponseTimeInSeconds:number;
  ReferenceId:string;
  Channel:string;
}
