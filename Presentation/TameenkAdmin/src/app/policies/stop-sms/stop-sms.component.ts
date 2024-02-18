import { FileModel } from './../../core/models/file-model';
import { AdminPolicyService, LocalizationService } from '../../core/services';
import { Component, OnInit } from '@angular/core';

import { CommonResponse } from '../../core';
import { StopSMSFilterModel } from './Models/stop-sms-filter-model';
import { StopSMSModel } from './Models/stop-sms-model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stop-sms',
  templateUrl: './stop-sms.component.html',
  styleUrls: ['./stop-sms.component.css']
})
export class StopSMSComponent implements OnInit {
 phonesFilterModel = new StopSMSFilterModel();
  phones = new StopSMSModel();
  phonesList: StopSMSModel[] = [];
 phonesListCount;
  loading: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  openPpUp = false;
  clicked = false;
  isSearch = false;
  codeErrorDiv = false;
  codeErrorDivMessage = '';
  mobilePhone:string;
  constructor(
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private _policyService: AdminPolicyService,
    private _translate: TranslateService
    ) { }

  ngOnInit() {
    this.loading = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    //this.InitializeRenewalDiscountList();
  }

  filterClick(e) {
    this.isSearch = true;
    this.loading = true;
    e.reset();
  }

  requestsLazyLoad(event) {
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows) + 1;
    const pageInSize = (event.rows);
    this.HandleInitializeingData(pageIndex, pageInSize);
  }

  HandleInitializeingData(pageIndex, pageInSize) {
    this._policyService.GetAllRenewalPhoneNumberWithFilter(this.phonesFilterModel, `pageIndex=${pageIndex}&pageInSize=${pageInSize}`).subscribe((data: CommonResponse<any>) => {
      this.phonesList = [];
      this.phonesListCount = 0;
      if (data.data.ErrorCode == 1) {
         this.isSearch=false;
        this.loading = false;
        this.phonesList = data.data.Result;
        this.phonesListCount = data.totalCount;
      }

      this.isSearch = false;
      this.loading = false;
    }, (error: any) => {
      this.isSearch = false;
      this.loading = false;
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  showPopup() {
    this.openPpUp = true;
  }

  closeModal() {
    this.openPpUp = false;
    this.clicked = false;
  }

  InitializeRenewalDiscountList() {
    this.HandleInitializeingData(1, 10);
  }

  

  
  restrictNumeric(e) {
    let input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  AddNew() {
    console.log('AddNewphones');
    console.log(this.mobilePhone);
    this.clicked = true;
    if (this.mobilePhone!=null){
      this._policyService.AddNewRenewalStopPhone(this.mobilePhone).subscribe((data: CommonResponse<any>) => {
        if (data.data.ErrorCode === 1) {
          this.mobilePhone=null;
          this.requestsLazyLoad(event);
          this._toastrService.success("Added Successfully");
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }
        this.codeErrorDivMessage = '';
        this.codeErrorDiv = false;
        this.closeModal();
      }, (error: any) => {
        if (error.errors) { 
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }else{
      this._toastrService.error("Empty Phone number ");
    }
   
  }

  

  delete(id) {
    if(confirm('Are You Sure ?')) {
      this.loading = true;
      this.phonesFilterModel.phoneNo = id;
      console.log(this.phonesFilterModel.phoneNo);
      this._policyService.DeleteRenewalStopPhone(this.phonesFilterModel).subscribe((data: CommonResponse<any>) => {
        if (data.data.ErrorCode == 1) {
          this._translate.get('common.deleteDone').subscribe(res => {
            this._toastrService.success("Deleted Successully");
            this.phonesFilterModel.phoneNo=null;
            this.requestsLazyLoad(event);
          });

        } else {
          this._translate.get('common.deleteFailed').subscribe(res => {
            this._toastrService.error(res);
          });
        }

        this.loading = false;
      }, (error: any) => {
        if (error.errors) {
          this.loading = false;
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
    }
  }
}
