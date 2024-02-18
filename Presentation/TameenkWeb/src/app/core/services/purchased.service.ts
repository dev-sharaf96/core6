import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class PurchasedService extends ApiService {

    constructor(private _injector: Injector) {
        super(_injector);
        this.apiUrl = environment.quotationApiUrl;
    }

    getPurchasedData(referenceId: string) {
        return this._http.get(this.apiUrl + 'Checkout/Purchased?referenceId=' + referenceId);
    }
}
