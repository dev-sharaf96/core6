import { AuthenticationService, LocalizationService } from '../../core/services';
import { Component, OnInit } from '@angular/core';

import { AutoleasingBankWalletFilter } from './models/autoleasing-bankwallet-filter';
import { AutoleasingWalletService } from 'src/app/core/services/autoleasing-wallet.service';
import { BankAccountModel } from './models/autoleasing-bank-model';
import { CommonResponse } from '../../core/models';
import { CorporateService } from '../../core/services/corporate.service';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WalletAddBalanceModel } from './models/wallet-add-balance-model';

@Component({
  selector: 'app-autoleasing-wallet',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {
  filterModel = new AutoleasingBankWalletFilter();
  accounts: BankAccountModel[];
  dataCount;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  isEdit: boolean;
  loading: boolean;
  clicked = false;
  today = new Date();
  showBalancePopup: boolean;
  balanceIsError: boolean;
  accesToken;
  walletBalance: WalletAddBalanceModel;
  balance?:Number;
  event;

  constructor(private _localizationService: LocalizationService,
    private _autoleasingWalletService: AutoleasingWalletService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.accesToken = this._authenticationService.getUserToken();
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.loading = false;
    this.showBalancePopup = false;
    this.balanceIsError = false;
    this.walletBalance = new WalletAddBalanceModel();
  }

  filterClick(e) {
    this.event = e;
    e.reset();
  }

  requestsLazyLoad(event) {
    this.clicked = true;
    this.loading = true;
    this.eventHolder = event;
    this._autoleasingWalletService.getAllBanksWithFilter(this.filterModel, `pageIndex=${(event.first / event.rows) + 1}&pageSize=${event.rows}`)
    .subscribe((data: CommonResponse<BankAccountModel[]>) => {
 
          if (data.data.length > 0) {
             const uesrsData=data.data;
            console.log(data.data);
            uesrsData.forEach(account => {
              if (account.isActive === true) {
                account.isActive = true;
              } else {
                account.isActive = false;
              }
            });
           this.accounts = data.data;
          } 
          else {
            this.accounts = [];
          }

          this.dataCount = data.totalCount;
          this.loading = false;
          this.clicked = false;
        }, (error: any) => {
          this.loading = false;
          this.clicked = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        });
  }

  EditUser(userID) {
    this._router.navigate(['/corporate/account'], { queryParams: { userId: userID } });
  }

  ShowUpdateBalancePopup(bankId, balance,transactionTypeId) {
    this.walletBalance = new WalletAddBalanceModel();
    this.walletBalance.bankId = bankId;
    this.walletBalance.balance = null;
    this.walletBalance.transactionTypeId=transactionTypeId;
    console.log(this.walletBalance);
    this.showBalancePopup = true;
  }

  CloseUpdateBalancePopup(){
    this.showBalancePopup = false;
  }

  changeStateByType(event, bankId , Walletstatues: number,automatic:Boolean) {
    this.loading = true;
    this._autoleasingWalletService
      .toggleCompanyActivationByType(event.checked, bankId, Walletstatues)
      .subscribe(
        (data: CommonResponse<BankAccountModel>) => {
          this.loading = false;
            console.log(data.data);
           
        },
        (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }
 

  UpdateAccountbalance() {
    console.log(this.walletBalance);
       this.clicked = true;
  this._autoleasingWalletService.updateBank(this.walletBalance).subscribe(data => {

    let result = data;
    if (result.ErrorCode === 1) {
      this.CloseUpdateBalancePopup();
      this.requestsLazyLoad(this.event);
      this._toastrService.success(result.ErrorDescription);
    } else {
      this.clicked = false;
      this._toastrService.error(result.ErrorDescription);
    }
  }, (error: any) => {
    this.clicked = false;
    this._toastrService.error(error.Message);
  });
   }
}
