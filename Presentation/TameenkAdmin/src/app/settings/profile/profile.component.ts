import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountService, AuthenticationService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
pass = {
  OldPassword: '',
  NewPassword: '',
  ConfirmPassword: ''
};
name: string;
passLoading = false;
nameLoading = false;
  constructor(
    private _accountService: AccountService,
    private _toastrService: ToastrService,
    private _authService: AuthenticationService
    ) { }

  ngOnInit() {
    const user = this._authService.getUserToken();
    this.name = user ? user.name : '';
  }

  changePassword(form) {
    if (form.valid && !this.passLoading) {
      this.passLoading = true;
      this._accountService.changePassword(this.pass).subscribe((d) => {
        this.passLoading = false;
        this._toastrService.success('تم بنجاح');
      }, (error: any) => {
        this.passLoading = false;
        this._toastrService.error(error.Message);
      });
    }
  }
  changeName(form) {
    if (form.valid && !this.nameLoading) {
      this.nameLoading = true;
      this._accountService.changeName(form.value).subscribe((d) => {
        this.nameLoading = false;
        this._toastrService.success('تم بنجاح');
        this._authService.setUserName(form.value.Name);
      }, (error: any) => {
        this.nameLoading = false;
        this._toastrService.error(error.Message);
      });
    }
  }
}
