import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InquiryWorkflowService, InquiryService, AuthService, LocalizationService, CommonResponse, InitInquiryResponseModel, Inquiry, Insured, Driver, Vehicle } from 'src/app/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as Pikaday from 'pikaday';
import { NotificationService } from 'src/app/core/services/notification.service';
import { InitInquiryRequestModel } from 'src/app/core/models/init-inquiry-request.model';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Output() nextStep = new EventEmitter();
  @Output() removeStep = new EventEmitter();
  inquiryModel: InitInquiryResponseModel;
  form: any;
  minDate;
  maxDate;
  captcha: boolean;
  captchaModel = {
    captchaToken: '',
    captchaInput: ''
  };
  aggrementHolder = false;
  isDisable = true;
  loading = false;
  isEnglish: boolean;
  isEditRequest: boolean;
  initRequestModel: InitInquiryRequestModel = new InitInquiryRequestModel();
  quotationRequestExternalId;
  yakeenMissingFields;
  showYakeenMissingFields: boolean;
  guid;
  constructor(
    private _workflowService: InquiryWorkflowService,
    private _inquiryService: InquiryService,
    private _authService: AuthService,
    private _translate: TranslateService,
    private _notificationService: NotificationService,
    private _localizationService: LocalizationService) { }

    ngOnInit() {
      this.isEditRequest = this._inquiryService.isEditRequest;
      this.isEnglish = this._localizationService.getCurrentLanguage().id === 2;
      this.inquiryModel = this._workflowService.inquiry;
      this.getMinMaxDates();
      const i18nAr = {
        previousMonth: 'الشهر السابق',
        nextMonth: 'الشهر التالي',
        months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        weekdays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        weekdaysShort: ['ح', 'إ', 'ث', 'أ', 'خ', 'ج', 'س']
      };
      const endRegisterPicker = new Pikaday({
        field: document.getElementById('effectiveDate'),
        firstDay: 6,
        minDate: this.minDate,
        maxDate: this.maxDate,
        format: 'D/M/YYYY',
        ...!this.isEnglish ? {i18n: i18nAr} : {}
      });
      endRegisterPicker.setDate(this.inquiryModel.policyEffectiveDate || new Date());
    }
    getMinMaxDates() {
      this.minDate = new Date();
      this.minDate.setDate(this.minDate.getDate() + 1);
      this.maxDate = new Date();
      this.maxDate.setDate(this.maxDate.getDate() + 14);
      this.inquiryModel.policyEffectiveDate = this.inquiryModel.policyEffectiveDate || this.minDate;
    }
    next(form: any) {
      this._notificationService.clearMessage();
      if (form.valid && !this.isDisable && !this.loading) {
        if (this.inquiryModel.vehicle.ownerTransfer && this.inquiryModel.vehicle.ownerNationalId && (this.inquiryModel.vehicle.ownerNationalId.toString() == this.inquiryModel.insured.nationalId.toString())) {
          this._translate.get('inquiry.vehicle.id_number_error_invalid').subscribe(res => { this._notificationService.error(res); });
          return false;
      }
        this.loading = true;
        // if it's editRequest
        if (this.isEditRequest === true) {
          // validate captcha
        const captcha = {
          token: this.initRequestModel.captchaToken,
          input: this.initRequestModel.captchaInput
        };
          this._authService.validateCaptcha(captcha).subscribe(data => {
            this.loading = false;
            this.nextStep.emit();
          }, (error) => {
            this.loading = false;
            if (error.errors.length) {
              error.errors.forEach(e => {
                this._translate.get(`${e.description}`).subscribe(res => {
                  try {
                    var resError = JSON.parse(res);
                    if (resError.message || resError.Message) {
                      this._notificationService.error(
                        resError.message || resError.Message
                      );
                    } else {
                      this._notificationService.error(res);
                    }
                  } catch (e) {
                    this._notificationService.error(res);
                  }
                });
              });
            }
          });
          return;
        }
        // else
        this.search();
      }
    }

    search() {
    // reset steps
    this._workflowService.refreshSteps();
    this._notificationService.clearMessage();
    this.guid = Guid.create();
    localStorage.setItem('Guid', this.guid);
    // search request model
    this.initRequestModel.nationalId = this._workflowService.parseArabic(this.inquiryModel.insured.nationalId);
    this.initRequestModel.sequenceNumber = this._workflowService.parseArabic(this.inquiryModel.vehicle.vehicleId);
    this.initRequestModel.ownerNationalId = this._workflowService.parseArabic(this.inquiryModel.oldOwnerNin);
    this.initRequestModel.policyEffectiveDate = this.inquiryModel.policyEffectiveDate;
    this.initRequestModel.VehicleIdTypeId = this.inquiryModel.vehicle.VehicleIdTypeId;
    this.initRequestModel.ownerTransfer = this.inquiryModel.vehicle.ownerTransfer;
    this.initRequestModel.captchaToken = this.captchaModel.captchaToken;
    this.initRequestModel.captchaInput = this._workflowService.parseArabic(this.captchaModel.captchaInput);
    this.initRequestModel.parentRequestId = localStorage.getItem('Guid');

    this._inquiryService.initInquiryRequest(this.initRequestModel).subscribe((data: Inquiry) => {
      this.loading = false;

      if (data.ErrorCode === 1) {
        // this._notificationService.success(data.data.Description);
        if (data.inquiryResponseModel) {
          if (data.inquiryResponseModel.isValidInquiryRequest) {
            const quotationUrl =
              environment.QuotationSearchResult +
              data.inquiryResponseModel.quotationRequestExternalId;
            window.location.href =
              window.location.href.lastIndexOf("/") ==
                window.location.href.length - 1
                ? window.location.href.replace(/\/$/, "") + quotationUrl
                : quotationUrl;
          } else {
            if (data.inquiryResponseModel.yakeenMissingFields.length > 0) {
              //save the quotationReqestExternalId
              this.quotationRequestExternalId =
                data.inquiryResponseModel.quotationRequestExternalId;
              this.yakeenMissingFields = data.inquiryResponseModel.yakeenMissingFields;
              this.showYakeenMissingFields = true;
            }
          }
        } else {
          this._workflowService.inquiry = data.initInquiryResponseModel;
          if (data.initInquiryResponseModel.isMainDriverExist) {
            // remove insured info page if exist
            this.removeStep.emit('insured');
          } else {
            // create new instance of Insured and Driver
            this._workflowService.inquiry.insured = new Insured();
            this._workflowService.inquiry.insured.nationalId = this.initRequestModel.nationalId;
            this._workflowService.inquiry.drivers = [new Driver()];
          } if (data.initInquiryResponseModel.isVehicleExist) {
            // remove vehicle info page if exist
            this.removeStep.emit('vehicle');
          } else {
            // create new instance of Vehicle
            this._workflowService.inquiry.vehicle = new Vehicle();
            this._workflowService.inquiry.vehicle.vehicleId = this.initRequestModel.sequenceNumber;
            this._workflowService.inquiry.vehicle.ownerTransfer = this.initRequestModel.ownerTransfer;
            this._workflowService.inquiry.vehicle.ownerNationalId = this.initRequestModel.ownerNationalId;
            this._workflowService.inquiry.vehicle.VehicleIdTypeId = this.initRequestModel.VehicleIdTypeId;
          }
          // Navigate to the next page
          this.nextStep.emit();
        }
      } else {
        this._notificationService.error(data.ErrorDescription);
      }
      }, (error) => {
        this.loading = false;
        if (error.errors.length) {
          error.errors.forEach(e => {
            this._translate.get(`${e.description}`).subscribe(res => {
              try {
                const resError = JSON.parse(res);
                if (resError.message || resError.Message) {
                  this._notificationService.error(
                    resError.message || resError.Message
                  );
                } else {
                  this._notificationService.error(res);
                }
              } catch (e) {
                this._notificationService.error(res);
              }
            });
          });
        }
      });
    }

    togglePurposeOfInsurance() {
      this.inquiryModel.vehicle.ownerNationalId = null;
    }

    toggleVehicleRegistered() {
      this.inquiryModel.vehicle.ownerTransfer = false;
      this.inquiryModel.vehicle.ownerNationalId = null;
      this.inquiryModel.vehicle.vehicleId = null;
    }

    onChangeEffectiveDate(value) {
      const from = value.split('/');
      const fromDate = new Date(
        from[2],
        from[1] - 1,
        from[0]);
      fromDate.setHours(fromDate.getHours() - fromDate.getTimezoneOffset() / 60);
      // set policyEffectiveDate after changing timezone
      this.inquiryModel.policyEffectiveDate = fromDate;
    }

  checkagreement() {
    if (this.aggrementHolder && this.captcha) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  }

  checkCaptcha(value) {
    this.captcha = value;
    if (this.captcha && this.aggrementHolder) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  }
}
