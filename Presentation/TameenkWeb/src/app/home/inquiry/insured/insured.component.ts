import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InitInquiryResponseModel, IInquiryValidation, InquiryWorkflowService, InquiryService, LocalizationService, DriverExtraLicense, Driver } from 'src/app/core';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.css']
})
export class InsuredComponent implements OnInit {
  @Input() isLastStep: boolean;
  @Output() nextStep = new EventEmitter();
  @Output() prevStep = new EventEmitter();
  inquiryModel: InitInquiryResponseModel;
  validationErrors: IInquiryValidation;
  medicalCondations;
  violationsCodes;

  additionalDrivers: Driver[];
  totalPercentage = 0;
  remainingPercentage = 100 - this.totalPercentage;
  driversForm;
  driversValid = true;
  countries;
  gregorianMonthsAr = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر'
  ];
  gregorianMonthsEn = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  hijriMonthsAr = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادي الأول',
    'جمادي الثاني',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة'
  ];
  hijriMonthsEn = [
    'Muharram',
    'Safar',
    'Rabi’ al-awal',
    'Rabi’ al-thani',
    'Jumada al-awal',
    'Jumada al-thani',
    'Rajab',
    'Sha’aban',
    'Ramadan',
    'Shawwal',
    'Duh al-Qidah',
    'Duh al-Hijjah'
  ];
  childrenCountAr = ['0', '1', '2', '3', '4', '5 وأكثر'];
  childrenCountEn = ['0', '1', '2', '3', '4', '5 or more'];
  childrenCountList =
    this._localizationService.getCurrentLanguage().id === 1
      ? this.childrenCountAr
      : this.childrenCountEn;
  childrenCount;
  gregorianMonths =
    this._localizationService.getCurrentLanguage().id === 1
      ? this.gregorianMonthsAr
      : this.gregorianMonthsEn;
  hijriMonths =
    this._localizationService.getCurrentLanguage().id === 1
      ? this.hijriMonthsAr
      : this.hijriMonthsEn;
  months = [];
  years: any[] = [];
  currentYear: number = new Date().getFullYear();
  minYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 100;
  maxYears: number = Math.round((this.currentYear - 622) * (33 / 32));
  educationCodes;

  licenseYearsAr = ['سنة واحدة', 'سنتان', 'ثلاث سنوات', 'عشر سنوات أو أكثر'];
  licenseYearsEn = ['One year', 'Two years', 'Three years', 'Ten years or more'];
  licenseYearsList =
    this._localizationService.getCurrentLanguage().id === 1
      ? this.licenseYearsAr
      : this.licenseYearsEn;
  licenseYearsLookup;
  cities;
  isEditRequest: boolean;
  constructor(
    private _workflowService: InquiryWorkflowService,
    private _inquiryService: InquiryService,
    private _localizationService: LocalizationService,
    private _notificationService: NotificationService,
    private _translate: TranslateService) { }


  ngOnInit() {
    this.inquiryModel = this._workflowService.inquiry;
    this.isEditRequest = this._inquiryService.isEditRequest;
    this.validationErrors = this._workflowService.validationErrors;
    if (this.isEditRequest) {
      this.additionalDrivers = this.inquiryModel.drivers.filter(driver => driver.nationalId !== this.inquiryModel.insured.nationalId);
      this.additionalDrivers.map(d => d.isEdit = true);
    } else {
      this.additionalDrivers = this.inquiryModel.drivers.slice(1);
    }
    this._inquiryService.getEducationCodes().subscribe(data => { this.educationCodes = data.data; }, (error: any) => error);
    this._inquiryService.getMedicalConditions().subscribe(data => { this.medicalCondations = data.data; }, (error: any) => error);
    this._inquiryService.getViolations().subscribe(data => { this.violationsCodes = data.data; }, (error: any) => error);
    this._inquiryService.getAllCities().subscribe(data => {
      this.cities = data.data;
      this.cities.forEach(city => {
        city.name = this._localizationService.getCurrentLanguage().id === 2
        ? city.englishDescription
        : city.arabicDescription;
      });
    },(error: any) => error);
    // this._inquiryService.getCountries().subscribe(data => {
    //   this.countries = data.data;
    //   this.countries.forEach(city => {
    //     city.name = this._localizationService.getCurrentLanguage().id === 2
    //       ? city.englishDescription
    //       : city.arabicDescription;
    //   });
    // }, (error: any) => error);
    this.childrenCount = [];
    this.childrenCountList.forEach((child, i) => {
      this.childrenCount.push({ id: i, name: child });
    });
    this.licenseYearsLookup = [];
    this.licenseYearsList.forEach((year, i) => {
      this.licenseYearsLookup.push({ id: i + 1, name: (i + 1) + '-' + year });
    });
    let nin = this._workflowService.parseArabic(this.inquiryModel.insured.nationalId).toString();
    if (nin[0] == '1') {
      this.months = [];
      this.hijriMonths.forEach((month, i) => {
        this.months.push({ id: i + 1, name: i + 1 + '-' + month });
      });
      this.minYears = Math.round((this.currentYear - 622) * (33 / 32)) - 100;
      this.maxYears = Math.round((this.currentYear - 622) * (33 / 32));
      this.generateYears(this.minYears, this.maxYears);
    } else if (nin[0] == '2') {
      this.months = [];
      this.gregorianMonths.forEach((month, i) => {
        this.months.push({ id: i + 1, name: i + 1 + '-' + month });
      });
      this.minYears = this.currentYear - 100;
      this.maxYears = this.currentYear;
      this.generateYears(this.minYears, this.maxYears);
    }
  }

  generateYears(min, max) {
    this.years = [];
    for (let i = min; i <= max; i++) {
      this.years.push(i);
    }
  }
  driversValidation(e?) {
    if (e) {
      this.driversForm = e;
    }
    this.driversValid = true;
    this.additionalDrivers.forEach(driver => {
      if (!driver.isFormValid) {
        this.driversValid = false;
      }
    });
  }
  next(form: any) {
    this._notificationService.clearMessage();
    if (this.remainingPercentage < 0) {
      this._translate.get('inquiry.additional_Driver_info.driving_percentage_error_invalid').subscribe(res => { this._notificationService.error(res); });
      return false;
    }
    if (this.additionalDrivers.length > 0) {
      this.driversForm.ngSubmit.emit();
    }
    // if form is valid
    if (form.valid && this.driversValid) {
      this.inquiryModel.drivers = this.inquiryModel.drivers.slice(0, 1);
      this.inquiryModel.drivers[0].drivingPercentage = 100;
      if (this.additionalDrivers.length > 0) {
        this.inquiryModel.drivers[0].drivingPercentage = this.remainingPercentage;
        this.inquiryModel.drivers = this.inquiryModel.drivers.concat(this.additionalDrivers);
      }
      // Navigate to the next page
      this.nextStep.emit();
    }
  }
  prev() {
    this._notificationService.clearMessage();
    this.prevStep.emit();
  }

  toggleViolations(e) {
    if (e) {
      this.inquiryModel.drivers[0].violationIds = [null];
    } else {
      this.inquiryModel.drivers[0].violationIds = [];
    }
  }
  addViolation() {
    this.inquiryModel.drivers[0].violationIds.push(null);
  }
  removeViolation(index) {
    this.inquiryModel.drivers[0].violationIds.splice(index, 1);
  }

  toggleExtraLicenses(e) {
    if (e) {
      this.inquiryModel.drivers[0].driverExtraLicenses = [new DriverExtraLicense()];
    } else {
      this.inquiryModel.drivers[0].driverExtraLicenses = [];
    }
  }
  addExtraLicense() {
    this.inquiryModel.drivers[0].driverExtraLicenses.push(new DriverExtraLicense());
  }
  removeExtraLicense(index) {
    this.inquiryModel.drivers[0].driverExtraLicenses.splice(index, 1);
    if (this.inquiryModel.drivers[0].driverExtraLicenses.length === 0) {
      this.inquiryModel.drivers[0].hasExtraLicenses = false;
    }
  }

  toggleDriver(e) {
    if (e) {
      this.additionalDrivers = [new Driver()];
      this.totalPercentage = 0;
      this.additionalDrivers.forEach(d => {
        this.totalPercentage += d.drivingPercentage;
      });
      this.remainingPercentage = 100 - this.totalPercentage;
    } else {
      this.additionalDrivers = [];
      this.totalPercentage = 0;
      this.additionalDrivers.forEach(d => {
        this.totalPercentage += d.drivingPercentage;
      });
      this.remainingPercentage = 100 - this.totalPercentage;
    }
    this.driversValidation();
  }
  addDriver() {
    if (this.totalPercentage < 100 && this.additionalDrivers.length < 2) {
      // this.totalPercentage -= 25;
      this.additionalDrivers.push(new Driver());
      this.totalPercentage = 0;
      this.additionalDrivers.forEach(d => {
        this.totalPercentage += d.drivingPercentage;
      });
      this.remainingPercentage = 100 - this.totalPercentage;
      this.driversValidation();
    }
  }
  removeDriver(event) {
    this.additionalDrivers.splice(event, 1);
    this.totalPercentage = 0;
    this.additionalDrivers.forEach(d => {
      this.totalPercentage += d.drivingPercentage;
    });
    this.remainingPercentage = 100 - this.totalPercentage;
    this.driversValidation();
  }
  changeTotalPercentage() {
    this.totalPercentage = 0;
    this.additionalDrivers.forEach(d => {
      this.totalPercentage += d.drivingPercentage;
    });
    this.remainingPercentage = 100 - this.totalPercentage;
  }

  // for violation Ids to use primitive values in ngFor
  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
