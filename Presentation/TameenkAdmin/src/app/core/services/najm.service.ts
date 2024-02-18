import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { CommonResponse, IIdNamePairModel } from '..';
import { NajmResponseFilter } from 'src/app/najm/najm-filter';
import { NajmResponse } from 'src/app/najm/najm-model';
import { Observable, BehaviorSubject } from 'rxjs';
import { OutputModel } from '../models/output-model';

@Injectable()
export class NajmService extends ApiService {

  public najmResponseFilter: NajmResponseFilter = new NajmResponseFilter();

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl;

  }

  getNajmResponsesWithFilter(body, params) {
    return super.post<CommonResponse<NajmResponse[]>>('najm/getNajmResponsesBasedOnFilter', body, params);
  }
  deleteNajmResponse(id) {
    return super.get<CommonResponse<boolean>>('najm/deleteNajmResponse', `id=${id}`);
  }

  UpdateNajmResponse(body): Observable<CommonResponse<OutputModel>> {
    return super.post<CommonResponse<OutputModel>>('najm/UpdateNajmResponse', body);
  }
}
