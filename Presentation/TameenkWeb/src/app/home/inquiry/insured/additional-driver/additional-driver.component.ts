import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Driver, InquiryService, LocalizationService } from 'src/app/core';

@Component({
  selector: 'app-additional-driver',
  templateUrl: './additional-driver.component.html',
  styleUrls: ['./additional-driver.component.css']
})
export class AdditionalDriverComponent implements OnInit {
  @Input() driver: Driver;
  @Input() index;
  @Output() removeComponent = new EventEmitter();
  @Input() totalPercentage;
  @Output() changedTotalPercentage = new EventEmitter();
  @Output() formValidation = new EventEmitter();
  @ViewChild('additionalDriverForm') additionalDriverForm;
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

  currentYear: number = new Date().getFullYear();

  hijriMonths =
    this._localizationService.getCurrentLanguage().id === 1
      ? this.hijriMonthsAr
      : this.hijriMonthsEn;
  months;
  years: any[] = [];
  minYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 100;
  maxYears: number = Math.round((this.currentYear - 622) * (33 / 32));
  educationCodes;
  medicalCondations;
  violationsCodes;
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
  accordionIsActive = true;
  childrenCountError;
  drivingPercentageList = [
    { id: 25, name: '25%' },
    { id: 50, name: '50%' },
    { id: 75, name: '75%' },
    { id: 100, name: '100%' }
  ];
  localDrivingPercentageList;
  constructor(
    private _inquiryService: InquiryService,
    private _localizationService: LocalizationService
  ) {
    this.childrenCount = [];
    this.childrenCountList.forEach((child, i) => {
      this.childrenCount.push({ id: i, name: child });
    });
    this.months = [];
    this.hijriMonths.forEach((month, i) => {
      this.months.push({ id: i + 1, name: i + 1 + '-' + month });
    });
  }

  ngOnInit() {
    this.localDrivingPercentageList = this.drivingPercentageList;

    this._inquiryService
      .getEducationCodes()
      .subscribe(
        data => (this.educationCodes = data.data),
        (error: any) => error
      );
    this._inquiryService
      .getMedicalConditions()
      .subscribe(
        data => (this.medicalCondations = data.data),
        (error: any) => error
      );
    this._inquiryService
      .getViolations()
      .subscribe(
        data => (this.violationsCodes = data.data),
        (error: any) => error
      );

    this.additionalDriverForm.statusChanges.subscribe(status => {
      this.driver.isFormValid = this.additionalDriverForm.valid;
      this.formValidation.emit(this.additionalDriverForm);
    });
    this.changeId();
    this.generateYears(this.minYears, this.maxYears);
  }

  generateYears(min, max) {
    for (let i = min; i <= max; i++) {
      this.years.push(i);
    }
    if (!this.years.includes(this.driver.birthDateYear)) {
      this.driver.birthDateYear = null;
    }
  }

  destroy() {
    this.removeComponent.emit(this.index);
  }

  /**
   * @author Mostafa Zaki
   * @name changeId
   * @description
   * check if national id number is saudi
   * if start with 1 is saudi
   * if start with 2 is foreign
   *
   * @memberof InsuredInfoComponent
   */
  changeId() {
    const nin = this.driver.nationalId ? this.driver.nationalId.toString() : '';
    if (nin[0] === '1') {
      this.months = [];
      this.hijriMonths.forEach((month, i) => {
        this.months.push({ id: i + 1, name: i + 1 + '-' + month });
      });
      this.minYears = Math.round((this.currentYear - 622) * (33 / 32)) - 100;
      this.maxYears = Math.round((this.currentYear - 622) * (33 / 32));
      this.years = [];
      this.generateYears(this.minYears, this.maxYears);
    } else if (nin[0] === '2') {
      this.months = [];
      this.gregorianMonths.forEach((month, i) => {
        this.months.push({ id: i + 1, name: i + 1 + '-' + month });
      });
      this.minYears = this.currentYear - 100;
      this.maxYears = this.currentYear;
      this.years = [];
      this.generateYears(this.minYears, this.maxYears);
    }
  }

  changeTotalPercentage(e) {
    this.driver.drivingPercentage = e;
    this.changedTotalPercentage.emit();
  }

  toggleViolations(e) {
    if (e) {
      this.driver.violationIds = [null];
    } else {
      this.driver.violationIds = [];
    }
  }
  addViolation() {
    this.driver.violationIds.push(null);
  }
  removeViolation(index) {
    this.driver.violationIds.splice(index, 1);
  }

  // TO show error msgs on submit;
  submit(form) {
    form.submitted = true;
    return;
  }

  // for violation Ids to use primitive values in ngFor
  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
