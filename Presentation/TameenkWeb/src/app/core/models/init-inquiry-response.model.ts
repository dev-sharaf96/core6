import { Insured } from './insured.model';
import { Driver } from './driver.model';
import { Vehicle } from './vehicle.model';


export class InitInquiryResponseModel {
  cityCode: number;
  policyEffectiveDate: Date;
  isVehicleUsedCommercially: boolean;
  isCustomerCurrentOwner: boolean;
  oldOwnerNin: number;
  isCustomerSpecialNeed: boolean;
  drivers: Driver[];
  insured: Insured;
  vehicle: Vehicle;
  isMainDriverExist: boolean;
  isVehicleExist: boolean;
  errors: Error[];
  parentRequestId: string;
  constructor() {
    this.insured = new Insured();
    this.drivers = [new Driver()];
    this.vehicle = new Vehicle();
  }
}
