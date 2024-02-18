import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CommissionListingEditModel } from 'src/app/commission/commission-listing-edit-model';
import { UpdateOutput } from 'src/app/commission/commission.component';
import { CommonResponse } from '..';
import { environment } from '../../../environments/environment';
import { CommissionListing } from '../../commission/commission-listing';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommissionService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'invoice/';

  }

  getcommissionsWithFilter(companycode, producttype, pageIndex, pageSize)
                : Observable<CommonResponse<CommissionListing[]>> {
    return super.get<CommonResponse<CommissionListing[]>>('commissions-filter', `companycode=${companycode}&producttype=${producttype}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getcommissionsAsExcel(companycode, producttype): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('commissions-report-excel', `companycode=${companycode}&producttype=${producttype}`);
  }
  updatecommission(body) : Observable<CommonResponse<UpdateOutput>> {
    return super.post<CommonResponse<UpdateOutput>>('commission-updatecommission', body);
  }
   
}
