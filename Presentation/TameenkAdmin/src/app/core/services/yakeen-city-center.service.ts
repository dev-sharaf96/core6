import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { CommonResponse } from '..';
import { Observable } from 'rxjs';
import { YakeenCityCenterListing } from '../../yakeen-city-center/yakeen-city-center-listing';

@Injectable({
  providedIn: 'root'
})
export class YakeenCityCenterService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'YakeenCetyCenter/';
  }

  addNewYakeenCityCenter(body): Observable<CommonResponse<GeneratePolicyRes>> {
    return super.post<CommonResponse<GeneratePolicyRes>>('new', body);
  }

  getAllWithFilter(cityId, cityName, zipCode, elmCode, pageIndex, pageSize)
                : Observable<CommonResponse<YakeenCityCenterListing[]>> {
    return super.get<CommonResponse<YakeenCityCenterListing[]>>('all-withFilter', `cityId=${cityId}&cityName=${cityName}
                                                                      &zipCode=${zipCode}&elmCode=${elmCode}
                                                                      &pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getCitiesExcel(cityId, cityName, zipCode, elmCode): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('export', `cityId=${cityId}&cityName=${cityName}
                                                        &zipCode=${zipCode}&elmCode=${elmCode}`);
  }

}
