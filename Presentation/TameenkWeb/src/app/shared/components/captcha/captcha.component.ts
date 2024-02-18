import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ICaptchaReq, ICaptchaRes } from 'src/app/core/models/captcha.model';
import { CommonResponse } from 'src/app/core/models/common.response.model';
import { IInquiryValidation } from 'src/app/core/models/inquiry-validation.model';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  @Input() captcha: ICaptchaReq;
  @Output() success = new EventEmitter;
  validationErrors: IInquiryValidation = new IInquiryValidation();
  image;
  isExpired = false;
  constructor(private _userService: UserService) { }
  ngOnInit() {
    this.getCaptcha();
  }
  getCaptcha() {
    this._userService.getCaptcha().subscribe((result: CommonResponse<ICaptchaRes>) => {
        this.isExpired = false;
        this.image = result.data.image;
        this.captcha.captchaToken = result.data.token;
        this.captcha.captchaInput = null;
        this.expiredCounter(result.data.expiredInSeconds);
      });
  }
  expiredCounter(expiredInSeconds) {
    this.validationErrors.captcha['captchaImg'] = [];
    setTimeout(() => {
      this.success.emit(false);
      this.isExpired = true;
      this.validationErrors.captcha['captchaImg'].push('inquiry.captcha.Captcha_expired');
    }, expiredInSeconds * 1000);
  }
  checkCaptchaInput(e): boolean {
    this.validationErrors.captcha['captchaInput'] = [];
    if (e.target.value.length === 4 && !this.isExpired) {
      this.success.emit(true);
      return true;
    } else {
      this.success.emit(false);
      return false;
    }
  }

  isValid(propName: string): Boolean {
    return (
      this.validationErrors.captcha[propName] &&
      this.validationErrors.captcha[propName].length > 0
    );
  }
}
