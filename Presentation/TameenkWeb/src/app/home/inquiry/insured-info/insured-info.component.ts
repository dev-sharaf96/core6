import { Component, OnInit, Input } from '@angular/core';
import { InquiryService, LocalizationService } from 'src/app/core';

@Component({
  selector: 'app-insured-info',
  templateUrl: './insured-info.component.html',
  styleUrls: ['./insured-info.component.css']
})
export class InsuredInfoComponent implements OnInit {
  @Input() insured;
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
    this.generateYears(this.minYears, this.maxYears);
  }
  ngOnInit() {
    this._inquiryService.getEducationCodes().subscribe(data => { this.educationCodes = data.data; }, (error: any) => error);
  }
  generateYears(min, max) {
    this.years = [];
    for (let i = min; i <= max; i++) {
      this.years.push(i);
    }
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
    if (this.insured.validationErrors['nationalId']) {
      this.checkIdValidation();
    }
    const nin = this.insured.nationalId ? this.insured.nationalId.toString() : '';
    if (nin[0] === '1') {
      this.months = [];
      this.hijriMonths.forEach((month, i) => {
        this.months.push({ id: i + 1, name: i + 1 + '-' + month });
      });
      this.minYears = Math.round((this.currentYear - 622) * (33 / 32)) - 100;
      this.maxYears = Math.round((this.currentYear - 622) * (33 / 32));
      this.generateYears(this.minYears, this.maxYears);
    } else if (nin[0] === '2') {
      this.months = [];
      this.gregorianMonths.forEach((month, i) => {
        this.months.push({ id: i + 1, name: i + 1 + '-' + month });
      });
      this.minYears = this.currentYear - 100;
      this.maxYears = this.currentYear;
      this.generateYears(this.minYears, this.maxYears);
    }
  }
  /**
   * @author Mostafa Zaki
   * @name checkIdValidation
   * @description
   * check if national id number is valid
   * 1- required
   * 2- numbers only
   * 3- 10 digit
   * 4- start with 1 || 2
   *
   * @returns {boolean}
   * id is valid ? true : false;
   * @memberof InsuredInfoComponent
   */
  checkIdValidation(): boolean {
    this.insured.validationErrors['nationalId'] = [];
    let nin = this.insured.nationalId ? this.insured.nationalId.toString() : '';
    nin = nin.trim();
    if (Number(nin) === null || nin === '') {
      this.insured.validationErrors['nationalId'].push('inquiry.insured_info.id_number_error_required');
      return false;
    }
    if (nin.length !== 10) {
      this.insured.validationErrors['nationalId'].push('inquiry.insured_info.id_number_error_invalid');
      return false;
    }
    const type = nin.substr(0, 1);
    if (type !== '2' && type !== '1') {
      this.insured.validationErrors['nationalId'].push('inquiry.insured_info.id_number_error_invalid');
      return false;
    }
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        const ZFOdd = String('00' + String(Number(nin.substr(i, 1)) * 2)).slice(-2);
        sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
      } else {
        sum += Number(nin.substr(i, 1));
      }
    }
    (sum % 10 !== 0) ? this.insured.validationErrors['nationalId'].push('inquiry.insured_info.id_number_error_invalid') : '';
    return (sum % 10 !== 0) ? false : true;
  }

  checkBirthMonth(): boolean {
    this.insured.validationErrors['birthDateMonth'] = [];
    if (this.insured.birthDateMonth == null || this.insured.birthDateMonth === '') {
      this.insured.validationErrors['birthDateMonth'].push('common.required');
      return false;
    }
    return true;
  }
  checkBirthYear(): boolean {
    this.insured.validationErrors['birthDateYear'] = [];
    if (this.insured.birthDateYear == null || this.insured.birthDateYear === '') {
      this.insured.validationErrors['birthDateYear'].push('common.required');
      return false;
    }
    return true;
  }
  isValid(propName: string): Boolean {
    return this.insured.validationErrors[propName]
    && this.insured.validationErrors[propName].length > 0;
  }
}
