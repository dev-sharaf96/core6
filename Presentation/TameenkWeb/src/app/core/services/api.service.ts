import { Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalizationService } from './localization.service';
/**
 * @export
 * @class ApiService
 */
export abstract class ApiService {
  /**
   * Base Api Url
   *
   * @protected
   * @memberof ApiService
   */
  protected apiUrl = 'https://www.bcare.com.sa/QuotationApiTest/api/';
  _localizationService: LocalizationService;
  _http: HttpClient;
  // private apiUrl = 'http://localhost:7001/api/';
  /**
   *Creates an instance of ApiService.
   * @param {HttpClient} http
   * @memberof ApiService
   */
  constructor(private injector: Injector) {
    this._http = injector.get(HttpClient);
    this._localizationService = injector.get(LocalizationService);
  }

  /**
   *
   *
   * @private
   * @param {*} error
   * @returns
   * @memberof ApiService
   */
  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.statusText}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }


// formatErrors
  private formatErrors(error: any) {
    return throwError(error.error);
}
  /**
   * get() generic http get method
   *
   * @template T
   * @param {string} path
   * @param {HttpParams} [params=null]
   * @returns {Observable<T>}
   * @memberof ApiService
   */
  get<T>(path: string, params = null, hdrs = null): Observable<T> {
    if (typeof (params) === 'string') {
      params = new HttpParams({ fromString: params });
    }
    const headers = hdrs || this.buildCommonHeader();
    return this._http.get<T>(`${this.apiUrl}${path}`, { headers, params }).pipe(
      tap(
        data => data,
        error => error
      ), catchError(this.formatErrors));
  }
  /**
   * post() generic http post method
   *
   * @template T
   * @param {string} path
   * @param {any} body
   * @param {HttpParams} [params=null]
   * @returns {Observable<T>}
   * @memberof ApiService
   */
  post<T>(path: string, body: any, params = null, hdrs = null): Observable<T> {
    params = new HttpParams({ fromString: params });
    const headers = hdrs || this.buildCommonHeader();
    return this._http.post<T>(`${this.apiUrl}${path}`, body, { headers, params }).pipe(
      tap(
        data => data,
        error => error
      ), catchError(this.formatErrors));
  }

  private buildCommonHeader(): HttpHeaders {
    return new HttpHeaders({
      // 'Allow-Control-Allow-Origin':  '*',
      // 'Content-Type':  'application/json',
      // 'Access-Control-Allow-Credentials':  'true',
      // 'Access-Control-Expose-Headers':  'FooBar',
      // 'Access-Control-Allow-Methods': 'GET',
      // 'Access-Control-Allow-Headers': 'Origin, Content-Type',
      // 'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Language': this._localizationService.getCurrentLanguage().id.toString()
    });
  }
}