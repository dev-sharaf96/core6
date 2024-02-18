import { Component, OnInit } from '@angular/core';
import { PolicyService, CommonResponse, IBank, LocalizationService, UserService, IUser, AuthService } from 'src/app/core';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {
banksList: IBank[];
userInfo: IUser;
totalCount: number;
loading = false;
  constructor(
    private _policyService: PolicyService,
    private _userService: UserService,
    private _localizationService: LocalizationService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.getUserBanks();
    this._userService.getUserInfo(this._authService.getUserId()).subscribe((data: CommonResponse<IUser>) => {
      this.userInfo = data.data;
    },
    (error: any) => error);
  }
  getUserBanks(paging?) {
    this.loading = true;
    this._policyService.getUserBanks(this._authService.getUserId(), paging).subscribe((data: CommonResponse<IBank[]>) => {
      this.loading = false;
      this.banksList = data.data;
      this.totalCount = data.totalCount;
      this.banksList.forEach(b => {
        b.description = this._localizationService.getCurrentLanguage().id === 2
        ? b.englishDescription
        : b.arabicDescription;
      });
    },
    (error: any) => error);
  }
}
