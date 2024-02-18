import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IPromotionsSettings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PromotionSettingsService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'settings/';
  }

  getSettings(): Observable<IPromotionsSettings> {
    return super.get<IPromotionsSettings>('get');
  }
  saveSettings(body: IPromotionsSettings): Observable<any> {
    return super.post<any>('save', body);
  }
}
