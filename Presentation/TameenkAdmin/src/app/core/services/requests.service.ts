import { CommonResponse, IIdNamePairModel } from '..';
import { Injectable, Injector } from '@angular/core';

import { ApiService } from './api.service';
import { AvgServiceRequestTimeFilter } from 'src/app/avg-response-time/avg-service-request-time/avg-service-request-time-Filter.model';
import { AvgServiceRequestTimeModel } from 'src/app/avg-response-time/avg-service-request-time.model';
import { Observable } from 'rxjs';
import { PolicyStatisticsFilter } from 'src/app/policies/policy-statistics-report/Models/PolicyStatisticsFilter';
import { PolicyStatisticsOutput } from 'src/app/policies/policy-statistics-report/Models/PolicyStatisticsOutput';
import { PolicyStatisticsResutlOutput } from 'src/app/policies/policy-statistics-report/Models/PolicyStatisticsResutlOutput';
import { RequestModel } from 'src/app/requests/requests.model';
import { RequestsFilter } from 'src/app/requests/requests-filter.model';
import { ServiceRequestPerCompanyFilter } from 'src/app/Request-Per-Comany/request-per-company/requestPerCompanyFilter';
import { environment } from 'src/environments/environment';
import {requstPerCompanyModel} from 'src/app/Request-Per-Comany/requstPerCompanyModel';

@Injectable({
  providedIn: 'root'
})
export class RequestsService extends ApiService {
  public requestsFilter: RequestsFilter = new RequestsFilter();
  public requestsRespFilter: AvgServiceRequestTimeFilter = new AvgServiceRequestTimeFilter();
  public requestsRespPerComFilter: ServiceRequestPerCompanyFilter = new ServiceRequestPerCompanyFilter();
  public policiesFilter: PolicyStatisticsFilter = new PolicyStatisticsFilter();
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'service/';
  }

  getRequestMethods(): Observable<CommonResponse<string[]>> {
    return super.get<CommonResponse<string[]>>('methods-all');
  }

  getAllServicesWithFilter(body, params): Observable<CommonResponse<RequestModel[]>> {
    return super.post<CommonResponse<RequestModel[]>>('all', body, params);
  }
  getExcelWithFilter(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('excel', body);
  }


  getRequestMethodsNew(): Observable<CommonResponse<string[]>> {
    return super.get<CommonResponse<string[]>>('methods-all-new');
  }

  getAllServicesWithFilterNew(body, params): Observable<CommonResponse<RequestModel[]>> {
    return super.post<CommonResponse<RequestModel[]>>('all-new', body, params);
  }
  getExcelWithFilterNew(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('excel-new', body);
  }
  getAllServicesRequestWithFilterNew(body, params): Observable<CommonResponse<RequestModel[]>> {
    return super.post<CommonResponse<RequestModel[]>>('all-service-request', body, params);
  }

  GetAVGServiceRequestResponseTime(body, params): Observable<CommonResponse<AvgServiceRequestTimeModel[]>> {
    return super.post<CommonResponse<AvgServiceRequestTimeModel[]>>('GetTheAVGServiceRequestResponseTime', body, params);
  }

  GetServiceRequestPerCompany(body, params): Observable<CommonResponse<requstPerCompanyModel[]>> {
    return super.post<CommonResponse<requstPerCompanyModel[]>>('GetServiceRequestPerCompany', body, params);
  }

  getServicesRequestExcelWithFilterNew(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('excel-service-request', body);
  }

  getSMSLogMethods(): Observable<CommonResponse<string[]>> {
    return super.get<CommonResponse<string[]>>('all-sms-methods');
  }

  getCheckoutRequestLogMethods(): Observable<CommonResponse<string[]>> {
    return super.get<CommonResponse<string[]>>('all-checkoutRequestLog-methods');
  }
  getPolicyStatisticsWithFilter(body): Observable<CommonResponse<PolicyStatisticsResutlOutput>> {
    return super.post<CommonResponse<PolicyStatisticsResutlOutput>>('GetAllPolicyStatistics', body);
  }
  getAllServicesWithFilterFromOldDB(body, params): Observable<CommonResponse<RequestModel[]>> {
    return super.post<CommonResponse<RequestModel[]>>('logs-old', body, params);
  }
  getExcelWithFilterFromOldDB(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('logs-old-excel', body);
  }
}
