import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, IIdNamePairModel } from '../../../core/models';
import { AuthenticationService, LocalizationService } from '../../../core/services';
import { CorporateService } from '../../../core/services/corporate.service';
import { CorporateNewUserModel } from '../models/corporate-new-user-model';

@Component({
  selector: 'app-corporate-edit-users',
  templateUrl: './corporate-edit-users.component.html',
  styleUrls: ['./corporate-edit-users.component.css']
})
export class CorporateEditUsersComponent implements OnInit {
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
    this.accounts = [];
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this._corporateService.getCorporateUser(this.id).subscribe(user => {
        this.user = user;
      });
    }
    this.accesToken = this._authenticationService.getUserToken();
    this.GetAllAccounts();
  }

  GetAllAccounts() {
    const lang = this._localizationService.getCurrentLanguage().twoLetterIsoCode;
    this._corporateService.getAllCorporateAccounts(lang).subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.accounts = data.data;
      console.log('accounts data ', data);
      console.log('accounts data.data ', data.data);
      console.log('this.accounts data ', this.accounts);
      lang === 'en' ? this.accounts.unshift({id: null, name: 'all'}) : this.accounts.unshift({id: null, name: 'الكل'});
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
    console.log('user data ', this.user);
    this.submitted = true;
    if (this.accesToken && this.accesToken.userName) {
      this.editUser();
    } else {
      this.clicked = false;
      this._toastrService.error('Please sign in first');
    }
  }

  editUser() {
    this._corporateService.updateUser(this.user).subscribe(data => {
      console.log('data ', data);
      console.log('data.data ', data.data);
      const result = data.data;
      if (result.Result.errors) {
        result.Result.errors.forEach(error => {
          this._toastrService.error(error.Message);
        });
      } else {
        this.submitted = false;
        this._toastrService.success('تم بنجاح');
        this._router.navigate(['/admin/corporate']);
      }
    }, (error: any) => {
      this._toastrService.error(error.Message);
    });
  }


}
