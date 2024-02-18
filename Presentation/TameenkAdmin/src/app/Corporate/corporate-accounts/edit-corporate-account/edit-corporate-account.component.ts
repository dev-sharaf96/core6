import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService, LocalizationService } from '../../../core';
import { CorporateService } from '../../../core/services/corporate.service';
import { CorporateNewAccountModel } from '../models/corporate-new-account-model';

@Component({
  selector: 'app-edit-corporate-account',
  templateUrl: './edit-corporate-account.component.html',
  styleUrls: ['./edit-corporate-account.component.css']
})
export class EditCorporateAccountComponent implements OnInit {
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
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this._corporateService.getCorporateAccount(this.id).subscribe(account => {
        this.account = account.data;
      });
    } else {
      this.account.nameAr = '';
      this.account.nameEn = '';
      this.account.balance = 0;
    }
    this.accesToken = this._authenticationService.getUserToken();
  }

  displayFieldCss(field) {
    return { 'has-error': field.invalid && this.submitted };
  }

  onSubmit() {
    this.clicked = true;
    console.log('account data ', this.account);
    this.submitted = true;
    if (this.accesToken && this.accesToken.userName) {
      this.editAccount();
    } else {
      this.clicked = false;
      this._toastrService.error('Please sign in first');
    }
  }

  editAccount() {
    this._corporateService.updateAccount(this.account).subscribe(data => {
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
