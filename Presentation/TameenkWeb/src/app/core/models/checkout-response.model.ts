export interface PriceDetail {
  PriceNameEn: string;
  PriceNameAr: string;
  PriceValue: number;
  PriceTypeCode: number;
}

export interface Benefits {
  BenefitCode: number;
  BenefitId: string;
  BenefitNameAr: string;
  BenefitNameEn: string;
  BenefitDescAr: string;
  BenefitDescEn: string;
  BenefitPrice: number;
  IsSelected: boolean;
  ProductBenefitId: number;
}
export interface SelectedProduct {
  ProductNameAr: any;
  ProductNameEn: string;
  PriceDetails: PriceDetail[];
  Benefits: Benefits[];
}

export interface BankCode {
  Id: string;
  Name: string;
}

export interface CheckoutResponse {
  email: any;
  referenceId: string;
  phone: any;
  bankCode: number;
  IBAN: string;
  imageRight: any;
  imageLeft: any;
  imageFront: any;
  imageBack: any;
  imageBody: any;
  userId: string;
  selectedProduct: SelectedProduct;
  paymentAmount: number;
  quotationResponseId: number;
  typeOfInsurance: number;
  paymentMethodCode: any;
  lowestComperehensiveQoutPrice: number;
  qtRqstExtrnlId: string;
  insuranceCompanyId: number;
  bankCodes: BankCode[];
  accessToken: string;
}
