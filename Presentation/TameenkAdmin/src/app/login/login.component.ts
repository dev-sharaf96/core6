import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserToken, User, UsersService, AccountService, CommonResponse } from '../core';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SMSLogModel } from '../request-logs/sms-log/sms-log-model';
import * as CryptoJS from 'crypto-js';
import { ICaptcha } from '../core/models/captcha';
import { ValidationErrors } from '../captcha/validation-errors';

// import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errors: string[];
_userToken: UserToken;
  showConfirmationCodePpUp = false;
  verificationCode: string;
  userModel: UserModel = new UserModel();
  verificationModel: SMSLogModel = new SMSLogModel();
  userName;
  password;
  captcha: boolean;
  captchaModel = {
    captchaToken: '',
    captchaInput: ''
  };
  isDisable = false;
  validationErrors: ValidationErrors = new ValidationErrors();
  image;
  isExpired = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private userService: UsersService,
    private accountService: AccountService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getCaptcha();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      captchaInput: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/';
  }

  getCaptcha() {
    this._authenticationService.getCaptcha().subscribe((result: CommonResponse<ICaptcha>) => {
      this.isExpired = false;
      this.image = result.data.image;
      this.captchaModel.captchaToken = result.data.token;
      this.captchaModel.captchaInput = null;
      this.expiredCounter(result.data.expiredInSeconds);
    });
  }

  expiredCounter(expiredInSeconds) {
    this.validationErrors.captcha["captchaImg"] = [];
    setTimeout(() => {
      this.isExpired = true;
      this.validationErrors.captcha["captchaImg"].push("captcha.Captcha_expired");
    }, expiredInSeconds * 1000);
  }
  checkCaptchaInput(e): boolean {
    this.validationErrors.captcha["captchaInput"] = [];
    if (e.target.value.length === 4 && !this.isExpired) {
      return true;
    } else {
      return false;
    }
  }
  isValid(propName: string): Boolean {
    return (
      this.validationErrors.captcha[propName] &&
      this.validationErrors.captcha[propName].length > 0
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  restrictNumeric(e) {
    if(e.keyCode >= 48 && e.keyCode <= 57) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.isDisable = true;
    this.errors = [];
    const captcha = {
      token: this.captchaModel.captchaToken ,
      input: this.captchaModel.captchaInput
    };
    // this.authenticationService.validateCaptcha(captcha).subscribe(data => {
    //   this.sendVerificationCode(this.captchaModel.captchaToken, this.captchaModel.captchaInput);
    // }, (error: any) => {
    //   this.loading = false;
    //   this.isDisable = false;
    //   this._toastrService.error(error.errors[0].description);
    // });
    this.verificationCode = '';
    this.sendVerificationCode(this.captchaModel.captchaToken, this.captchaModel.captchaInput);
  }

  sendVerificationCode(captchaToken, captchaInput) {
    console.log('sendVerificationCode');
    console.log(this.f);
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      this.userModel.CaptchaToken = captchaToken;
      this.userModel.CaptchaInput = this.encryptData(this.f.captchaInput.value).toString();
      this.userModel.UserName = this.encryptData(this.f.email.value).toString();
      this.userModel.Password = this.encryptData(this.f.password.value).toString();
      this.accountService.sendOtp(this.userModel).subscribe((data: SMSLogModel) => {
        if (data.errorCode === 1) {
          this.verificationModel = data;
          this.showConfirmationCodePpUp = true;
          this._toastrService.success(data.errorDescription);
        } else {
          this._toastrService.error(data.errorDescription);
        }
        this.loading = false;
        this.isDisable = false;
      }, (error: any) => {
        this.loading = false;
        this.isDisable = false;
        this.errors = [error.error_description];
        this._toastrService.error(error.error_description);
      });
    }
  }

  sendVerificationCodeEncryptData(plainText) {
    var key = CryptoJS.enc.Utf8.parse('BcARe_2021_N0MeM');
    var iv = CryptoJS.enc.Utf8.parse('BcARe_2021_N0MeM');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), key,
      { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  }

encryptData(plainText) {
    var key = CryptoJS.enc.Utf8.parse('BcARe_2021_N0MeM');
    var iv = CryptoJS.enc.Utf8.parse('BcARe_2021_N0MeM');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), key,
      { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted;
  }
  closeCOnfirmationModal() {
    this.showConfirmationCodePpUp = false;
  }

  submitVerificationCode() {
    var email = this.encryptData(this.f.email.value);
    var password = this.encryptData(this.f.password.value);
    var code = this.encryptData(this.verificationCode);
    this.authenticationService.login(email, password, code).subscribe((userToken: UserToken) => {
      if (userToken && userToken.access_token) {
        userToken.changePassword = userToken.changePassword === 'True' ? true : false;
        this.authenticationService.setUserToken(userToken);
        if (userToken.changePassword) {
          this.router.navigate(['/s/profile']);
          this._translateService.get('login.changePasswordMsg').subscribe((res: string) => {
            this._toastrService.info(res);
          });
        } else {
          this.router.navigate([this.returnUrl]);
        }
      }
      this.loading = false;
      this.submitted = false;
    }, (error: any) => {
      this.verificationCode = '';
      this.loading = false;
      this.submitted = false;
      this.errors = [error.error_description];
      this._toastrService.error(error.error_description);
    });
}

  checkCaptcha(value) {
    this.captcha = value;
    if (this.captcha) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  }

}

export class UserModel {
  Password?: any;
  UserName: string;
  CaptchaToken: string;
  CaptchaInput: string;
}
