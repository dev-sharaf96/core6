import { ICity, Driver, Vehicle } from '.';

export interface IUserQuotationResponse {
  id: number;
  externalId: string;
  mainDriverId: string;
  cityCode: number;
  requestPolicyEffectiveDate: Date;
  vehicleId: string;
  userId: string;
  najmNcdRefrence: string;
  najmNcdFreeYears: number;
  createdDateTime: Date;
  isComprehensiveGenerated: boolean;
  isComprehensiveRequested: boolean;
  city: ICity;
  driver: Driver;
  vehicle: Vehicle;
  remainingTimeToExpireInSeconds: number;
  expiryTime: string;
  logo: string;
}
