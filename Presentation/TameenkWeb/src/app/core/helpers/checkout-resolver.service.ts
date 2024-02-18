import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { PaymentService, CommonResponse, CheckoutResponse } from '..';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CheckoutResolverService implements Resolve<CommonResponse<CheckoutResponse>> {
  constructor(private _paymentService: PaymentService, private _router: Router, private _toster: ToastrService) { }
  // resolve(_route: ActivatedRouteSnapshot) {
    // if (_route.queryParams.referenceId && _route.queryParams.RequestId) {
    //   return this._paymentService.getCheckoutDetails(_route.queryParams.referenceId, _route.queryParams.RequestId);
    // } else {
    //   this._router.navigate(['/']);
    // }
  // }
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<CommonResponse<CheckoutResponse>> {

      if (route.queryParams.referenceId && route.queryParams.RequestId) {
        return this._paymentService.getCheckoutDetails(route.queryParams.referenceId, route.queryParams.RequestId).map(checkout => {
          if (checkout) {
              return checkout;
          }
          this._router.navigate(['/']);
          return null;
      })
      .catch(error => {
          this._toster.error(error.Message);
          this._router.navigate(['/']);
          return Observable.of(null);
      });
      } else {
        this._router.navigate(['/']);
      }
    }
}
