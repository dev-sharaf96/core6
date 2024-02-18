import { AdminPolicyService, CommonResponse, LocalizationService, PolicyService, VehicleService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DriverFilterResponseModel } from './Models/DriversFilterResponse';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { addDriverFilter } from './AddDriverFilter';
import { data } from 'jquery';
import { pursheseRequestModel } from './Models/pursheseRequestModel';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  request: any;
  addtionalDreiverNiN:any;
  taxableAmount :any;
  vatAmount :any;
  totalAmoun:any;
  purshesdData?:pursheseRequestModel={
    referenceId:'',
    paymentAmount:''
  };
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
  currentYear: number = new Date().getFullYear();
  // hijriMonths = 1 === 1
  //   ? this.hijriMonthsAr
  //   : this.hijriMonthsEn;
  hijriMonths=[];
  months;
  years: any[] = [];
  minYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 100;
  maxYears: number = Math.round((this.currentYear - 622) * (33 / 32));
  // gregorianMonths = 1 === 1 ? this.gregorianMonthsAr : this.gregorianMonthsEn;
  gregorianMonths=[];
  success = false;
  relationShipCodes;
  submitted = false;
  result: any;
  paymentBillNumber = "1231231230200";
  paymentAmount = 100;
  mycurrentLangu;
  policies;
  selectedIndex = 0;
  selectedPolicy = null;
  showLoading = false;
  servererror;
  displayedColumns = [
    'policyNo',
    'policyIssueDate',
    'check'
  ];
