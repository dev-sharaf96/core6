import { Vehicle, YakeenMissingFieldBase } from '.';

export class InquiryResponseModel {
  quotationRequestExternalId: string;
  isValidInquiryRequest: boolean;
  yakeenMissingFields: YakeenMissingFieldBase<any>[];
  quotationRequestId: string;
  vehicle: Vehicle;
  errors: string[];
  najmNcdFreeYears: number;
}
