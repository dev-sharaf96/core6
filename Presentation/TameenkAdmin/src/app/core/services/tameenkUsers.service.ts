import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TameenkUser } from '../models';
import { UpdateCustomerModel } from '../models/UpdateCustomertModel';

@Injectable({
  providedIn: 'root'
})
export class TameenkUsersService extends ApiService {
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'TameenkUsers/';
  }

  getAllUsers(): Observable<TameenkUser[]> {
    return super.get<TameenkUser[]>('getAll');
  }
  updateUser(body): Observable<UpdateCustomerModel> {
    return super.post<any>('update', body);
  }
  getUser(id): Observable<TameenkUser> {
    return super.get<TameenkUser>('get/' + id);
  }
}