violation = { id: null };
violations: any[];
thereViolation = false;
countries;
// submitted = false;
  addDriverFilter: addDriverFilter = new addDriverFilter();
  selectedDriverPolicy:DriverFilterResponseModel;
    driverData:DriverFilterResponseModel[];
    // CusomerBenfit:additionalBenfitsResponseModel;
    loading: boolean;
    firstTime: boolean;
    emptyStringValue = 'ــــــــــــــــــ';
    eventHolder;
    isEnglish: boolean;
    today = new Date();
    AccidentReport_Id=null;
    AccidentReport_File=null;
    isSearch = false;
    isFristStep=false;
    isScondStep=false;
    isTable=false;
    confermed=false;
    // binfitsModel:addBenfitModel
    newDate;
    // additionaBenfits:additionalBenfitsResponseModel;
    selectedBenfits:string[];
   // benefits;
    // oneBenifit:purshedBenefitsId;
    // purshedBenefit:purshedBenefit

   customRequestِِAccidentReport:any={};
    constructor(
      private _http:HttpClient,
      private fb:FormBuilder,
      private _adminPolicyService: AdminPolicyService,
      private _toastrService: ToastrService,
      private _localizationService: LocalizationService,
      private _vehicleService: VehicleService
    ) { }
    nationalIdValidation(control: FormControl): { [s: string]: boolean } {

      let nin = control.value ? control.value.toString() : '';
      nin = nin.trim();
      const kafil = nin.substr(0, 1);
      const type = nin.substr(0, 1);
      if (nin) {
        if (nin.length !== 10) {
          return { 'invalid': true };
        }
        if (kafil === '7') {
          return null;
        }
        if (type !== '2' && type !== '1') {
          return { 'invalid': true };
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
        return (sum % 10 !== 0) ? { 'invalid': true } : null;
      }
    }


 AddForm =  this.fb.group({
 
  birthDateYear:  ['', [Validators.required]],
  newDate:  ['', [Validators.required]],
  nationalId:  ['', [Validators.required]],
  birthDateMonth:['', [Validators.required]],
  relationShipId:['', [Validators.required]],
 });
  
 generateYears(min, max) {
  this.years = [];
  for (let i = min; i <= max; i++) {
    this.years.push(i);
  }
}

    ngOnInit() {
this.result={};
this.request={};
      this.FillLookups();
      this.createForm();

// this.purshesdData={

//     referenceId: null,
//      paymentAmount: null
//  }


      this.mycurrentLangu = window.localStorage.getItem("language");

      if(this.mycurrentLangu=="en"){
this.hijriMonths=this.hijriMonthsEn;
this.gregorianMonths=this.gregorianMonthsEn
      }
      else{
        this.hijriMonths=this.hijriMonthsAr;
        this.gregorianMonths=this.gregorianMonthsAr
      }
      // this.generateYears(this.minYears, this.maxYears);
      // this.loading = true;

      // this.months = [];
      // this.gregorianMonths.forEach((month, i) => {
      //   this.months.push({ id: i + 1, name: i + 1 + '-' + month });
      // });
      // this.selectedBenfits=[];
    //  this. oneBenifit={
    //   benefitId: null
    //  };
   
// this.purshedBenefit={
//   ReferenceId:null,
//   Benefits:[]
// }


// this.BenfitData=[{
//   referenceId: null,
//   benefits:[{
//     BenefitId : null,
//     BenefitCode: null,
//     BenefitNameAr:null,
//     BenefitNameEn: null,
//     BenefitDescAr: null,
//     BenefitDescEn:null,
//     BenefitPrice: null,
//     IsSelected: false,
//     IsReadOnly: false,
//     CoveredCountry: null,
//     AveragePremium: null,
//     BenefitEffectiveDate: null,
//     BenefitExpiryDate: null,
//     DeductibleValue: null,
//     TaxableAmount:null,
//     VATAmount:null
//   }]
//}];





// this.benefits=[{
//   BenefitId : null,
//   BenefitCode: null,
//   BenefitNameAr:null,
//   BenefitNameEn: null,
//   BenefitDescAr: null,
//   BenefitDescEn:null,
//   BenefitPrice: null,
//   IsSelected: false,
//   IsReadOnly: false,
//   CoveredCountry: null,
//   AveragePremium: null,
//   BenefitEffectiveDate: null,
//   BenefitExpiryDate: null,
//   DeductibleValue: null,
//   TaxableAmount:null,
//   VATAmount:null
// }]


// this.CusomerBenfit={
//   referenceId: null,
// benefits : [

//   {
//     BenefitId : null,
//     BenefitCode: null,
//     BenefitNameAr: null,
//     BenefitNameEn: null,
//     BenefitDescAr:  null,
//     BenefitDescEn:  null,
//     BenefitPrice:"100",
//      IsSelected: false,
//     IsReadOnly: false,
//     CoveredCountry: null,
//      AveragePremium: null,
//     BenefitEffectiveDate:null,
//     BenefitExpiryDate: null,
//    DeductibleValue: null,
//    TaxableAmount:null,
//   VATAmount:null
//   }
  
// ]};


this.selectedDriverPolicy={
  policyNo: null,
  insuredNIN: null,
  policyIssueDate: null,
  insuranceCompanyNameAr: null,
  insuranceCompanyNameEn: null,
  policyExpiryDate:null,
  referenceId: null

};
      this.loading = true;
      this.firstTime = true;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === "en"
      ? true
      : false;
     this.isFristStep=true;
     this.isScondStep=true;
     this.isTable=true;
     this.confermed=false;
     this.newDate="";
    //  this.additionaBenfits={
    //   referenceId :null,
    //   benefits: null,
    //  };
    //  this.binfitsModel={
    //   benefitStartDate: null,
    //   referenceId: null,
    //   insuredId: null,
    //   policyNo: null,
    //  };
    }


    changeId() {
      this.AddForm.controls["birthDateMonth"].setValue(null);
      this.AddForm.controls["birthDateYear"].setValue(null);
      if (this.AddForm.controls["nationalId"].value[0] === '1') {
        this.months = [];
        this.hijriMonths.forEach((month, i) => {
          this.months.push({ id: i + 1, name: i + 1 + '-' + month });
        });
        this.minYears = Math.round((this.currentYear - 622) * (33 / 32)) - 100;
        this.maxYears = Math.round((this.currentYear - 622) * (33 / 32));
        this.generateYears(this.minYears, this.maxYears);
      } else if (this.AddForm.controls["nationalId"].value[0] === '2') {
        this.months = [];
        this.gregorianMonths.forEach((month, i) => {
          this.months.push({ id: i + 1, name: i + 1 + '-' + month });
        });
        this.minYears = this.currentYear - 100;
        this.maxYears = this.currentYear;
        this.generateYears(this.minYears, this.maxYears);
      }
    }


    FillLookups() {
      this.months = [];
      this.hijriMonths.forEach((month, i) => {
        this.months.push({ id: (i + 1), name: (i + 1) + '-' + month });
      });
      //this.generateYears(this.minYears, this.maxYears);
      this.loading = true;
      // this.tomorrow.setDate(new Date().getDate() + 1);
       this._vehicleService.getRelationShipCodes().subscribe((data) => {
     
       this.relationShipCodes = data.data;
  
      }, (error: any) => error);
    }

    createForm() {
      this.AddForm = this.fb.group({
        birthDateYear:  ['', [Validators.required]],
        newDate:  ['', [Validators.required]],
        nationalId: ['', [Validators.required, this.nationalIdValidation.bind(this)]],
        birthDateMonth:['', [Validators.required]],
        relationShipId:['', [Validators.required]],
      });
    }

    filterClick(e) {
      this.isSearch = true;
      this.isFristStep=true;
      e.reset();
      console.log(this.addDriverFilter)
    
    }
    SuccessPoliciesLazyLoad(event) {
      this.eventHolder = event;
      this.loading = true;
       this.loading = false;
       this.isScondStep=true;
       this.isFristStep=true;
       this.confermed=false;
       this._adminPolicyService.getDriversData(this.addDriverFilter,`pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
       .subscribe((data:any)=> {
        this.isTable=false;
           console.log(data.data)
        this.driverData=data.data;
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


 showDriverDetails(data:DriverFilterResponseModel){
 let today = new Date().toISOString().slice(0, 10);
 this.selectedDriverPolicy=data;
 this.isTable=true;
 this.isFristStep=false;
 this.isScondStep=true;

 }


// AddBenfit(){
//   this.submitted = true;
//   this.selectedPolicy;
//   this.binfitsModel.benefitStartDate=this.newDate;
//   this.binfitsModel.insuredId=this.selectedPolicy.insuredNIN;
//   this.binfitsModel.policyNo=this.selectedPolicy.policyNo;
//   this.binfitsModel.referenceId=this.selectedPolicy.referenceId;
//   this.isTable=true;
//   this.isFristStep=true;
//  this._adminPolicyService.addBenefit(this.binfitsModel)
//   .subscribe((data:any)=> {
//    this.isTable=true;
//    this.isScondStep=false;
//    console.log(data.data)
//   this.CusomerBenfit=data.data;
// // add data for test delete befor publish
// this.CusomerBenfit={
//   referenceId: null,
// benefits : [
//   {
//     BenefitId : "120",
//     BenefitCode: "sdf120",
//     BenefitNameAr: "Rajhi",
//     BenefitNameEn: "rajhi",
//     BenefitDescAr:  "Rent Car Facility",
//     BenefitDescEn:  "Rent Car Facility",
//   BenefitPrice:"100",
//     IsSelected: false,
//    IsReadOnly: false,
//     CoveredCountry: "egypt",
//      AveragePremium: "bb",
//     BenefitEffectiveDate: "ggg",
//     BenefitExpiryDate: "12-2-2020",
//    DeductibleValue: "1258",
//    TaxableAmount:"148",
//   VATAmount:"1250",
//   },
//   {
//     BenefitId : "121",
//     BenefitCode: "sdf121",
//     BenefitNameAr: "tawnya",
//     BenefitNameEn: "",
//     BenefitDescAr:  "Road services",
//     BenefitDescEn:  "Road services",
//   BenefitPrice:"200",
//     IsSelected: false,
//    IsReadOnly: false,
//     CoveredCountry: "egypt",
//      AveragePremium: "bb",
//     BenefitEffectiveDate: "ggg",
//     BenefitExpiryDate: "12-2-2020",
//    DeductibleValue: "1258",
//    TaxableAmount:"148",
//   VATAmount:"1250",
//   }
  
// ]};
//  // End data for test
//  console.log(this.CusomerBenfit)

//      this.loading = false;
//      this.firstTime = false;
//       this.isSearch = false;
//    }, (error: any) => {
//      this.loading = false;
//      this.firstTime = false;
//       this.isSearch = false;
//       if (error.errors) {
//         error.errors.forEach(item => {
//           this._toastrService.error(item.code, item.description);
//          });
//      }
//      }
//    );
// }
// PurchedBenfit(){
//   this.purshedBenefit.ReferenceId=this.selectedPolicy.referenceId;
// for(let i=0 ; i<this.selectedBenfits.length;i++){
// this.oneBenifit.benefitId=this.selectedBenfits[i];
// this.purshedBenefit.Benefits.push(this.oneBenifit)
// }
// //console.log(this.selectedBenfits);
// console.log(this.purshedBenefit);

// this._adminPolicyService.purshedBenefit(this.purshedBenefit)
// .subscribe((data:any)=> {
 
//  this.isTable=false;
//     console.log(data);
//    // this.confermed=true;
//    this.loading = false;
//    this.firstTime = false;
//    if (data.data.errorCode==1)
//    {
//      this._toastrService.success("Success");
//      this.firstTime=true;
//      this.confermed=true;
//    }
//    else{
//      this._toastrService.error(data.data.ErrorDescription)
//      this.firstTime=false;
//       this.isScondStep=false;
//       this.isTable=true;
//      this.confermed=false;
//      }
   
//   }, (error: any) => {
//    this.loading = false;
//    this.firstTime = false;
//     this.isSearch = false;
//     if (error.errors) {
//       error.errors.forEach(item => {
//         this._toastrService.error(item.code, item.description);
//       });
//     }
//   }
// );
// this.newDate="";
// this.selectedBenfits=[];
// }




SubmitDriver() {
  console.log(this.AddForm.value);
  this.submitted = true;
  if (!this.AddForm.valid ) {
    return;
  }
  this.addtionalDreiverNiN=  this.AddForm.controls["nationalId"].value
  
  this.request = {
    // policyNo: this.AddForm.controls["policyNo"].value,
    // insuredId: this.AddForm.controls["insuredId"].value,
    // referenceId: this.AddForm.controls["referenceId"].value,
    policyNo: this.selectedDriverPolicy.policyNo,
    insuredId: this.selectedDriverPolicy.insuredNIN,
    referenceId: this.selectedDriverPolicy.referenceId,
    additionStartDate: this.AddForm.controls["newDate"].value,
    driver: {
      nationalId: this.AddForm.controls["nationalId"].value,
      medicalConditionId: 1, // القيود حسب رخصة القيادة
      violationIds: [    // de ddl هل هناك مخالفات على السائق؟
      ],
      licenseExpiryMonth: null,// dayman null
      licenseExpiryYear: null, //dayman null
      edcuationId: 4,//  مستوى التعليم
      childrenBelow16Years: 0, //عدد الأبناء دون عمر 16 سنة
      drivingPercentage: 100,// نسبة القيادة         
      driverExtraLicenses: null,// هل لديك رخصة قيادة سارية في دولة أخرى؟
      driverNOALast5Years: 0,// عدد الحوادث في أخر 5 سنوات
      driverWorkCityCode: null,  //هل العنوان نفس المالك؟
      driverWorkCity: null,//  b null
      driverHomeCityCode: null,
      driverHomeCity: null,
      isCompanyMainDriver: false,
      relationShipId: this.AddForm.controls["relationShipId"].value,
      birthDateMonth: this.AddForm.controls["birthDateMonth"].value,
      birthDateYear: this.AddForm.controls["birthDateYear"].value,
    }
  }
  console.log(this.request)
  this._adminPolicyService.addDriverToPolicy(this.request).subscribe((data: any) => {
    this.result=data.data;
    console.log(this.result);


   // Return Code Befor push
     if (this.result.ErrorCode == 1)
      {
      this.success = true;
      this.isFristStep=true;
      this.isScondStep=false;
      this.AddForm.reset();
  
     }
     else {
      this._toastrService.error(data.data.ErrorDescription);
    }

  }, (error: any) => {
    if (error.errors) {
      error.errors.forEach(item => {
        this._toastrService.error(item.description, item.code);
      });
    }
  });
}





Purchsed(){
  this.purshesdData.referenceId= this.selectedDriverPolicy.referenceId;
 this.purshesdData.paymentAmount=this.result.TotalAmount
  console.log(this.purshesdData); 
  this._adminPolicyService.pursheseDriverToPolicy(this.purshesdData).subscribe((data: any) => {
   
   console.log(data);

// data.data.ErrorCode = 1;
// data.data.ErrorDescription ="success";
   // Return Code Befor push
      if (data.data.ErrorCode == 1)
      {
        this._toastrService.success(data.data.ErrorDescription);
      this.success = true;
      this.isFristStep=true;
      this.isScondStep=true;
      this.confermed=true;

     }
     else {
      this._toastrService.error(data.data.ErrorDescription);
   }

  }, (error: any) => {
    if (error.errors) {
      error.errors.forEach(item => {
        this._toastrService.error(item.description, item.code);
      });
    }
  });

}
}
