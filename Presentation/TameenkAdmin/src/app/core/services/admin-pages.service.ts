import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Page } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminPagesService extends ApiService {
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'pages/';
  }

  getAllPages(): Observable<Page[]> {
    return super.get<Page[]>('getAll');
  }
  getActivePages(): Observable<Page[]> {
    return super.get<Page[]>('getActive');
  }
  getPage(id): Observable<Page> {
    return super.get<Page>('get/' + id);
  }
  deletePage(id): Observable<Page> {
    return super.post<Page>('delete/' + id, null);
  }
  addPage(body: Page): Observable<any> {
    return super.post<any>('Pages', body);
  }
  updatePage(body: Page): Observable<any> {
    return super.post<any>('update', body);
  }
}
