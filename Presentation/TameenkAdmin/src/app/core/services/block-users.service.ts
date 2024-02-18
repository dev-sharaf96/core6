import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlockedUsersModel } from 'src/app/block-users/block-users/Models/AddBlockedUsersModel';
import { BlockedUsersFilter } from 'src/app/block-users/block-users/Models/BlockedUsersFilter';
import { environment } from 'src/environments/environment';
import { CommonResponse } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlockUsersService extends ApiService {

  public blockedUsersFilter: BlockedUsersFilter = new BlockedUsersFilter();

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl;
  }

  postBlockedUser(body) {
    return super.post<CommonResponse<AddBlockedUsersModel>>('service/addBlockedNin', body);
  }

  getBlockedUsersWithFilter(body){
    return super.post<any>('service/getBlockNinsBasedOnFilter', body);
  }

  deleteBlockedUser(Id,Lang) {
    return super.post<CommonResponse<any>>('service/deleteBlockedNin?Id='+Id+'&Lang='+Lang,null);
  }
}
