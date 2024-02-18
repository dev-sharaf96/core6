
export class pursheseRequestModel {
    referenceId: string;
    paymentAmount: string;
 
        constructor(
           referenceId?: string,
           paymentAmount?: string,
        ) {
          this.referenceId = referenceId || null;
          this.paymentAmount = paymentAmount || null;
        }
    }
   