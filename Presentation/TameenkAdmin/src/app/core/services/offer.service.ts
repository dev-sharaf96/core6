import { OfferModel } from './../../offers/offer-model';
 
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonResponse } from '..';
import { environment } from '../../../environments/environment'; 
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'Offer/';
  }

  getOffersWithFilter( pageIndex, pageSize): Observable<CommonResponse<OfferModel[]>> {
    return super.get<CommonResponse<OfferModel[]>>('all-offers', `pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  addOffer(body): Observable<CommonResponse<OfferModel>> {
    return super.post<CommonResponse<OfferModel>>('add', body);
  }

  editOffer(body): Observable<CommonResponse<OfferModel>> {
    return super.post<CommonResponse<OfferModel>>('edit', body);
  }

  changeOfferStatus(body): Observable<CommonResponse<OfferModel>> {
    return super.post<CommonResponse<OfferModel>>('change-status', body);
  }


}
