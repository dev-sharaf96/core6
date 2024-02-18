export class ValidationErrors {
  validationErrors: any;
  insured: any[];
  vehicle: any[];
  captcha: any[];
  drivers: any[];
  additionalDrivers: any[];
  constructor() {
    this.validationErrors = {};
    this.insured = [];
    this.vehicle = [];
    this.captcha = [];
    this.drivers = [];
    this.additionalDrivers = [];
  }
}
