import { Component, OnInit } from '@angular/core';
import { PolicyService, IUserInvoice, CommonResponse, UserService, IUser, LocalizationService, AuthService } from 'src/app/core';

@Component({
  selector: 'app-purchases-log',
  templateUrl: './purchases-log.component.html',
  styleUrls: ['./purchases-log.component.css']
})
export class PurchasesLogComponent implements OnInit {
invoices: IUserInvoice[];
userInfo: IUser;
totalCount: number;
loading = false;
  constructor(
    private _localizationService: LocalizationService,
    private _policyService: PolicyService,
    private _userService: UserService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.getUserAllInvoices();
  }
  getUserAllInvoices(paging?) {
    this.loading = true;
    this._policyService.getUserAllInvoices(this._authService.getUserId(), paging)
    .subscribe((data: CommonResponse<IUserInvoice[]>) => {
      this.loading = false;
      this.invoices = data.data;
      this.totalCount = data.totalCount;
      this.invoices.forEach(invoice => {
          invoice.insuranceCompanyName = this._localizationService.getCurrentLanguage().id === 2
        ? invoice.insuranceCompanyNameEn
        : invoice.insuranceCompanyNameAr;
      });
    },
    (error: any) => error);
    this._userService.getUserInfo(this._authService.getUserId()).subscribe((data: CommonResponse<IUser>) => {
      this.userInfo = data.data;
    },
    (error: any) => error);
  }
  downloadInvoice(fileId) {
    this._policyService.downloadUserInvoice(fileId).subscribe((data: CommonResponse<string>) => {
      const a = document.createElement('a');
      a.href = 'data:application/pdf;base64,' + data.data;
      a.download = 'invoice';
      document.body.appendChild(a);
      a.click();
    },
    (error: any) => error);
  }
}
