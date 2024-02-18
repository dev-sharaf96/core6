export class ICaptchaReq {
  constructor() {
    this.captchaInput = '';
    this.captchaToken = '';
    this.validationErrors = [];
  }
  validationErrors: string[];
  captchaInput: string;
  captchaToken: string;
}
export class ICaptchaRes {
  image: string;
  token: string;
  expiredInSeconds: number;
  constructor() { }
}
