export class renewalData {
    companyName: string;
    productType: string;
    expiryDate: Date;
    renewalDate:Date;
    lastAmount?: number;
    currentAmount?: number;
    sequenceNumber: string;
    carOwnerNIN: string;

        constructor(
            companyName?: string,
            productType?: string,
            expiryDate?: Date,
            renewalDate?: Date,
            lastAmount?: number,
            currentAmount?: number,
            sequenceNumber?: string,
            carOwnerNIN?: string,

        ) {
          this.companyName = companyName || null;
          this.productType = productType || null;
          this.expiryDate = expiryDate || null;
          this.renewalDate = renewalDate || null;
          this.lastAmount = lastAmount || null;
          this.currentAmount = currentAmount || null;
          this.sequenceNumber = sequenceNumber || null;
          this.carOwnerNIN = carOwnerNIN || null;
        }
    }
