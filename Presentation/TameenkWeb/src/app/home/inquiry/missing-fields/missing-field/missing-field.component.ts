import { Component, OnInit, AfterViewInit, OnDestroy, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {  LocalizationService, InquiryService, YakeenMissingFieldBase } from 'src/app/core';
import { FormGroup } from '@angular/forms';
import * as Pikaday from 'pikaday';

@Component({
  selector: 'app-missing-field',
  templateUrl: './missing-field.component.html',
  styleUrls: ['./missing-field.component.css']
})
export class MissingFieldComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  picker;
@Input() field: YakeenMissingFieldBase<any>;
@Output() changeVehicleMakerCode  = new EventEmitter();
@Input() vehicleMakerCode;
@Input() form: FormGroup;
lang: string;
VehicleModels : any;
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

hijrimonths: any = this._localizationService.getCurrentLanguage().id === 1
? this.hijriMonthsAr
: this.hijriMonthsEn;
years: number[] = [];
months: any[] = [];
dayes = Array.from(Array(31).keys());
currentYear: number = new Date().getFullYear();
minYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 50;
maxYears: number = Math.round((this.currentYear - 622) * (33 / 32)) + 50;
expiryDayValue;
expiryMonthValue;
expiryYearValue;
constructor(private _localizationService: LocalizationService ,private _InquiryService: InquiryService){ }
get isValid() {
  return this.form.controls[this.field.key].valid;
}
ngOnInit() {
    this.dayes.shift();
      this.months = [];
      this.hijrimonths.forEach((month, i) => {
      this.months.push({ id: i + 1, name: i + 1 + '-' + month });
      });
      this.generateYears(this.minYears, this.maxYears);
}
ngAfterViewInit() {
  this.lang = this._localizationService.getCurrentLanguage().id === 2 ? '' : 'ar';
    if (this.field.controlType === 'datePicker') {
      //initDatePicker
      if (this.field.key !== 'VehicleLicenseExpiry') {
          this.picker = new Pikaday({ field: document.getElementById(this.field.key), format: 'D/M/YYYY' });
      } else {
          // (<any>$('#'+ this.field.key +'')).calendarsPicker($.extend({
          //     calendar: $['calendars'].instance('islamic', this.lang),
          //     showTrigger: '#calImg',
          //     altField: '#rtlAlternate',
          //     altFormat: 'DD, d MM, yyyy',
          //     localNumbers: true,
          //     onSelect: (dates) => {
          //         this.form.controls[this.field.key].setValue(dates[0].formatDate());
          //     }
          // },
          // $['calendarsPicker'].regionalOptions[this.lang]));
          // $['calendarsPicker'].setDefaults($['calendarsPicker'].regionalOptions['']);
      }
    }
  }
  ngOnDestroy() {
      if (this.picker) {
      this.picker.destroy();
      }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['vehicleMakerCode'] && this.vehicleMakerCode && this.field.key === 'VehicleModel') {



       this._InquiryService.getVehicleModels(this.vehicleMakerCode).subscribe(data => {

        console.log(data.data);


          // this.field.options = [{id: model.data.Id, name: model.data.Name}];
          this.field.options = data.data;

      });


    }

  }
  generateYears(min, max) {
      this.years = [];
      for (let i = min; i <= max; i++) {
        this.years.push(i);
      }
    }
  onChangeDate(e) {
      const from = e.split('/');
      const fromDate = new Date(
          from[2],
          from[1] - 1,
          from[0]);
      fromDate.setHours(fromDate.getHours() - fromDate.getTimezoneOffset() / 60);
      this.form.controls[this.field.key].setValue(fromDate);
  }
  getHijri() {
      if(this.expiryDayValue && this.expiryMonthValue && this.expiryYearValue) {
          this.form.controls[this.field.key].setValue(`${this.expiryDayValue}-${this.expiryMonthValue}-${this.expiryYearValue}`);
      }
  }
  onChange(e) {
    if(this.field.key === 'VehicleMaker') {
      this.changeVehicleMakerCode.emit(e.id);
    }
  }
}
