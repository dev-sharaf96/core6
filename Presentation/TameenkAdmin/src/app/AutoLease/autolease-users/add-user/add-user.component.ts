import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, CommonResponse, IIdNamePairModel, LocalizationService, UserToken } from '../../../core';
import { AutoleaseService } from '../../../core/services/autolease.service';
import { AutoleaseUser, AutoleaseUserModel } from '../models/autolease-user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  newUser: AutoleaseUserModel = new AutoleaseUserModel();
  user: AutoleaseUser = new AutoleaseUser();
  banks: any[];
  submitted = false;
  id: string;
  accesToken;
  clicked = false;

  constructor(private _autoLeaseService: AutoleaseService,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user.email = '';
    this.user.fullName = '';
    this.user.password = '';
    this.user.mobile = '';
    this.user.isSuperAdmin = false;
    this.banks = [];
    this.accesToken = this._authenticationService.getUserToken();
    this.GetAllBanks();
  }

  GetAllBanks() {
    const lang = this._localizationService.getCurrentLanguage().twoLetterIsoCode;
    this._autoLeaseService.getAllBanks(lang).subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.banks = data.data;
      console.log('banks data ', data);
      console.log('banks data.data ', data.data);
      console.log('this.banks data ', this.banks);
      lang === 'en' ? this.banks.unshift({id: null, name: 'all'}) : this.banks.unshift({id: null, name: 'الكل'});
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
    this.user.isSuperAdmin = true;
    console.log('user data ', this.user);
    this.submitted = true;
    if (this.accesToken && this.accesToken.userName) {
      this.newUser.CreatedBy = this.accesToken.userName;
      this.newUser.users = [];
      this.newUser.users.push(this.user);
      this.addUser();
    } else {
      this.clicked = false;
      this._toastrService.error('Please sign in first');
    }
  }

  addUser() {
    console.log('this.newUser ', this.newUser);
    this._autoLeaseService.addNewUser(this.newUser).subscribe(data => {
      console.log('data ', data);
      console.log('data.data ', data.data);
      const result = data.data;
      if (result.Result.errors) {
        result.Result.errors.forEach(error => {
          this._toastrService.error(error.Message);
        });
      } else {
        this._toastrService.success('تم بنجاح');
        this._router.navigate(['/admin/usersAutolease']);
        this.submitted = false;
        this.clicked = false;
      }
    }, (error: any) => {
      this.clicked = false;
      this._toastrService.error(error.Message);
    });
  }

}
