import { Injectable, Injector } from '@angular/core';

import { ApiService } from './api.service';

import { environment } from '../../../environments/environment';

import { IEsalInvoice } from '../models/EsalInvoice.Model';

/**
* @export
* @class insuranceCompanyService
* @extends {ApiService}
*/
@Injectable({
  providedIn: 'root'
})
export class EsalInvoicesService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl;
  }

  loadSearchResult(InvoiceNumber: string, SadadBillsNumber: string, ReferenceId: string, IsPaid: boolean | null) {
    var paramters = [];
    if (InvoiceNumber) {
      paramters.push(`InvoiceNumber=${InvoiceNumber}`);
    }
    if (SadadBillsNumber) {
      paramters.push(`SadadBillsNumber = ${SadadBillsNumber}`);
    }
    if (ReferenceId) {
      paramters.push(`ReferenceId=${ReferenceId}`);
    }
    if (IsPaid !== null) {
      paramters.push(`IsPaid=${IsPaid}`);
    }
    return super.get<IEsalInvoice[]>('Esal/all-filter', paramters.join('&'));

  }

}
