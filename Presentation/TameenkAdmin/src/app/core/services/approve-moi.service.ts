import { Injectable, Injector } from '@angular/core';
import { MoiFilter } from 'src/app/approve-moi/moi-filter.model';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommonResponse } from '..';
import { Moi } from 'src/app/approve-moi/moi.model';

@Injectable({
  providedIn: 'root'
})
export class ApproveMoiService extends ApiService {
  public approveFilter: MoiFilter = new MoiFilter();
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'moi/';
  }

  getMoiRequests( params): Observable<CommonResponse<Moi[]>> {
    return super.get<CommonResponse<Moi[]>>('all', params);
  }

  changeMoiStatus(params): Observable<CommonResponse<Moi[]>> {
    return super.get<CommonResponse<Moi[]>>('change-status', params);
  }

  delete(params) {
    return super.get<CommonResponse<boolean>>('delete', params);
  }

  getImage(params) {
    return super.get<CommonResponse<string>>('getImage', params);
  }
}
