export class HyperPayResponse {
    // hyperpayRequestId: number;
    hyperpayResponseId: string;
    responseCode: string;
    referenceId: string ;
    amount: number ;
    ndc: string;
    timestamp: string;
    descriptor: string;
    paymentBrand: string;
    cardBin: string;
    last4Digits: string;
    holder: string;
}