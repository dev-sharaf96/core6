import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponse } from '..';
import { environment } from '../../../environments/environment';
import { OccupationListing } from '../../occupation/occupation-listing';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OccupationService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'service/';
  }

  getOccupationsWithFilter(code, desc, pageIndex, pageSize)
                : Observable<CommonResponse<OccupationListing[]>> {
    return super.get<CommonResponse<OccupationListing[]>>('occupations-filter', `code=${code}&description=${desc}
                                                                      &pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getOccupationsAsExcel(code, desc): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('occupations-excel', `code=${code}&description=${desc}`);
  }

  getOccupationDetailsById(id: number): Observable<CommonResponse<OccupationListing>> {
    return super.get<CommonResponse<OccupationListing>>('occupation-details', `id=${id}`);
  }

  checkOccupationCode(body): Observable<CommonResponse<boolean>> {
    return super.post<CommonResponse<boolean>>('occupation-checkOccupationCodeExist', body);
  }

  addOrupdateOccupation(body, params): Observable<CommonResponse<GeneratePolicyRes>> {
    return super.post<CommonResponse<GeneratePolicyRes>>('occupation-addOrUpdateOccupation', body, params);
  }
}
