import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BankAccountModel } from '../../AutoleasingWallet/autoleasing-wallet/models/autoleasing-bank-model';
import { AutoleasingBankWalletFilter } from '../../AutoleasingWallet/autoleasing-wallet/models/autoleasing-bankwallet-filter';
import { WalletAddBalanceModel } from '../../AutoleasingWallet/autoleasing-wallet/models/wallet-add-balance-model';
import { CommonResponse, IIdNamePairModel } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AutoleasingWalletService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'AutoleasingWallet/';
  }
  getAllBanksWithFilter(body, params): Observable<CommonResponse<BankAccountModel[]>> {
    return super.post<CommonResponse<BankAccountModel[]>>('all-bank-account-with-Filter', body, params);
  }
  updateWalletBalance(body): Observable<any> {
    return super.post<any>('addBalanceToWallet', body);
  }

  updateBank(body): Observable<any> {
    return super.post<any>('EditBank', body);
  }
  toggleCompanyActivationByType(
    isActive: boolean,
    id: number,
    Walletstatues: number
  ): Observable<CommonResponse<BankAccountModel>> {
    return super.get<CommonResponse<BankAccountModel>>(
      'changeWalletStatues',
      `isActive=${isActive}&bankId=${id}&Walletstatues=${Walletstatues}`
    );
  }
}