import { Component, OnInit } from '@angular/core';
import { InquiryService, InquiryWorkflowService, IInquiryValidation, InitInquiryResponseModel } from 'src/app/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {
  currentStep: string = this._workflowService.currentStep;
  lastStep: string = this._workflowService.lastStep;
  inquiryModel: InitInquiryResponseModel;
  validationErrors: IInquiryValidation;

  quotationRequestExternalId;
  yakeenMissingFields;
  showYakeenMissingFields = false;
  showLoading = false;
  guid;
  constructor(
    private _router: Router,
    private _workflowService: InquiryWorkflowService,
    private _inquiryService: InquiryService,
    private _notificationService: NotificationService,
    private _translate: TranslateService) { }

  ngOnInit() {
    if (this._inquiryService.isEditRequest === true) {
      this.loadInquiryModel(this._inquiryService.qutReqExternalId);
    }
    this.inquiryModel = this._workflowService.inquiry;
    this.validationErrors = this._workflowService.validationErrors;
  }
  getNextStep() {
    this._notificationService.clearMessage();
    if (this.currentStep !== this._workflowService.lastStep) {
      this.currentStep = this._workflowService.getNextStep();
      this.lastStep = this._workflowService.lastStep;
    } else {
      this.inquiryModel = this._workflowService.inquiry;
      this.inquiryModel.drivers[0].nationalId = this.inquiryModel.insured.nationalId;
      this.inquiryModel.drivers[0].edcuationId = this.inquiryModel.insured.edcuationId;
      this.inquiryModel.drivers[0].birthDateYear = this.inquiryModel.insured.birthDateYear;
      this.inquiryModel.drivers[0].birthDateMonth = this.inquiryModel.insured.birthDateMonth;
      this.inquiryModel.drivers[0].childrenBelow16Years = this.inquiryModel.insured.childrenBelow16Years;

      this.inquiryModel.insured.nationalId = this._workflowService.parseArabic(this.inquiryModel.insured.nationalId).toString();
      this.inquiryModel.vehicle.vehicleId =  this._workflowService.parseArabic(this.inquiryModel.vehicle.vehicleId).toString();
      this.inquiryModel.vehicle.ownerNationalId = this._workflowService.parseArabic(this.inquiryModel.vehicle.ownerNationalId);
      this.inquiryModel.vehicle.estimatedVehiclePrice = this._workflowService.parseArabic(this.inquiryModel.vehicle.estimatedVehiclePrice);
      // this.inquiryModel.vehicle.estimatedVehiclePrice = this._workflowService.parseArabic(this.inquiryModel.vehicle.estimatedVehiclePrice);
      this.inquiryModel.drivers.forEach(dirver => {
        dirver.nationalId = this._workflowService.parseArabic(dirver.nationalId).toString();
      });

      document.body.classList.add('page-loading-container');
      this._inquiryService.submitInquiryRequest(this.inquiryModel).subscribe(data => {
        if (data.ErrorCode === 1) {
          this.currentStep = '';
          this.lastStep = '';
          if (data.inquiryResponseModel.isValidInquiryRequest) {
            const vehicleInfoObj = data.inquiryResponseModel.vehicle;
            vehicleInfoObj['timeStamp'] = new Date();
            sessionStorage.setItem('vehicleInfoObj', JSON.stringify(vehicleInfoObj));
            this._router.navigate(['/quotation/' + data.inquiryResponseModel.quotationRequestExternalId]);
            // this.isDisable = false;
            // this.captcha = false;

            // const quotationUrl =
            //   environment.QuotationSearchResult +
            //   data.inquiryResponseModel.quotationRequestExternalId;
            // window.location.href =
            //   window.location.href.lastIndexOf('/') ==
            //     window.location.href.length - 1
            //     ? window.location.href.replace(/\/$/, '') + quotationUrl
            //     : quotationUrl;
          } else {
            if (data.inquiryResponseModel.yakeenMissingFields.length > 0) {
              //save the quotationReqestExternalId
              this.quotationRequestExternalId =
                data.inquiryResponseModel.quotationRequestExternalId;
              this.yakeenMissingFields = data.inquiryResponseModel.yakeenMissingFields;
              this.showYakeenMissingFields = true;
              document.body.classList.remove('page-loading-container');
            }
          }
        } else {
          document.body.classList.remove('page-loading-container');
          this._notificationService.error(data.ErrorDescription);
        }
        }, (error: any) => {
          document.body.classList.remove('page-loading-container');
          if (error.errors.length) {
            error.errors.forEach(e => {
              if (e.description) {
                this._translate.get(`${e.description}`).subscribe(res => {
                  try {
                    let resError = JSON.parse(res);
                    if (resError.message || resError.Message) {
                      this._notificationService.error(resError.message || resError.Message);
                    } else {
                      this._notificationService.error(res);
                    }
                  } catch (e) {
                    this._notificationService.error(res);
                  }
                });
              }
            });
          }
          if (error.data) {
            for (const prop in error.data) {
              if (error.data.hasOwnProperty(prop)) {
                const err = error.data[prop];
              if (err.Errors) {
                const propParts = prop.split('.');
                if (propParts.length >= 2) {
                  let validationErrors = null;
                  // Is array
                  if (propParts[1].indexOf('[') > -1) {
                    const secondProp = propParts[1].slice(0, propParts[1].indexOf('['));
                    const propIndex = propParts[1].slice(
                      propParts[1].indexOf('[') + 1,
                      propParts[1].indexOf(']')
                    );
                    validationErrors = this.inquiryModel[secondProp][propIndex]
                      .validationErrors;
                  } else {
                    if (propParts.length == 2) {
                      // validationErrors = this.inquiryModel["vehicle"].validationErrors;
                      validationErrors[propParts[1]] = [];
                      err.Errors.forEach(e => {
                        const msg =
                          e.ErrorMessage ||
                          (e.Exception
                            ? 'SubmitInquiryRequest.InvalidData'
                            : '');
                        validationErrors[propParts[1]].push(msg);
                      });
                    } else {
                      validationErrors = this.inquiryModel[propParts[1]].validationErrors;
                    }
                  }
                  validationErrors[propParts[2]] = [];
                  // err.Errors.forEach(e => {
                  const msg =
                    err.Errors[0].ErrorMessage ||
                    (err.Errors[0].Exception
                      ? 'SubmitInquiryRequest.InvalidData'
                      : '');
                  validationErrors[propParts[2]].push(msg);
                  // });
                }
              }
            }
              }
          }
        }
      );
    }
  }
  getPrevStep() {
    this._notificationService.clearMessage();
    this.currentStep = this._workflowService.getPrevStep();
    this.lastStep = this._workflowService.lastStep;
  }
  removeStep(e) {
    this._workflowService.removeStep(e);
    this.lastStep = this._workflowService.lastStep;
  }

  loadInquiryModel(qutReqExternalId: string) {
    this.showLoading = true;
    // this._inquiryService.editInquiryRequest(qutReqExternalId).subscribe(data => {
    //   this._formDataService.inquiry = data.data;
    //   this._formDataService.inquiry.captcha = new Captcha();

    //   this.showLoading = false;
    //   this.inquiryModel = this._formDataService.inquiry;
    //   this._formDataService.inquiry.vehicle.ownerNationalId = this._formDataService.inquiry.oldOwnerNin;
    // }, error => {
    //   this.showLoading = false;
    //   console.log(error);

    // })
  }
}
