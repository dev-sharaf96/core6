import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { CommonResponse, Inquiry, LookupData, ICity, IUserAddress, Vehicle, ICitiesLookup, InquiryResponseModel } from '../models';

/**
 * @export
 * @class InquiryService
 */
@Injectable({
  providedIn: 'root'
})
export class InquiryService extends ApiService {
  isEditRequest = false;
  qutReqExternalId = '';

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.inquiryApiUrl + 'InquiryNew/';
  }


  getVehicleModels(body): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('vehcileModels', 'id=' + body);
  }
  getUserAddresses(id, paging = environment.defaultPaging): Observable<CommonResponse<IUserAddress[]>> {
    return super.get<CommonResponse<IUserAddress[]>>('user-address/', `id=${id}${paging}`);
  }
  getUserVehicles(id, paging = environment.defaultPaging): Observable<CommonResponse<Vehicle[]>> {
    return super.get<CommonResponse<Vehicle[]>>('user-vehicle/', `id=${id}${paging}`);
  }
  deleteUserVehicle(id): Observable<CommonResponse<boolean>> {
    return super.get<CommonResponse<boolean>>('user-delete-vehicle/', `id=${id}`);
  }
  getQuotationRequest(externalId): Observable<CommonResponse<Inquiry>> {
    return super.get<CommonResponse<Inquiry>>('quotation-request/', `externalId=${externalId}`);
  }


  submitInquiryRequest(body): Observable<Inquiry> {
    return super.post<Inquiry>('submit-inquiry-request', body);
  }

  submitYakeenMissingFields(body): Observable<CommonResponse<InquiryResponseModel>> {
    return super.post<CommonResponse<InquiryResponseModel>>('submit-yakeen-missing-fields', body);
  }

  initInquiryRequest(body): Observable<Inquiry> {
    this.apiUrl = environment.inquiryApiUrl + 'InquiryNew/';
    return super.post<Inquiry>('init-inquiry-request', body);
  }

  editInquiryRequest(externalId: string): Observable<Inquiry> {
    return super.get<Inquiry>('edit-inquiry-request', `externalId=${externalId}`);
  }
  getEducationCodes(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('all-educations');
  }
  getMedicalConditions(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('all-medical-conditions');
  }
  getTransimissionTypes(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('all-transimission-types');
  }
  getAllCities(): Observable<ICitiesLookup> {
    return super.get<ICitiesLookup>('all-cities');
  }
  getViolations(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('violations');
  }
  getParkingLocations(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('parking-locations');
  }
  getBrakingSystems(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('braking-systems');
  }
  getCruiseControlTypes(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('cruise-control-types');
  }
  getParkingSensors(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('parking-sensors');
  }
  getCameraTypes(): Observable<CommonResponse<LookupData[]>> {
    return super.get<CommonResponse<LookupData[]>>('camera-types');
  }
  getCountries(): Observable<ICitiesLookup> {
    return super.get<ICitiesLookup>('all-countries');
  }
}
