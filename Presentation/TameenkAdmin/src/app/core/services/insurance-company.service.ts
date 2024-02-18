import { Injectable, Injector } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { InsuranceCompany, CommonResponse, IIdNamePairModel, IInvoice } from '../models';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Vehicle } from 'src/app/vehicles/vehicles-model';
import { VehiclesFilter } from 'src/app/vehicles/vehicles-filter';

/**
 * @export
 * @class insuranceCompanyService
 * @extends {ApiService}
 */
@Injectable()
export class InsuranceCompanyService extends ApiService {
  /**
   * Company Products [TPL,comprehensive]
   */
  public productTypes: IIdNamePairModel[] = [];
  public InsuranceCompanies: IIdNamePairModel[] = [];
  public vehiclesFilter: VehiclesFilter = new VehiclesFilter();
  public companies = new BehaviorSubject(null);
  /**
   * Creates an instance of PolicyService.
   * @param {HttpClient} httpClient
   * @memberof insuranceCompanyService
   */
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl;
  }

  insuranceCompanies: InsuranceCompany[] = [];

  /**
   * get insurance Company by id
   * at first search in list in service
   * if found => return it
   * if not found => call api then return insurance company object
   * @param insurance company id
   * @returns {IInsuranceCompany}
   * @memberof insuranceCompanyService
   */
  getById(id: number): Observable<CommonResponse<InsuranceCompany>> {
    if (this.insuranceCompanies != null) {
      for (var i = 0; i < this.insuranceCompanies.length; i++) {
        let item = this.insuranceCompanies[i];

        if (item.id == id) {
          let response = new CommonResponse<InsuranceCompany>();
          response.data = item;
          response.data.address = item.address;
          response.data.contact = item.contact;
          const observable = new Observable<CommonResponse<InsuranceCompany>>(
            observer => {
              observer.next(response);
              observer.complete();
            }
          );

          return observable;
        }
      }
    }

    let company = null;
    let observe = super.get<CommonResponse<InsuranceCompany>>(
      'insurance-company/get-company',
      `id=${id}`
    );
    observe.subscribe(
      (data: CommonResponse<InsuranceCompany>) => {
        if (
          this.insuranceCompanies.filter(item => item.id == data.data.id)
            .length < 1
        ) {
          this.insuranceCompanies.push(data.data);
          return data.data;
        }
      },
      (error: any) => {
        return null;
      }
    );

    return observe;
  }

  /**
   * Get All Insurance Company
   *
   * @param page Index , page size , sort field , sort order
   * @returns {Observable<CommonResponse<IInsuranceCompany[]>>}
   * @memberof insuranceCompanyService
   */
  getAllInsuranceCompanies(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortOrder: boolean
  ): Observable<CommonResponse<InsuranceCompany[]>> {
    let observe = super.get<CommonResponse<InsuranceCompany[]>>(
      'insurance-company/all',
      `pageIndex=${pageIndex}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&showInActive=${true}`
    );
    observe.subscribe(
      (data: CommonResponse<InsuranceCompany[]>) => {
        this.insuranceCompanies = data.data;
      },
      (error: any) => { }
    );
    return observe;
  }
  /**
   * change state of company ( Active / deactive )
   * @param ( active / inactive ) , insurance company id
   * @returns {Observable<CommonResponse<Boolean>>}
   * @memberof insuranceCompanyService
   */
  toggleCompanyActivation(
    isActive: boolean,
    id: number
  ): Observable<CommonResponse<InsuranceCompany>> {
    return super.get<CommonResponse<InsuranceCompany>>(
      'insurance-company/change-state',
      `isActive=${isActive}&insuranceCompanyId=${id}`
    );
  }
