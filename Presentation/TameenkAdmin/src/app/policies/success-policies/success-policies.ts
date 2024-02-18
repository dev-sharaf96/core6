// export class SuccessPolicies {
//   policyStatus: PolicyStatus;
//   najmStatusObj: NajmStatusObj;
//   id: number;
//   insuranceCompanyID: number;
//   statusCode: number;
//   policyNo: string;
//   policyIssueDate: Date;
//   policyEffectiveDate: Date;
//   policyExpiryDate: Date;
//   referenceId: string;
//   policyFileId: string;
//   userEmail: string;
//   invoices: Invoice[];
//   insuredFullNameAr: string;
//   insuredFullNameEn: string;
//   insuredNIN: string;
//   vehiclePlateNumber: string;
//   productType: ProductType;
//   vehicleModelName: string;
//   insuranceCompanyNameAr: string;
//   insuredPhone: string;
//   insuranceCompanyNameEn: string;
//   vehicle: Vehicle;
//   ImageBack: string;
//   ImageFront: string;
//   ImageBody: string;
//   ImageLeft: string;
//   ImageRight: string;
//   PaymentMethod: any;
//   poloicyFileToUpload: any;
// }

export interface PolicyStatus {
  id: number;
  key: string;
  nameAr: string;
  nameEn: string;
  name: string;
}

export interface NajmStatusObj {
  id: number;
  code: string;
  nameAr: string;
  nameEn: string;
}

export interface Invoice {
  id: number;
  invoiceNo: number;
  invoiceDate: Date;
  invoiceDueDate: Date;
  userId: string;
  referenceId: string;
  insuranceTypeCode: number;
  insuranceCompanyId: number;
  policyId: number;
  productPrice: number;
  extraPremiumPrice: number;
  discount: number;
  fees: number;
  vat: number;
  subTotalPrice: number;
  totalPrice: number;
  createrName: string;
  policyNo: string;
  insuranceCompanyNameEN: string;
  insuranceCompanyNameAR: string;
  productTypeEN: string;
  productTypeAR: string;
}

export interface ProductType {
  id: number;
  descEN: string;
  descAR: string;
  desc: string;
}

export interface Vehicle {
  chassisNumber: string;
  id: string;
  sequenceNumber: string;
  customCardNumber: string;
  vehicleModelCode: number;
  vehicleMakerCode: number;
  vehicleMaker: string;
  model: string;
  vehicleModelYear: number;
  plateColor: string;
  carPlateText1: string;
  carPlateText2: string;
  carPlateText3: string;
  carPlateNumber: number;
  carPlateNumberAr: string;
  carPlateNumberEn: string;
  carPlateTextAr: string;
  carPlateTextEn: string;
  PlateTypeCode: number;
  cylinders: number;
  licenseExpiryDate: string;
  majorColor: string;
  minorColor: string;
  modelYear: number;
  RegisterationPlace: string;
  vehicleBodyCode: number;
  vehicleWeight: number;
  vehicleLoad: number;
  carOwnerNIN: string;
  carOwnerName: string;
  vehicleValue: number;
  isUsedCommercially: boolean;
  ownerTransfer: boolean;
  engineSizeId: number;
  vehicleUseId: number;
  currentMileageKM: number;
  transmissionTypeId: number;
  mileageExpectedAnnualId: number;
  axleWeightId: number;
  parkingLocationId: number;
  hasModifications: boolean;
  modificationDetails: string;
  vehicleIdTypeId: number;
}

export class SuccessPolicies {
  PolicyNo :string;
  CreatedDate :Date;
 PolicyEffectiveDate :Date;
  Phone :string;
 StatusAR :string;
 StatusEn :string;
  Email  :string;
  AddtionalDriverOne  :string;
  AddtionalDriverTwo :string;
 ArabicDescription :string;
  EnglishDescription :string;
  ImageBack :string;
 ImageBody :string;
 ImageFront :string;
  ImageLeft :string;
 ImageRight :string;
 CompanyNameAr :string;
 CompanyNameEn :string;
  InsuredNameAr :string;
  InsuredNameEn :string;
 plateText :string;
  VehicleModel :string;
  CustomCardNumber :string;
  SequenceNumber :string;
 OwnerTransfer :boolean;
  ReferenceId :string;
  NIN :string;
   Fees :number;
   Discount:number ;
  ProductPrice :number ;
  ExtraPremiumPrice:number;
  TotalPrice :number ;
 SubTotalPrice :number ;
   Vat :number ;
  InvoiceDate :Date
  InvoiceNo :number ;
 SuccessPolicyBenefits: SuccessPolicyBenefits [];
 PaymentMethod: any;
 poloicyFileToUpload: any;
 policyStatus: PolicyStatus;
 najmStatusObj: NajmStatusObj;
 productType: ProductType;
 CarPlateNumber: number;
  VehicleAgencyRepair :boolean;

 }
 export class SuccessPolicyBenefits
 {
 
 ArabicDescription :string ;
   Price :string ;
  EnglishDescription :string ;
 }
