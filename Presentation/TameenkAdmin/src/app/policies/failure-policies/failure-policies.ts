export class FailurePolicies {
  insuranceCompanyEn: string;
  insuranceCompanyAr: string;
  insuranceCompany: string;
  maxTries: number;
  iban: string;
  referenceId: string;
  createDate: Date;
  policyStatus: PolicyStatus;
  userEmail: string;
  invoice: Invoice;
  insuredFullNameAr: string;
  insuredFullNameEn: string;
  insuredFullName: string;
  insuredNIN: string;
  vehiclePlateNumber: number;
  productType: ProductType;
  vehicleModelName: string;
  insuredPhone: string;
  vehicle: Vehicle;
  errorDescription: string;
  serviceRequest: string;
  serviceResponse: string;
  PaymentMethod: any;
}

export interface PolicyStatus {
  id: number;
  key: string;
  nameAr: string;
  nameEn: string;
  name: string;
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
