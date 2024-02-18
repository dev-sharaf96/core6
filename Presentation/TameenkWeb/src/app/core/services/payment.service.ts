import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CommonResponse, CheckoutResponse } from '..';
import { IAddItemToCart } from '../models/add-item-to-cart.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends ApiService {
  SadadData: any;
  checkoutDetails: CheckoutResponse;
  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.quotationApiUrl + 'checkout/';
  }
  addItemToCart(body): Observable<CommonResponse<IAddItemToCart>> {
    return super.post<CommonResponse<IAddItemToCart>>('AddItemToCart', body);
  }
  getCheckoutDetails(ReferenceId, QtRqstExtrnlId): Observable<CommonResponse<CheckoutResponse>> {
    return super.get<CommonResponse<CheckoutResponse>>('CheckoutDetails', `ReferenceId=${ReferenceId}&QtRqstExtrnlId=${QtRqstExtrnlId}`);
  }
  SubmitCheckoutDetails(body): Observable<any> {
    return super.post<any>('SubmitCheckoutDetails', body);
  }
  GetPaymentMethods(): Observable<CommonResponse<number[]>> {
    return super.get<CommonResponse<number[]>>('GetPaymentMethods');
  }
}
