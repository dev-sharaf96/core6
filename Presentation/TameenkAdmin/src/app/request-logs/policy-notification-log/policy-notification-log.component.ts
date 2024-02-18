import { AdminPolicyService, CommonResponse, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { policyNotificationFilter } from './models/policyNotificationFilter';
import { policyNotificationResponseModel } from './models/policyNotificationResponseModel';
import { policyNotificationResponseOutput } from './models/policyNotificationOutput';

@Component({
  selector: 'app-policy-notification-log',
  templateUrl: './policy-notification-log.component.html',
  styleUrls: ['./policy-notification-log.component.css']
})
export class PolicyNotificationLogComponent implements OnInit {

  notificationFilter: policyNotificationFilter={
      endDate:new Date(),
      policyNo:null,
      startDate:new Date(),
      referenceNo:null,
      insuranceCompanyId:null,
      methodName:null
    };
    PolicyList: policyNotificationResponseOutput={
      ErrorCode:'',
      ErrorDescription:'',
      Result:[],
      totalCount:0
    };
    // checkout: CheckoutsModel;
    selectedRequest;
    method:any;
   responseListCount;
    loading: boolean;
    isShow:boolean;
    firstTime: boolean;
    emptyStringValue = 'ــــــــــــــــــ';
    eventHolder;
    defaultSortField = 'ReferenceId';
    isEnglish: boolean;
    isEdit:boolean;
    today = new Date();
    constructor(
     private _policyService: AdminPolicyService,
      private _toastrService: ToastrService,
      private _localizationService: LocalizationService
    ) {}

    ngOnInit() {
     // this.checkoutsFilter = this._checkoutsService.checkoutsFilter;
     this.isShow=false;
     this.notificationFilter.startDate=this.today;
     this.notificationFilter.endDate=this.today;
      this.loading = false;
      this.firstTime = true;
      this.isEnglish = true;
      this.isEdit = false;
      this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
      if(this.isEnglish){
        this.method=[
          {label:'All', value:null},
          {label:'E - InvoiceNotification', value:'InvoiceNotification'},
          {label:'Policy Cancellation Notification', value:'CancelPolicyNotification'}

        ];

      }else{
        this.method=[
          {label:'الكل', value:null},
          {label:'الفاتورة الالكترونية ', value:'InvoiceNotification'},
          {label:'اشعار الغاء الوثيقة', value:'CancelPolicyNotification'}
        ];
      }
    }

    filterClick(e) {
      this.loading=true;
      this.isShow=true;
      console.log(this.notificationFilter)
      e.reset();
    }

   PolicyNotificationLazyLoad(event) {
      this._policyService.policiesNotifications(this.notificationFilter,
        `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
        event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
        .subscribe((data: CommonResponse<policyNotificationResponseOutput>) => {
if(data.data.ErrorCode!='1'){
  this.isShow=false;
  this._toastrService.error(data.data.ErrorDescription);
}
else{
  this.isShow=false;
  this.PolicyList = data.data;
  this.responseListCount = data.data.totalCount;
}
            this.firstTime = false;
            this.loading = false;
          },
          (error: any) => {
            this.firstTime = false;
            this.loading = false;
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.code, item.description);
              });
            }
          }
        );
    }

    showDetails(notification: policyNotificationResponseModel) {
      this.selectedRequest = notification;
    }
}
