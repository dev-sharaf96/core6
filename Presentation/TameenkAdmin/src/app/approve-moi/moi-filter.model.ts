export class MoiFilter {
        approveStatus: number;
        clientEmail: string;
          constructor(
            approveStatus?: number,
            clientEmail?: string
          ) {
            this.approveStatus = approveStatus || null;
            this.clientEmail = clientEmail || null;
          }
}
