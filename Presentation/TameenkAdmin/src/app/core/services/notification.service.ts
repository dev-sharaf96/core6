import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CommonResponse, Notification } from '../models';
import { environment } from '../../../environments/environment';

/**
 *
 *
 * @export
 * @class NotificationService
 * @extends {ApiService}
 */
@Injectable()
export class NotificationService extends ApiService {
  /**
   * Creates an instance of NotificationService.
   * @constructor
   * @param {HttpClient} httpClient
   * @memberof PolicyService
   */
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'notification/';
  }
  /**
   * Get the insurance provider notifications
   *
   * @returns {Observable<CommonResponse<INotification[]>>}
   * @memberof NotificationService
   */
  getInsuranceProviderNotifications(): Observable<CommonResponse<Notification[]>> {
    return super.get<CommonResponse<Notification[]>>('insurance-provider');
  }
}
