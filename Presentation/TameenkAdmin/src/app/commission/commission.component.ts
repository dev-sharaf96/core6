import { data } from 'jquery';
import { Component, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, LocalizationService } from '../core';
import { CommissionService } from '../core/services/commission.service';
import { commissionFilter } from './commission-filter';
import { CommissionListing } from './commission-listing';
import * as FileSaver from 'file-saver';
import { SelectItem } from 'primeng/api';
import { CommissionListingEditModel } from './commission-listing-edit-model';
import {CalendarModule} from 'primeng/calendar';
import { PaymentsService } from 'src/app/core/services/payments.service';
import { IIdNamePairModel } from 'src/app/core';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit {
  commissionFilter: commissionFilter = new commissionFilter();
  Commissions: CommissionListing[];
  CommissionEdit:CommissionListingEditModel = new CommissionListingEditModel();
  insuredType:SelectItem[];
  insuredtypeValue : number = null ;
  newCommission = new CommissionListing();
  CommissionsCount;
  isEnglish: boolean;
  isEdit: boolean;
  loading: boolean;
  eventHolder;
  emptyStringValue = 'ــــــــــــــــــ';
  clicked = false;
  openPpUp = false;
  codeErrorDiv = false;
  codeErrorDivMessage = '';
  methods: IIdNamePairModel[];
  method: IIdNamePairModel = new IIdNamePairModel();
  selectedValue;
  constructor(
    private _CommissionService: CommissionService,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService,
    private _paymentsService: PaymentsService,
  ) {

    this.isEnglish =  this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
    ? true
    : false;
    if(this.isEnglish){
      this.insuredType=[
        {label:'All', value:null},
        {label:'TPL', value:'1'},
        {label:'Comprehensive', value:'2'},
      ];
      
    }else{
      this.insuredType=[
        {label:'الكل', value:null},
        {label:'سيارات', value:'1'},
        {label:'شامل', value:'2'},
      ];
    
    }
   }

  ngOnInit() {
    this.loading = false;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }
  initializeOccupatios() {
    this.loading = true;
    this.Commissions = [];
    this.CommissionsCount = 0;
    this._CommissionService.getcommissionsWithFilter('', '', 0, 10).subscribe((newdata: CommonResponse<CommissionListing[]>) => {
      if (newdata.data.length > 0) {
        this.Commissions = newdata.data;
      } else {
        this.Commissions = [];
      }
      this.CommissionsCount = newdata.totalCount;
      this.loading = false;
    });
  }
  filterClick(e) {
    console.log(this.insuredtypeValue);
    this.commissionFilter.insuranceTypeCode =this.insuredtypeValue;
    e.reset();
  }
  requestsLazyLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    console.log(this.commissionFilter);
    this._CommissionService.getcommissionsWithFilter(this.commissionFilter.insuranceCompanyId,
      this.commissionFilter.insuranceTypeCode, pageIndex, pageInSize)
    .subscribe((data: CommonResponse<CommissionListing[]>) => {
          if (data.data.length > 0) {
            this.Commissions = data.data;
          } else {
            this.Commissions = [];
          }
          this.CommissionsCount = data.totalCount;
          this.loading = false;
        }, (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.insuranceCompanyId, item.insuranceTypeCode);
            });
          }
        });
  }
  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      this._CommissionService.getcommissionsAsExcel(this.commissionFilter.insuranceCompanyId, this.commissionFilter.insuranceTypeCode).subscribe((data) => {
        if (data.data) {
          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
           'CommissionAndFees.xlsx');
        }
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.insuranceCompanyId, item.insuranceTypeCode);
          });
        }
      });
    }
  }
  CreatedDate:Date =new Date();
  showCommissionPopup(commession) {
    this.codeErrorDiv = false;
    this.codeErrorDivMessage = '';
    this.CommissionEdit = JSON.parse(JSON.stringify(commession));
    this.selectedValue=this.CommissionEdit.PaymentMethod;
    this._paymentsService.getPaymentMethods().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.methods = [];
      this.methods = data.data;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      ? this.methods.unshift({id: null, name: 'all'})
      : this.methods.unshift({id: null, name: 'الكل'});
      this.method = this.methods.find((c) => c.id === this.CommissionEdit.PaymentMethod);
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
      this.isEdit = true;
    this.openPpUp = true;
  }

  closeCommissionModal() {
    this.openPpUp = false;
    this.clicked = false;
  this.CommissionEdit = new CommissionListingEditModel();
  }

  Updatecommission(CommissionEdit){
    CommissionEdit.PaymentMethod=this.method.id;
    this.CommissionEdit = JSON.parse(JSON.stringify(CommissionEdit));
   this._CommissionService.updatecommission(this.CommissionEdit).subscribe ((data:CommonResponse<UpdateOutput>) =>  {
    if (data.data.ErrorCode === 1) {
      console.log(data);
      this.closeCommissionModal();
      this.requestsLazyLoad(this.eventHolder);
      this._toastrService.success(data.data.ErrorDescription);
    } else {
      this._toastrService.error(data.data.ErrorDescription);
    }
    this.openPpUp = false;
    this.clicked = false;
    this.codeErrorDiv = false;
    this.codeErrorDivMessage = '';
  }, (error: any) => {
    if (error.errors) {
      error.errors.forEach(item => {
        this._toastrService.error(item.description, item.code);
      });
    }
  });
}
  
}

export class UpdateOutput {
  ErrorDescription: string;
  ErrorCode: number;
}
 
