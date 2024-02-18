import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, LocalizationService } from '../../../core/services';
import { CorporateService } from '../../../core/services/corporate.service';
import { CorporateNewAccountModel } from '../models/corporate-new-account-model';

@Component({
  selector: 'app-add-corporate-account',
  templateUrl: './add-corporate-account.component.html',
  styleUrls: ['./add-corporate-account.component.css']
})
export class AddCorporateAccountComponent implements OnInit {
  account: CorporateNewAccountModel = new CorporateNewAccountModel();
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
    this.account.nameAr = '';
    this.account.nameEn = '';
    this.account.balance = 0;
    this.accesToken = this._authenticationService.getUserToken();
  }

  displayFieldCss(field) {
    return { 'has-error': field.invalid && this.submitted };
  }

  onSubmit() {
    this.clicked = true;
    this.submitted = true;
    if (this.accesToken && this.accesToken.userName) {
      this.account.createdBy = this.accesToken.userName;
      this.addUser();
    } else {
      this.submitted = false;
      this.clicked = false;
      this._toastrService.error('Please sign in first');
    }
  }

  addUser() {
    this._corporateService.addNewAccount(this.account).subscribe(data => {
      let result = data;
      if (result.ErrorCode === 1) {
        this._toastrService.success('تم بنجاح');
        this._router.navigate(['/admin/corporate/account']);
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
