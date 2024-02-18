import { InitInquiryResponseModel, InquiryResponseModel } from '.';

export class Inquiry {
  ErrorCode: number;
  ErrorDescription: string;
  // MethodName: string;
  inquiryResponseModel: InquiryResponseModel;
  initInquiryResponseModel: InitInquiryResponseModel;
  constructor() {}
}
