export class CheckoutRequestLogModel {
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
  referenceId:string;
  vehicleId:string;
  driverNin:string;
  companyID:string;
  companyName:string;
  paymentMethod:string;
  amount:number;
}
