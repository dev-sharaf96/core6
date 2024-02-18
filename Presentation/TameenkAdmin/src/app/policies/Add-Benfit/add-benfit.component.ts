import * as FileSaver from 'file-saver';

import { AdminPolicyService, CommonResponse, LocalizationService, PolicyService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { Benfit } from './Models/Benfit';
import { ToastrService } from 'ngx-toastr';
import { addBenfitFilter } from './addBenfitFilter';
import { addBenfitModel } from './Models/addBenfitModel';
import { additionalBenfitsResponseModel } from './Models/additionalBenfitsResponseModel';
import { benfitResponseModel } from './Models/benfitsResponseModel';
import { data } from 'jquery';
import { observable } from 'rxjs';
import { purshedBenefit } from './Models/purchedBinfit';
import { purshedBenefitsId } from './Models/purshedBenefitsId';

@Component({
  selector: 'app-add-benfit',
  templateUrl: './add-benfit.component.html',
  styleUrls: ['./add-benfit.component.css']
})
export class AddBenfitComponent implements OnInit {
    benfitFilter: addBenfitFilter = new addBenfitFilter();
    selectedPolicy:benfitResponseModel;
    BenfitData:additionalBenfitsResponseModel[];
    CusomerBenfit:additionalBenfitsResponseModel;
    loading: boolean;
    loading1: boolean;

    firstTime: boolean;
    emptyStringValue = 'ــــــــــــــــــ';
    eventHolder;
    isEnglish: boolean;
    benfitsName:string[]=[];
    today = new Date();
    AccidentReport_Id=null;
    AccidentReport_File=null;
    isSearch = false;
    isFristStep=false;
    isScondStep=false;
    isTable=false;
    confermed=false;
    binfitsModel:addBenfitModel
    newDate;
    additionaBenfits:additionalBenfitsResponseModel;
    selectedBenfits:string[];
    benefits;
    oneBenifit:purshedBenefitsId;
    submitted:boolean = false;
    purshedBenefit:purshedBenefit

   customRequestِِAccidentReport:any={};
    constructor(
      private _adminPolicyService: AdminPolicyService,
      private _toastrService: ToastrService,
      private _localizationService: LocalizationService
    ) { }

    ngOnInit() {
      this.selectedBenfits=[];
     this. oneBenifit={
      benefitId: null
     };
      // this.ClaimsReportRequest.AccidentReportNumber=null;
      // this.ClaimsReportRequest.AccidentReport=this.AccidentReport_File;
this.purshedBenefit={
  ReferenceId:null,
  Benefits:[]
}


this.BenfitData=[{
  referenceId: null,
  errorCode:null,
  errorDescription:null,
  benefits:[{
    BenefitId : null,
    BenefitCode: null,
    BenefitNameAr:null,
    BenefitNameEn: null,
    BenefitDescAr: null,
    BenefitDescEn:null,
    BenefitPrice: null,
    IsSelected: false,
    IsReadOnly: false,
    CoveredCountry: null,
    AveragePremium: null,
    BenefitEffectiveDate: null,
    BenefitExpiryDate: null,
    DeductibleValue: null,
    TaxableAmount:null,
    VATAmount:null
  }]
}];





this.benefits=[{
  BenefitId : null,
  BenefitCode: null,
  BenefitNameAr:null,
  BenefitNameEn: null,
  BenefitDescAr: null,
  BenefitDescEn:null,
  BenefitPrice: null,
  IsSelected: false,
  IsReadOnly: false,
  CoveredCountry: null,
  AveragePremium: null,
  BenefitEffectiveDate: null,
  BenefitExpiryDate: null,
  DeductibleValue: null,
  TaxableAmount:null,
  VATAmount:null
}]


this.CusomerBenfit={
  referenceId: null,
  errorCode:null,
  errorDescription:null,
benefits : [

  {
    BenefitId : null,
    BenefitCode: null,
    BenefitNameAr: null,
    BenefitNameEn: null,
    BenefitDescAr:  null,
    BenefitDescEn:  null,
    BenefitPrice:null,
     IsSelected: false,
    IsReadOnly: false,
    CoveredCountry: null,
     AveragePremium: null,
    BenefitEffectiveDate:null,
    BenefitExpiryDate: null,
   DeductibleValue: null,
   TaxableAmount:null,
  VATAmount:null
  }
  
]};


this.selectedPolicy={
  policyNo: null,
  insuredNIN: null,
  policyIssueDate: null,
  insuranceCompanyNameAr: null,
  insuranceCompanyNameEn: null,
  policyExpiryDate:null,
  referenceId: null

};
      this.loading = false;
      this.loading1 = false;
      this.firstTime = true;
      this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
      ? true
      : false;
     this.isFristStep=true;
     this.isScondStep=true;
     this.isTable=true;
     this.confermed=false;
     this.newDate="";
     this.additionaBenfits={
      referenceId :null,
      benefits: null,
      errorCode:null,
      errorDescription:null
     };
     this.binfitsModel={
      benefitStartDate: null,
      referenceId: null,
      insuredId: null,
      policyNo: null,
     };
    }


    filterClick(e) {
      this.isSearch = true;
      this.loading = true;
      e.reset();
    }
    SuccessPoliciesLazyLoad(event) {
      this.eventHolder = event;
       this.isScondStep=true;
       this.isFristStep=true;
       this.confermed=false;
       this._adminPolicyService.getBenefitData(this.benfitFilter,`pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
       .subscribe((data:any)=> {
        this.isTable=false;
        this.BenfitData=data.data;
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


showBenfitDetails(data:benfitResponseModel){
let today = new Date().toISOString().slice(0, 10);
this.selectedPolicy=data;
this.isTable=true;
this.isFristStep=false;
this.isScondStep=true;

}


AddBenfit(){
  this.submitted = true;
  this.selectedPolicy;
  this.binfitsModel.benefitStartDate=this.newDate;
  this.binfitsModel.insuredId=this.selectedPolicy.insuredNIN;
  this.binfitsModel.policyNo=this.selectedPolicy.policyNo;
  this.binfitsModel.referenceId=this.selectedPolicy.referenceId;
  this.isTable=true;
  this.isFristStep=true;
 this._adminPolicyService.addBenefit(this.binfitsModel)
  .subscribe((data: CommonResponse<additionalBenfitsResponseModel>)=> {
   this.isTable=true;
  this.CusomerBenfit=data.data;

  this.loading1 = false;
     this.firstTime = false;
      this.isSearch = false;
      if(data.data.errorCode==1){
        this.isScondStep=false;
        this.loading1=false;
      }
      else{
        this.isScondStep=true;
        this._toastrService.error(data.data.errorDescription) ;
      }
   }, (error: any) => {
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
PurchedBenfit(){
  this.loading1=true;
  this.purshedBenefit.ReferenceId=this.CusomerBenfit.referenceId;
for(let i=0 ; i<this.selectedBenfits.length;i++){
  if(this.selectedBenfits!=null){
    this.oneBenifit = new purshedBenefitsId();
    this.oneBenifit.benefitId=this.selectedBenfits[i];
    this.purshedBenefit.Benefits.push(this.oneBenifit)
  }

}


this._adminPolicyService.purshedBenefit(this.purshedBenefit)
.subscribe((data:any)=> {
 
 this.isTable=false;
 
 
   this.loading1 = false;
   this.firstTime = false;
   if (data.data.errorCode==1)
   {
     this._toastrService.success("Success");
     this.firstTime=true;
     this.confermed=true;
 this.purshedBenefit={
      ReferenceId:null,
      Benefits:[]
    }
   }
   else{
    this.loading1 = false;
     this._toastrService.error(data.data.ErrorDescription)
     this.firstTime=false;
      this.isScondStep=false;
      this.isTable=true;
     this.confermed=false;
     this.purshedBenefit={
      ReferenceId:null,
      Benefits:[]
    }

     }
   
  }, (error: any) => {
   this.loading1 = false;
   this.firstTime = false;
    this.isSearch = false;
    if (error.errors) {
      error.errors.forEach(item => {
        this._toastrService.error(item.code, item.description);
      });
    }
  }
);
this.newDate="";
this.selectedBenfits=[];
}
}
