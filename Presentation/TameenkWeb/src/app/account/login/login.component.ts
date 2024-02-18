import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService, AuthService, CommonResponse } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword;
  loginForm: FormGroup;
  rememberMe = false;
  loading = false;
  submitted = false;
  returnUrl: string;
  errors: string[];
  constructor(
    private formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute) {
    if (this._authService.getUserId()) {
      this._router.navigate(['/'], {replaceUrl: true});
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.compose(
        [Validators.minLength(4), Validators.required])]
    });
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }

  submitLogin() {
    this.errors = [];
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this._authService.addRememberMe(this.rememberMe);
    this.loading = true;
    this._accountService.login(this.loginForm.value).subscribe((data: CommonResponse<any>) => {
      this._authService.setUserId(data.data.UserId);
      this._authService.deleteUserToken();
      this._authService.getAccessToken(data.data.UserId).then(() => {
        this.loading = false;
        this._router.navigateByUrl(this.returnUrl, {replaceUrl: true});
      });
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

  forgetPassword() {
            // $('#ResetEmailsuccess, #ResetEmailError').fadeOut();
            // if ($("input[name='ResetEmail']").is(':valid')) {
            //     $.ajax({
            //     url: "@Url.Action("ResetPassword", "Account")",
            //     data: { email: $("input[name='ResetEmail']").val()},
            //     type: "GET",
            //     datatype: "json",
            //         success: function(result) {
            //             //server send the request result message
            //             $('#ResetEmailsuccess').html(result.Message);
            //             $('#ResetEmailsuccess').fadeIn(300);
            //             //if success set the color to normal color else set to red color
            //         if (result.Success == true)
            //                 $('#ResetEmailsuccess').css('color', '#186A9E');
            //                 // setTimeout(() => {
            //                 //     $('[data-popup="forgetpassword"]').fadeOut(350);

            //                 // }, 5000);
            //         else {
            //             $('#ResetEmailsuccess').css('color', 'red');
            //         }
            //         setTimeout(function() {
            //             $('[data-popup="forgetpassword"]').fadeOut(350);
            //             $("input[name='ResetEmail']").val('');
            //             $('#ResetEmailsuccess').fadeOut();
            //         }, 2000);
            //     },
            //     error: function (result) {
            //         $('#ResetEmailError').empty().append('Failed while sending email').fadeIn(300);

            //     }
            // });
            // } else {
            //     $('#ResetEmailError').empty().append(document.querySelector("input[name='ResetEmail']").validationMessage).fadeIn(300);
            // }
        }
}
