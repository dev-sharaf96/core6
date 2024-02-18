import { Component, OnInit } from '@angular/core';
import { InsuranceCompany, InsuranceCompanyService, CommonResponse } from '../core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  pendingData: InsuranceCompany[];

  pendingLoading: boolean;
  pendingTotalRecords: number;
  sortOrder = true;
  sortField = 'InsuranceCompanyID';
  emptyStringValue = 'ـــــــــــــــــ';
  element: HTMLElement;

  /**
   * @constructor Creates an instance of Insurance Company
   * @param {insuranceCompanyService} _insuranceCompanyService
   * @param {TranslateService} translate
   * @memberof InsuranceCompanyComponent
   */
  constructor(
    private _insuranceCompanyService: InsuranceCompanyService,
    private translate: TranslateService, private router: Router,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.pendingLoading = true;
  }



  changeState(event, company,automatic:Boolean) {
    this.pendingLoading = true;
    var tempEvent = event;
    this._insuranceCompanyService
      .toggleCompanyActivation(event.checked,company.id)
      .subscribe(
        (data: CommonResponse<InsuranceCompany>) => {
          this.pendingLoading = false;

          if(automatic == false){
          var index = this.pendingData.indexOf(company);
          
          this.pendingData[index].isActiveTPL = event.checked ;
          this.changeStateByType(event,company,1,automatic=true);

          this.pendingData[index].isActiveComprehensive = event.checked ;
          this.changeStateByType(event,company,2,automatic=true);
          }

        },
        (error: any) => {
          this.pendingLoading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );

  }

  changeStateByType(event, company , insuraceType: number,automatic:Boolean) {
    this.pendingLoading = true;
    this._insuranceCompanyService
      .toggleCompanyActivationByType(event.checked, company.id, insuraceType)
      .subscribe(
        (data: CommonResponse<InsuranceCompany>) => {
          this.pendingLoading = false;

          var index = this.pendingData.indexOf(company);
          
          if(event.checked){
          this.pendingData[index].isActive = event.checked ;
          this.changeState(event,company,automatic=true);
          }
          else{
            var tempEvent = event;
            var TPLActive = this.pendingData[index].isActiveTPL ;
            var CompActive = this.pendingData[index].isActiveComprehensive ;
            if(TPLActive == false && CompActive == false){
              this.pendingData[index].isActive = false ;
              tempEvent.checked = false;
              this.changeState(tempEvent,company,automatic=true);
            }

          }
        },
        (error: any) => {
          this.pendingLoading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );

  }

  changeAddressValidationState(event, company) {
      this.pendingLoading = true;
      var tempEvent = event;
      this._insuranceCompanyService
        .toggleCompanyAddressValidationActivation(event.checked,company.id)
        .subscribe(
          (data: CommonResponse<InsuranceCompany>) => {
            this.pendingLoading = false;
          },
          (error: any) => {
            this.pendingLoading = false;
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.code, item.description);
              });
            }
          }
        );

    }

  changeStateTabby(event, company , insuraceType: number,automatic:Boolean) {
    this.pendingLoading = true;
    this._insuranceCompanyService
      .toggleCompanyActivationTabby(event.checked, company.id, insuraceType)
      .subscribe(
        (data: CommonResponse<InsuranceCompany>) => {
          this.pendingLoading = false;
        },
        (error: any) => {
          this.pendingLoading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }

  goToEdit(insuranceCompany: InsuranceCompany) {
    const myObjStr = JSON.stringify(insuranceCompany);
    const jsonObj = JSON.parse(myObjStr);

    const navigationExtras: NavigationExtras = {
      queryParams: jsonObj
    };
    this.router.navigate(['edit'], navigationExtras);
  }
  /**
   * @method pendingLazyLoad()
   * @summary load pending requests async by pagination and sort data
   *
   * @param {*} event
   * @memberof InsuranceCompanyComponent
   */
  pendingLazyLoad(event) {
    this.pendingLoading = true;

    // load page in first time
    if (event.sortField !== undefined && event.sortField !== '') {
      this.sortField = event.sortField;
    }

    if (event.sortOrder === 0) {
      this.sortOrder = true;
    } else if (event.sortOrder === 1) {
      this.sortOrder = false;
      if (this.sortField.indexOf(',') > 0) {
        this.sortField = this.sortField.split(',').join(' ASC ,');
      }
    } else {
      this.sortOrder = true;
      if (this.sortField.indexOf(',') > 0) {
        this.sortField = this.sortField.split(',').join(' DESC ,');
      }
    }

    this._insuranceCompanyService
      .getAllInsuranceCompanies(event.first / event.rows, event.rows, this.sortField, this.sortOrder)
      .subscribe(
        (data: CommonResponse<InsuranceCompany[]>) => {
          this.pendingTotalRecords = data.totalCount;
          this.pendingData = data.data;
          this.pendingLoading = false;

          console.log("data is ",  this.pendingData);
        },
        (error: any) => {
          this.pendingLoading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }
}
