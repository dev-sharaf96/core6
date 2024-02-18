import * as FileSaver from 'file-saver';

import { AdminPolicyService, CommonResponse, LocalizationService, PolicyService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { ClaimsFilterModel } from './Claims-registrationFilter';
import { PoliciesInfoListingModel } from '../../policies-info/policies-info-listing-model';
import { PoliciesInfoModel } from '../../policies-info/policies-info-model';
import { ToastrService } from 'ngx-toastr';
import { claimsResponseModel } from './Model/claimsResponseModel';
import { customModel } from './Model/customresponse';
import { data } from 'jquery';
import { observable } from 'rxjs';
import { sendClaimsReportModel } from './Model/sendClaimsModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


    ClaimsFilter: ClaimsFilterModel = new ClaimsFilterModel();
   claimsListing:customModel[];
    SuccessPoliciesCount;
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
    claimModel:claimsResponseModel;
   ClaimsReportRequest:claimsResponseModel;
   customRequestِِAccidentReport:any={};
    constructor(
      private _adminPolicyService: AdminPolicyService,
      private _toastrService: ToastrService,
      private _localizationService: LocalizationService
    ) { }

    ngOnInit() {

      // this.ClaimsReportRequest.AccidentReportNumber=null;
      // this.ClaimsReportRequest.AccidentReport=this.AccidentReport_File;
      this.ClaimsReportRequest=null;
      this.loading = true;
      this.firstTime = true;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
      ? true
      : false;

    }


    filterClick(e) {
      this.isSearch = true;
      e.reset();
      console.log(this.ClaimsFilter)
    }
    SuccessPoliciesLazyLoad(event) {
      this.eventHolder = event;
      this.loading = true;
      this._adminPolicyService.getFilterClaims(this.ClaimsFilter,`pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
      .subscribe((data:any)=> {
          this.claimsListing = data.data;
          // this.SuccessPoliciesCount = data.totalCount;
          console.log(data)
          this.loading = false;
          this.firstTime = false;
          this.isSearch = false;

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


    registerClaimPopup(claim){
      $("#AccidentReport:text").val("");
    $("#file:file").val("");
      console.log(claim)
      this.ClaimsReportRequest=claim;
      this.openPpUp = true;
    }

    closeModal(){

      this.openPpUp = false;
    }
    

    onFileChange(files) {
      const type = files[0].type;
      const fileReader = new FileReader();
      // if (type.includes('pdf')||type.includes('xlsx')||type.includes('xls')||type.includes('csv')) {
        fileReader.readAsBinaryString(files[0]);
        fileReader.onload = () => {
          if (fileReader.DONE) {
           this.ClaimsReportRequest.accidentReport = btoa(fileReader.result.toString());
          }
        // };
        $("#attachmentName:text").val(files[0].name);
      }
    }



    sendClaim(){
       this.ClaimsReportRequest.accidentReportNumber=this.AccidentReport_Id;
      console.log(this.ClaimsReportRequest)
        let today = new Date().toISOString().slice(0, 10);
    
       this._adminPolicyService.SendClaims(this.ClaimsReportRequest,"" ).subscribe((data:any)=> {
       console.log(data.data)
         if(data.data != null){
           this.closeModal();
          //  $('#serch').click();
           if (data.data.errorCode==1)
           {
             this._toastrService.success("Success")
           }
           else{
             this._toastrService.error(data.data.errorDescription)
                }
         }else{        
                 $('.serverErrValidation').css("background-color", "#f8d7da") 
         }
       }, (error: any) => {
         if (error.errorDescription) {
          this._toastrService.error(error.errorDescription)
         }
       });
         





    }

  }


