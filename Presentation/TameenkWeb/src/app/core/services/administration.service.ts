import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { CommonResponse, IInsuranceCompany } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationApiUrl + 'insurance-company/';
  }

  getInsuranceCompanies(): Observable<CommonResponse<IInsuranceCompany[]>> {
    return super.get<CommonResponse<IInsuranceCompany[]>>('all');
  }
}
