import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AccountService, AuthService, UserService } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  mobilePattern = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  returnUrl: string;
  errors: string[];
  constructor(private formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _router: Router,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      confirmemail: ['', [Validators.required, this.emailConfirm]],
      mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern)]],
      password: ['', [Validators.minLength(4), Validators.required]]
    });
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  emailConfirm(c: AbstractControl): any {
    if (!c.parent || !c) {
      return;
    }
    const email = c.parent.get('email');
    const confirmemail = c.parent.get('confirmemail');
    if (!email || !confirmemail) {
      return;
    }
    if (!email || !confirmemail) {
      return ;
    }
    if (!email.value || !confirmemail.value) {
      return { notMatch: false };
    }
    if (confirmemail.errors.email) {
      return { notMatch: false };
    }
    if (email.value !== confirmemail.value) {
      return { notMatch: true };
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  preventPaste(e) {
    e.preventDefault();
  }
  submitRegister() {
    this.errors = [];
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;

    this._accountService.register(this.registerForm.value).subscribe(data => {
      this._authService.setUserId(data.data.UserId);
      this._userService.setRecentlyRegisteredUser(data.data.UserId, data.data.PhoneNumber);
      // this._authService.deleteUserToken();
      // this._authService.getAccessToken(data.data.UserId).then(() => {
      this._router.navigateByUrl('/account/verify?returnUrl=' + this.returnUrl);
      // });
      this.loading = false;
    }, (error) => {
      this.loading = false;
      if (error.errors) {
        error.errors.forEach(e => {
          this.errors.push(e.description);
        });
      } else {
        this.errors.push(error.Message);
      }
    });
  }
}
