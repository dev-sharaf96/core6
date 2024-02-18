import { CommonResponse, IIdNamePairModel } from '..';
import { Injectable, Injector } from '@angular/core';

import { ApiService } from './api.service';
import { CheckoutRequestLogModel } from 'src/app/request-logs/checkout-request-log/checkout-request-log-model';
import { InquiryRequestLogModel } from 'src/app/request-logs/inquiry-request-log/inquiry-request-log-model';
import { Observable } from 'rxjs';
import { QuotationRequestLogModel } from 'src/app/request-logs/quotation-request-log/quotation-request-log-model';
import { RequestLogsFilter } from 'src/app/request-logs/request-Logs-filter';
import { SMSLogFilter } from 'src/app/request-logs/sms-log/sms-log-filter';
import { SMSLogModel } from 'src/app/request-logs/sms-log/sms-log-model';
import { environment } from '../../../environments/environment';
import { QuotationOutputModel } from 'src/app/request-logs/old-quotation-log/Models/QuotationOutputModel';
import { AppNotificationLogModel } from 'src/app/request-logs/app-notifications/models/app-notification-log-model';
import { AllTypeSMSRenewalLogModel } from 'src/app/request-logs/sms-renewal-log/sms-renewal-log-model';

@Injectable()
export class RequestLogsService extends ApiService {

  public requestLogsFilter: RequestLogsFilter = new RequestLogsFilter();
  public smsLogFilter: SMSLogFilter = new SMSLogFilter();
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'service/';
  }

  getAllCheckoutRequestLogBasedOnFilter(body, params) {
    return super.post<CommonResponse<CheckoutRequestLogModel[]>>('getAllCheckoutRequestLogBasedOnFilter', body, params);
  }

  getCheckoutRequestLogDetails(Id) {
    return super.get<CommonResponse<CheckoutRequestLogModel>>('getCheckoutRequestLogDetails', `id=${Id}`);
  }

  getAllInquiryRequestLogBasedOnFilter(body, params) {
    return super.post<CommonResponse<InquiryRequestLogModel[]>>('getAllInquiryRequestLogBasedOnFilter', body, params);
  }

  getInquiryRequestLogDetails(Id) {
    return super.get<CommonResponse<InquiryRequestLogModel>>('getInquiryRequestLogDetails', `id=${Id}`);
  }

  getAllQuotationRequestLogBasedOnFilter(body, params) {
    return super.post<CommonResponse<QuotationRequestLogModel[]>>('getAllQuotationRequestLogBasedOnFilter', body, params);
  }

  getQuotationRequestLogDetails(Id) {
    return super.get<CommonResponse<QuotationRequestLogModel>>('getQuotationRequestLogDetails', `id=${Id}`);
  }

getAllSMSLogBasedOnFilter(body, params) {
    return super.post<CommonResponse<SMSLogModel[]>>('getAllSMSLogBasedOnFilter', body, params);
  }
  getSMSLogExcelWithFilter(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('sms-excel', body);
  }

getInquiryRequestLogExcel(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('excel-inquiry-request', body);
  }

  getCheckoutRequestLogExcelWithFilter(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('excel-checkout-request', body);
  }

  getOldQuotationRequestLog(body): Observable<QuotationOutputModel> {
    return super.post<QuotationOutputModel>('get-old-quotation-details', body);
  }

  getAllAppNotificationLogBasedOnFilter(body, params) {
    return super.post<CommonResponse<any>>('getAllAppNotificationLogLogBasedOnFilter', body, params);
  }

  getAppNotificationLogExcelWithFilter(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('appNotification-excel', body);
  }
    getAllSMSRenewalLogBasedOnFilter(body): Observable<AllTypeSMSRenewalLogModel> {
    return super.post<AllTypeSMSRenewalLogModel>('getAllSMSRenewalLogBasedOnFilter', body);  }
}
