import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from '../../core/models';
import { AuthenticationService, LocalizationService } from '../../core/services';
import { CorporateService } from '../../core/services/corporate.service';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { CorporateAccountFilter } from './models/corporate-account-filter';
import { CorporateAccountModel } from './models/corporate-account-model';
import { WalletAddBalanceModel } from './models/wallet-add-balance-model';

@Component({
  selector: 'app-corporate-accounts',
  templateUrl: './corporate-accounts.component.html',
  styleUrls: ['./corporate-accounts.component.css']
})
export class CorporateAccountsComponent implements OnInit {
  filterModel = new CorporateAccountFilter();
  accounts: CorporateAccountModel[];
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
  event;

  constructor(private _localizationService: LocalizationService,
    private _corporateService: CorporateService,
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
    this._corporateService.getAllCorporateAccountsWithFilter(this.filterModel, `pageIndex=${(event.first / event.rows) + 1}&pageSize=${event.rows}`)
    .subscribe((data: CommonResponse<CorporateAccountModel[]>) => {
          if (data.data.length > 0) {
            const uesrsData = data.data;
            uesrsData.forEach(account => {
              if (account.isActive === true) {
                account.isActive = true;
              } else {
                account.isActive = false;
              }
            });
            this.accounts = uesrsData;
          } else {
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

  ShowUpdateBalancePopup(accountId, transactionTypeId) {
    this.walletBalance = new WalletAddBalanceModel();
    this.walletBalance.id = accountId;
    this.walletBalance.transactionTypeId = transactionTypeId;
    this.showBalancePopup = true;
  }

  CloseUpdateBalancePopup(){
    this.showBalancePopup = false;
  }

  manageUserActive(accountId, active) {
    if (confirm('Are you sure ?')) {
      this.clicked = true;
      this.loading = true;
      let lockedAccount = new CorporateAccountModel();
      lockedAccount.id = accountId;
      lockedAccount.lang = this.isEnglish ? 'en' : 'ar';
      this._corporateService.manageAccountLock(lockedAccount)
        .subscribe((data: CommonResponse<GeneratePolicyRes>) => {
          if (data.data.ErrorCode !== 1) {
            this.clicked = false;
            this.loading = false;
            this._toastrService.error(data.data.ErrorDescription);
          } else {
            this.accounts.filter(a => a.id === accountId).map(a => a.isActive = !active);
            this.clicked = false;
            this.loading = false;
          }
        },
          (error: any) => {
            this.clicked = false;
            this.loading = false;
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.code, item.description);
              });
            }
          }
        );
    }
  }

  UpdateAccountbalance() {
    if(this.walletBalance.amount <= 0) {
      this.balanceIsError = true;
      this.clicked = false;
      return false;
    } else {
      this.balanceIsError = false;
      this.clicked = true;
      if (this.accesToken && this.accesToken.userName) {
        this.walletBalance.balanceAddedBy = this.accesToken.userName;
        this.UpdateAccountBalance();
      } else {
        this.clicked = false;
        this._toastrService.error('Please sign in first');
      }
    }
  }

  UpdateAccountBalance() {
    this._corporateService.updateWalletBalance(this.walletBalance).subscribe(data => {
      let result = data.data;
      if (result.ErrorCode === 1) {
        this.requestsLazyLoad(this.event);
        this.CloseUpdateBalancePopup();
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
