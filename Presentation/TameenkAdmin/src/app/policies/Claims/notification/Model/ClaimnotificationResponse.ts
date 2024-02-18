export class ClaimNotificationResponse  {
    ReferenceId: string;
    StatusCode: number;
    Errors :[];
    ClaimAmount:number;
      constructor(
        ReferenceId?: string,
        StatusCode?: number,
        ClaimAmount?:number
      ) {
        this.ReferenceId = ReferenceId || null;
        this.StatusCode = StatusCode || null;
        this.ClaimAmount=ClaimAmount||null;
      }
  }
