import { Driver } from "../drivers/drivers-model";
import { Vehicle } from "../vehicles/vehicles-model";
import { PolicyStatus } from "../core/models/policy-status.model";
import { Language } from "../core";

export class CheckoutsModel {
  driver:Driver;
  vehicle:Vehicle;
  paymentMethodName: string;
  policyStatus:PolicyStatus;
  merchantId:string;
  referenceId:string;
  email:string;
  phone:string;
  iban:string;
  createdDateTime:Date;
  bankCodeId: number;
  selectedLanguage:string;
  insuranceCompanyName:string;
  modifiedDate:Date;
  isCancelled:boolean;
  cancelationDate:Date;
  cancelledBy:string;
  insuranceTypeCode: number;
  imageBack: Image;
  imageBody: Image;
  imageFront: Image;
  imageLeft: Image;
  imageRight: Image;
}

export interface Image {
  id: number;
  imageData: string;
  newImageData: any;
}
