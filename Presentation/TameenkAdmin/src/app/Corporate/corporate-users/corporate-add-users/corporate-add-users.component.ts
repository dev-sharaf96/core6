import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, IIdNamePairModel } from '../../../core/models';
import { AuthenticationService, LocalizationService } from '../../../core/services';
import { CorporateService } from '../../../core/services/corporate.service';
import { CorporateNewUserModel } from '../models/corporate-new-user-model';

@Component({
  selector: 'app-corporate-add-users',
  templateUrl: './corporate-add-users.component.html',
  styleUrls: ['./corporate-add-users.component.css']
})
export class CorporateAddUsersComponent implements OnInit {
  user: CorporateNewUserModel = new CorporateNewUserModel();
  accounts: any[];
  submitted = false;
  id: string;
  accesToken;
  clicked = false;

  constructor(private _corporateService: CorporateService,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user.email = '';
    this.user.password = '';
    this.user.phoneNumber = '';
    this.user.isSuperAdmin = false;
    // this.user.accountId = 0;
    this.accounts = [];
    this.accesToken = this._authenticationService.getUserToken();
    this.GetAllAccounts();
  }

  GetAllAccounts() {
    const lang = this._localizationService.getCurrentLanguage().twoLetterIsoCode;
    this._corporateService.getAllCorporateAccounts(lang).subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.accounts = data.data;
      // lang === 'en' ? this.accounts.unshift({id: 0, name: 'all'}) : this.accounts.unshift({id: 0, name: 'الكل'});
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }

  displayFieldCss(field) {
    return {
      'has-error': field.invalid && this.submitted
    };
  }

  onSubmit() {
    this.clicked = true;
    this.submitted = true;
    if (this.accesToken && this.accesToken.userName) {
      this.user.createdBy = this.accesToken.userName;
      this.addUser();
    } else {
      this.clicked = false;
      this._toastrService.error('Please sign in first');
    }
  }

  addUser() {
    this._corporateService.addNewUser(this.user).subscribe(data => {
      let result = data;
      if (result.ErrorCode === 1) {
        this._toastrService.success('تم بنجاح');
        this._router.navigate(['/admin/corporate']);
        this.submitted = false;
        this.clicked = false;
      } else {
        this.submitted = false;
        this.clicked = false;
        result.Result.errors.forEach(error => {
          this._toastrService.error(error.Message);
        });
      }
    }, (error: any) => {
      this.clicked = false;
      this._toastrService.error(error.Message);
    });
  }

}
