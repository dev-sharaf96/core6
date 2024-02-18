import { CommonResponse, IIdNamePairModel } from '..';
import { Injectable, Injector } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class VehicleService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.inquiryUrl;
  }

  /**
   * Get All Vehicle Body Types as id name pair
   * @param pageIndex Page index
   * @param pageSize Page size
   */
  getVehicleBodyTypes(pageIndex: number, pageSize: number): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>(
      'inquiry/vehicle-body-types', `pageIndex=${pageIndex}&pageSize=${pageSize}`);

  }
  getVehicleMakers(pageIndex?: number, pageSize?: number): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>(
      'inquiry/vehicle-makers', `pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  getVehicleMakerModels(makerCode?: number, pageIndex?: number, pageSize?: number): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>(
      'inquiry/vehicle-models', `vehicleMakerId=${makerCode}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  
  
  getEducationCodes(): Observable<CommonResponse<any>> {
    return super.get<CommonResponse<any>>('inquiry/all-educations');
  }
  getMedicalConditions(): Observable<CommonResponse<any>> {
    return super.get<CommonResponse<any>>('inquiry/all-medical-conditions');
  } 
  getViolations(): Observable<CommonResponse<any>> {
    return super.get<CommonResponse<any>>('inquiry/violations');
  }
  getCountries(): Observable<any> {
    return super.get<any>("inquiry/all-countries");
  }
  getLicenseYearsList(): Observable<any> {
    return super.get<any>('InquiryNew/getLicenseYearsList');
  }
  getRelationShipCodes(): Observable<any> {
    return super.get<any>("InquiryNew/all-relationsShip");
  }
}
