import { Component, OnInit } from '@angular/core';
import { CaptchaModel } from './captcha-model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  captcha = new CaptchaModel();
  constructor() { }

  ngOnInit() {
  }
  checkCaptcha(e) {
console.log(e);
  }
}
