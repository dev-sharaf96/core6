import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommonResponse, IIdNamePairModel } from '..';
import { Payment } from 'src/app/payments/payments-model';
import { PaymentsFilter } from 'src/app/payments/payments-filter';
import { HyperPayResponse } from '../models';
import { EdaatNotificationOutput } from 'src/app/payments/edaat-notification/edaat-notification-model';
import { EdaatFilter } from 'src/app/payments/edaat-notification/edaat-notification-filter';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends ApiService {
  public paymentsFilter: PaymentsFilter = new PaymentsFilter();
  public edaatFilter: EdaatFilter = new EdaatFilter();
  
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'payment/';
  }

  getPaymentMethods(): Observable<CommonResponse<IIdNamePairModel[]>> {
    return super.get<CommonResponse<IIdNamePairModel[]>>('method');
  }

  getFailPaymentsWithFilter(body, params): Observable<CommonResponse<Payment[]>> {
    return super.post<CommonResponse<Payment[]>>('fail-pending', body, params);
  }
  getFailDetails(ref): Observable<CommonResponse<Payment>> {
    return super.get<CommonResponse<Payment>>('fail-details', `referenceId=${ref}`);
  }
  reproccessFail(hyperPayResponse:HyperPayResponse) {
    return super.post<CommonResponse<boolean>>('fail-reproccess', hyperPayResponse);
  }

  getEdaatNotificationWithFilter(body, params): Observable<CommonResponse<EdaatNotificationOutput[]>> {
    return super.post<CommonResponse<EdaatNotificationOutput[]>>('edaat-notification', body, params);
  }
}
