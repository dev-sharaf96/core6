import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, CommonResponse, IIdNamePairModel, LocalizationService } from '../../../core';
import { AutoleaseService } from '../../../core/services/autolease.service';
import { AutoleaseUser, AutoleaseUserModel } from '../models/autolease-user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: AutoleaseUser = new AutoleaseUser();
  banks: any[];
  submitted = false;
  id: string;
  isEditUser: boolean;
  accesToken;
  clicked = false;

  constructor(
    private _autoLeaseService: AutoleaseService,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user.email = '';
    this.user.fullName = '';
    this.user.password = '';
    this.user.mobile = '';
    this.banks = [];
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this._autoLeaseService.getAutoleaseUser(this.id).subscribe(user => {
        this.user = user;
      });
    }
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
    this._autoLeaseService.updateUser(this.user).subscribe(data => {
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
        this._router.navigate(['/admin/usersAutolease']);
      }
    }, (error: any) => {
      this._toastrService.error(error.Message);
    });
  }

}