/**
   * change state of tabby for company ( Active / deactive )
   * @param ( active / inactive ) , insurance company id
   * @returns {Observable<CommonResponse<Boolean>>}
   * @memberof insuranceCompanyService
   */
  toggleCompanyActivationTabby(
    isActive: boolean,
    id: number,
    insuranceType: number
  ): Observable<CommonResponse<InsuranceCompany>> {
    return super.get<CommonResponse<InsuranceCompany>>(
      'insurance-company/active-state-tabby',
      `isActive=${isActive}&insuranceCompanyId=${id}&insuranceType=${insuranceType}`
    );
  }
  /**
   * change state of company address validation ( Active / deactive )
   * @param ( active / inactive ) , insurance company id
   * @returns {Observable<CommonResponse<Boolean>>}
   * @memberof insuranceCompanyService
   */
  toggleCompanyAddressValidationActivation(
    isActive: boolean,
    id: number
  ): Observable<CommonResponse<InsuranceCompany>> {
    return super.get<CommonResponse<InsuranceCompany>>(
      'insurance-company/change-address-validation-state',
      `isActive=${isActive}&insuranceCompanyId=${id}`
    );
  }
    /**
   * change state of company by Type ( Active / deactive )
   * @param ( active / inactive ) , insurance company id
   * @returns {Observable<CommonResponse<Boolean>>}
   * @memberof insuranceCompanyService
   */
  toggleCompanyActivationByType(
    isActive: boolean,
    id: number,
    insuranceType: number
  ): Observable<CommonResponse<InsuranceCompany>> {
    return super.get<CommonResponse<InsuranceCompany>>(
      'insurance-company/change-state-byType',
      `isActive=${isActive}&insuranceCompanyId=${id}&insuranceType=${insuranceType}`
    );
  }

  /**
   * add new insurance Company
   * @param insurance company
   * @returns {Observable<String>}
   * @memberof insuranceCompanyService
   */
  addInsuranceCompany(
    insuranceCompany: InsuranceCompany
  ): Observable<CommonResponse<InsuranceCompany>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return super.post('insurance-company/add', insuranceCompany, options);
  }
  /**
   * Edit insurance company
   *
   * @param insuranceCompany
   * @returns {Observable<String>}
   * @memberof insuranceCompanyService
   */
  editInsuranceCompany(
    insuranceCompany: InsuranceCompany
  ): Observable<CommonResponse<InsuranceCompany>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return super.post<CommonResponse<InsuranceCompany>>(
      'insurance-company/edit',
      insuranceCompany,
      options
    );
  }
  /**
   *
   *
   * @returns {Observable<CommonResponse<IIdNamePairModel[]>>}
   * @memberof InsuranceCompanyService
   */
  getInsuranceCompaniesName(): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('insurance-company/companies-name');
  }

  getAllProductsType(): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('product-type/all');
  }
  getAllInvoices(body, params): Observable<CommonResponse<IInvoice[]>> {
    return super.post<CommonResponse<IInvoice[]>>('invoice/all-filter', body, params);
  }

  testInsuranceCompanyQuotation(insuranceCompanyId: number, InsuranceTypeId: number) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(`${environment.quotationApiUrl}InsuranceCompanyIntegrationTestGetQuote?insuranceCompanyId=${insuranceCompanyId}&insuranceTypeCode=${InsuranceTypeId}`);
  }

  testInsuranceCompanyPolicy(insuranceCompanyId: number, InsuranceTypeId: number) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(`${environment.policyApiUrl}InsuranceCompanyIntegrationTestGenerateInvoiceAndSavePolicyFile?insuranceCompanyId=${insuranceCompanyId}&insuranceTypeCode=${InsuranceTypeId}`);
  }

  getQuotationExcelResultFile() {
    // tslint:disable-next-line:max-line-length
    // let headers = new Headers({ 'responseType': 'blob' });
    // let options = new RequestOptions({ headers: headers });

    let headers = new HttpHeaders({
      'Response-Type': 'blob'
    });

    return this._http.get(`${environment.quotationApiUrl}DownloadQuotationAutomatedTestExcelSheet`, { observe: 'response', responseType: 'blob' });
  }

  getVehiclesWithFilter(body, params) {
    return super.post<CommonResponse<Vehicle[]>>('vehicle/all', body, params);
  }
  deleteVehicle(id) {
    return super.get<CommonResponse<boolean>>('vehicle/delete', `vehicleId=${id}`);
  }
  getVehicleDetails(id) {
    return super.get<CommonResponse<Vehicle>>('vehicle/details', `id=${id}`);
  }
  editVehicle(body) {
    return super.post<CommonResponse<Vehicle[]>>('vehicle/edit', body);
  }
  exportSuccessPoliciesAsExcel(body) {
    return super.post<CommonResponse<string>>('policy/success-policy-excel', body);
  }
  exportFailPoliciesAsExcel(body) {
    return super.post<CommonResponse<string>>('policy/fail-policy-excel', body);
  }

  exportSamaReportAsExcel(body) {
    return super.post<CommonResponse<string>>('policy/sama-report-excel', body);
  }

  deleteVehicleRequests(sequenceNumber: string) {
    return super.get<CommonResponse<boolean>>('vehicle/deleteVehicleRequests', `sequenceNumber=${sequenceNumber}`);
  }

  getVehicleBreakingSystem(): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('vehicle/vehicle-breakingSystem');
  }
  getVehicleSensor(): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('vehicle/vehicle-parkingSensors');
  }
  getVehicleCameraType(): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('vehicle/vehicle-cameraTypes');
  }
  getVehicleColors(): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('vehicle/vehicle-vehicleColors');
  }
}
