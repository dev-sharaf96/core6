import { Component, OnInit } from '@angular/core';

import { AdminPolicyService } from 'src/app/core/services/admin-policy.service';
import { CheckoutsService } from 'src/app/core';
import { CommonResponse } from 'src/app/core/models/common.response.model';
import { PolicyCheckoutFilter } from './checkout-policies-filter';
import { PolicyCheckoutModel } from './checkout-policies-model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-policies',
  templateUrl: './checkout-policies.component.html',
  styleUrls: ['./checkout-policies.component.css']
})
export class CheckoutPoliciesComponent implements OnInit {

  policyCheckoutFilter: PolicyCheckoutFilter;
  policyCheckoutModel: PolicyCheckoutModel;
  policyCheckoutModelCount;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'Id';
  isEnglish: boolean;
  isEdit: boolean;
  today = new Date();
  constructor(
    private _checkoutsService: CheckoutsService,
    private _toastrService: ToastrService,
    private _translate: TranslateService
  ) { }

  ngOnInit() {
    this.policyCheckoutFilter = this._checkoutsService.policyCheckoutFilter;
    this.firstTime = true;
    this.isEnglish = true;
    this.isEdit = false;
  }

  filterClick(e) {
    e.reset();
  }

  policyCheckoutLazyLoad(event) {
    this.eventHolder = event;

    this._checkoutsService.getAllCheckedoutPoliciesBasedOnFilter(this.policyCheckoutFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<PolicyCheckoutModel>) => {
      
        this.policyCheckoutModel = data.data;
        if (this.policyCheckoutModel.id == 0) {
          this.firstTime = true;
          this._translate.get('common.noRecordsFound').subscribe(res => {
            this._toastrService.error(res);
          });
        }
        else {
          this.firstTime = false;
        }
      },
        (error: any) => {
          this.firstTime = true;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }

  updateCheckedoutPolicy(policyCheckoutModel: PolicyCheckoutModel) {
    if (this.isEmailValid(policyCheckoutModel.email) == false) {
      this._translate.get('insuranceCompany.emailError').subscribe(res => {
        this._toastrService.error(res);
      });
      return;
    }

    if (this.isPhoneValid(policyCheckoutModel.phone) == false) {
      this._translate.get('common.invalidPhone').subscribe(res => {
        this._toastrService.error(res);
      });
      return;
    }

    if (this.isIBANValid(policyCheckoutModel.iban) == false) {
      this._translate.get('common.invalidIBAN').subscribe(res => {
        this._toastrService.error(res);
      });
      return;
    }

    this._checkoutsService.updateCheckedoutPolicy(policyCheckoutModel)
      .subscribe(data => {
      
        if (data.data == true) {
          this._translate.get('common.saveDone').subscribe(res => {
            this._toastrService.success(res);
          });
        }
        else {
          data.data.forEach(item => {
            this._toastrService.error(item.description);
          });
        }
        this.firstTime = false;
      },
        (error: any) => {
     
          this.firstTime = true;
          if (error.errors) {
          
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );

  }

  addCheckedoutPolicy(policyCheckoutModel: PolicyCheckoutModel) {
    if (this.isEmailValid(policyCheckoutModel.email) == false) {
      this._translate.get('insuranceCompany.emailError').subscribe(res => {
        this._toastrService.error(res);
      });
      return;
    }

    if (this.isPhoneValid(policyCheckoutModel.phone) == false) {
      this._translate.get('common.invalidPhone').subscribe(res => {
        this._toastrService.error(res);
      });
      return;
    }

    if (this.isIBANValid(policyCheckoutModel.iban) == false) {
      this._translate.get('common.invalidIBAN').subscribe(res => {
        this._toastrService.error(res);
      });
      return;
    }

    this._checkoutsService.addCheckedoutPolicy(policyCheckoutModel)
      .subscribe(data => {
        if (data.data == true) {
          this._translate.get('common.saveDone').subscribe(res => {
            this.firstTime = true;
            this._toastrService.success(res);
          });
        }
        else {
          data.data.forEach(item => {
            this._toastrService.error(item.description);
          });
        }
      },
        (error: any) => {
          this.firstTime = true;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );

  }

  deleteCheckedoutPolicy(id: number) {
    if (confirm("Are you sure to delete ?")) {
      this._checkoutsService.deleteCheckedoutPolicy(id)
        .subscribe((data: CommonResponse<boolean>) => {
          if (data.data == true) {
            this._translate.get('common.deleteDone').subscribe(res => {
              this.firstTime = true;
              this._toastrService.success(res);
            });
          }
          else {
            this._translate.get('common.deleteFailed').subscribe(res => {
              this._toastrService.error(res);
            });
          }
        },
          (error: any) => {
            this.firstTime = true;
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.code, item.description);
              });
            }
          }
        );
    }
  }

  showAddForm() {
    this.policyCheckoutModel = new PolicyCheckoutModel();
    this.policyCheckoutModel.id = 0;
    this.firstTime = false;
  }

  isPhoneValid(phone: string) {
    var phoneRegx = new RegExp(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
    if (!phoneRegx.test(phone)) {
      return false;
    }
    return true;
  }

  isEmailValid(email: string) {
    var emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegx.test(email)) {
      return false;
    }
    return true;
  }

  isIBANValid(iban: string) {
    iban = iban.toLowerCase().replace("sa", "");
    if (iban.length < 22) {
      return false;
    }
    return true;
  }

  AddOrUpdateCheckedoutPolicy(){
    if(this.policyCheckoutModel.id <= 0){ 
      this.addCheckedoutPolicy(this.policyCheckoutModel);
    }
    else{
      this.updateCheckedoutPolicy(this.policyCheckoutModel);
    }
  }

}
