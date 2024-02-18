import { CommonResponse, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

import { CancelPolicyRequestDto } from 'src/app/cancellation/Cancel-Policy-Request-Dto.model';
import {CancelPolicyResponse}from 'src/app/cancellation/cancel-policy-resp.model';
import { CancelPolicyService } from 'src/app/core/services/cancel-policy.service';
import { CancelRequest } from 'src/app/cancellation/cancellation-request.model'
import { CancelRequestFilter } from 'src/app/cancellation/cancellation-request-filter.model'
import{CancellPolicyOutput}from 'src/app/cancellation/cancel-response-output.model'
import{LookupsOutputResponse}from 'src/app/core/models/lookups-output.model';
import { ReasonCodeModel } from 'src/app/core/models/reson-code.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatePolicyRequestDto } from './Activate-Policy-Request-Dto.model';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.css']
})
export class CancellationComponent implements OnInit {
  requestsFilter: CancelRequestFilter;
  requests: CancelRequest[];
  sendcancelrequest:CancelPolicyRequestDto;
  sendActivateRequest:ActivatePolicyRequestDto = new ActivatePolicyRequestDto();
  requestsCount;
  openPpUp:any;
  ReasonSelected:any;
  selectedPolicy:any;
  loading: boolean;
  showLoading =false;
  file: File;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = '';
  isEnglish: boolean;
  today = new Date();
  isSearch = false;
  selectedRequest;
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  products: ReasonCodeModel[];
  product = new ReasonCodeModel();
  constructor(
    private _requestsService: CancelPolicyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}
  ngOnInit() {
    this.requestsFilter = this._requestsService.cancelrequestsFilter;
    this.sendcancelrequest=this._requestsService.cancelPolicyRequestDto;
    console.log(this.requestsFilter);
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? true
        : false;
        this.getReasonCodes();
      }
  getReasonCodes() {
    this._requestsService.GetReasonCodes().subscribe((data: LookupsOutputResponse<ReasonCodeModel[]>) => {
      this.products = [];
      this.products = data.Result;
      this.product = this.products.find((p) => p.Id === this.selectedValue);
     this.ReasonSelected = Number( data.Result[0].Id);
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  changed(e) {
    this.selectedValue =e.value.Id;// this.product.Id;
    this.selectedValueChange.emit(this.selectedValue);
    this.ReasonSelected = Number( e.value.Id);
    console.log( this.ReasonSelected)
  }
  filterClick(e) {
    // Set Timezone
    this.isSearch = true;
    // console.log(this.requestsFilter)
    e.reset();
  }
  OpenCancellationPopup(data) {
    this.selectedPolicy = data;
    this.openPpUp = true;
    $("#attachmentName:text").val("");
    $("#file:file").val("");
  }
 closeCancellationPopup(){
    this.openPpUp = false;
  }
  requestsLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._requestsService.GetCanellationPolicy(this.requestsFilter, `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`
        ).subscribe((data: CommonResponse<CancelRequest[]>) => {
          if (data.data.length > 0) {
            this.requests = data.data;
          } else {
            this.requests = [];
          }
          this.isSearch = false;
          this.requestsCount = data.totalCount;
          this.firstTime = false;
          this.loading = false;
        }, (error: any) => {
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        });
        console.log(this.requests)
  }
  onFileChange(files) {
    const type = files[0].type;
    const fileReader = new FileReader();
   // if (type.includes('pdf')||type.includes('xlsx')) {
      fileReader.readAsBinaryString(files[0]);
      fileReader.onload = () => {
        if (fileReader.DONE) {
         this.sendcancelrequest.CancellationAttachment = btoa(fileReader.result.toString());
        }
      };
      $("#attachmentName:text").val(files[0].name);
    //}
  }
  SendCancellation(){
 let today = new Date().toISOString().slice(0, 10);
this.sendcancelrequest.ReferenceId=this.selectedPolicy.referenceId;
this.sendcancelrequest.CancellationReasonCode=this.ReasonSelected;
this.sendcancelrequest.PolicyNo=this.selectedPolicy.policyNo;
this.sendcancelrequest.CancelDate=today;
console.log(this.sendcancelrequest.CancellationAttachment);
this._requestsService.SendCancelPolicy(this.sendcancelrequest ).subscribe((data: CommonResponse<CancellPolicyOutput>)=> {
console.log(data)
  if(data.data != null){
    this.closeCancellationPopup();
    $('#serch').click();
    if (data.data.ErrorCode==1){
    
      this._toastrService.success("Cancelled ")
    }else{
      this._toastrService.error(data.data.ErrorDescription)
    }
  }else{        
          $('.serverErrValidation').css("background-color", "#f8d7da") 
  }
}, (error: any) => {
  if (error.errors) {
    error.errors.forEach(item => {
      this._toastrService.error(item.code, item.description);
    });
  }
});
  }

  Activation(request:CancelRequest) {
    this.sendActivateRequest.ReferenceId = request.referenceId;
    this.sendActivateRequest.PolicyNo = request.policyNo;
    this._requestsService.ActivatePolicy(this.sendActivateRequest)
    .subscribe((data:any)=> {
      if(data.data != null){
        if (data.data.ErrorCode == 1){
          request.isCancelled = !request.isCancelled;
          this._toastrService.success("Activated");
        }else{
          this._toastrService.error(data.data.ErrorDescription)
        }
      }else{
              $('.serverErrValidation').css("background-color", "#f8d7da")
      }
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });  }
}
