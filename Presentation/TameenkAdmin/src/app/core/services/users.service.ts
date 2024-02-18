import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService {
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'users/';
  }

  getAllUsers(): Observable<User[]> {
    return super.get<User[]>('getAll');
  }
  updateUser(body): Observable<any> {
    return super.post<any>('update', body);
  }
  getUser(id): Observable<User> {
    return super.get<User>('get/' + id);
  }
}
