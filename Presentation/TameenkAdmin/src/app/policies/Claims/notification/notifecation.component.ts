import { AdminPolicyService, CommonResponse, LocalizationService, PolicyService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
import { notificationFilter } from './notificationFilter';
import { notificationResponseModel } from './Model/ResponseModel';
import { observable } from 'rxjs';

@Component({
  selector: 'app-notifecation',
  templateUrl: './notifecation.component.html',
  styleUrls: ['./notifecation.component.css']
})
export class NotifecationComponent implements OnInit {
notificationRequestFilter:notificationFilter={
   referenceId:null,
    policyNo:null,
    claimNo:null   
};
notificationResponse: notificationResponseModel[];
notificationResponseCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  today = new Date();
  AccidentReport_Id=null;
  AccidentReport_File=null;
  isSearch = false;
  openPpUp: boolean = false; //default value for resend modal
//   claimModel:claimsResponseModel;
//  ClaimsReportRequest:claimsResponseModel;
 customRequestِِAccidentReport:any={};
 constructor(
  private _adminPolicyService: AdminPolicyService,
  private _toastrService: ToastrService,
  private _localizationService: LocalizationService
) { }
  ngOnInit() {

    this.loading = true;
    this.firstTime = true;
    this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
    ? true
    : false;

  }
  filterClick(e) {
    this.isSearch = true;
     e.reset();
    console.log(this.notificationRequestFilter)
  

  }
  SuccessPoliciesLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._adminPolicyService.sendClaimNotification(this.notificationRequestFilter,`pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
    .subscribe((data:any)=> {
      if(data.data.errorCode!=1){
        this._toastrService.error(data.data.errorDescription);
        this.isSearch = false;

      }
      else{
        this.notificationResponse = [data.data];
        console.log('this.notificationResponse >>>>' , this.notificationResponse )
        this._toastrService.success(data.data.errorDescription);
        this.loading = false;
        this.firstTime = false;
        this.isSearch = false;
       // this.notificationResponseCount=this.notificationResponse.count;
        
      }
    

      }, (error: any) => {
        this.loading = false;
        this.firstTime = false;
        this.isSearch = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }








}
