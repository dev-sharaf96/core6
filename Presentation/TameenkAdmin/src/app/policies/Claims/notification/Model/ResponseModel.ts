import { ClaimNotificationResponse } from "./ClaimNotificationResponse";

export class notificationResponseModel {
    errorDescription: string;
    errorCode: string;
    ClaimNotificationServiceResponse: ClaimNotificationResponse; 
    count:number;
      constructor(
        errorDescription?: string,
        errorCode?: string,
        ClaimNotificationServiceResponse?: ClaimNotificationResponse,
        count?:number
      ) {
        this.errorDescription = errorDescription || null;
        this.errorCode = errorCode || null;
        this.ClaimNotificationServiceResponse = ClaimNotificationServiceResponse || null;
        this.count=count|| null;
      }
  }