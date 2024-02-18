export class CheckoutsFilter {
  NIN: string;
  referenceId: string;
  sequenceNumber: string;
  merchantId:string;
    constructor(
      NIN?: string,
      sequenceNumber?: string,
      referenceId?:string,
      merchantId?:string
    ) {
      this.NIN = NIN || '';
      this.sequenceNumber = sequenceNumber || '';
      this.referenceId = referenceId || '';
      this.merchantId=merchantId||null;
    }
}
