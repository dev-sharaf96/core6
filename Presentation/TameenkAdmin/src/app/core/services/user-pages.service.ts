import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPagesService extends ApiService {
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'userPages/';
  }

  getUserPages(id): Observable<any> {
    return super.get<any>('getUserPages/' + id);
  }
  getUserPagesIds(id): Observable<any> {
    return super.get<any>('getUserPagesIds/' + id);
  }

  saveUserPages(id, body): Observable<any> {
    return super.post<any>('save/' + id, body);
  }
}
