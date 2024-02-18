import { Injectable, Injector } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonResponse, IQuotationResponse, IUserQuotationResponse, IProduct } from 'src/app/core';

/**
 * @export
 * @class QuotationService
 */
@Injectable({
  providedIn: 'root'
})
export class QuotationService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.quotationApiUrl;
  }

  /**
   *
   * @param {HttpParams} params
   * @returns {Observable<IQuotationResponse>}
   * @memberof QuotationService
   */
  getQuotaion(params: HttpParams): Observable<CommonResponse<IQuotationResponse>> {
    return super.get<CommonResponse<IQuotationResponse>>('quote/', params);
  }
  getUserOffersCount(id): Observable<CommonResponse<number>> {
    return super.get<CommonResponse<number>>('quotation/user-offers/', `id=${id}`);
  }
  getUserOffers(id, paging = environment.defaultPaging): Observable<CommonResponse<IUserQuotationResponse[]>> {
    return super.get<CommonResponse<IUserQuotationResponse[]>>('quotation/user-quotation-request/', `userId=${id}${paging}`);
  }
  getLowestProduct(qtRqstExtrnlId): Observable<CommonResponse<IProduct>> {
    return super.get<CommonResponse<IProduct>>('quotation/lowest-product/', `qtRqstExtrnlId=${qtRqstExtrnlId}`);
  }
}
