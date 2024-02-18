import { Component, OnInit } from '@angular/core';

import { AdminPolicyService } from '../core/services/admin-policy.service';
import { CommonResponse } from '../core/models/common.response.model';
import { LocalizationService } from '../core/services/localization.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from './users-model';
import { UsersFilter } from './users-filter';
import { YakeenMobileVerificationModel } from './yakeen-mobile-verification-model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersFilter: UsersFilter;
  userModel: UserModel;
  userModelCount;
  firstTime: boolean;
  emptyStringValue = 'ــــــ';
  eventHolder;
  defaultSortField = 'Id';
  isEnglish: boolean;
  isEdit: boolean;
  today = new Date();
  openPopUp:any;
  userEmail = '';
  userPhone = '';
  openPpUp = false;
  clicked = false;
  emailErrorDiv = false;
  emailErrorDivMessage = '';
  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 lockedreason:string;

  constructor(
    private _adminPolicyService: AdminPolicyService,
    private _toastrService: ToastrService,
    private _translate: TranslateService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.lockedreason="";
    this.usersFilter = new UsersFilter();
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode == 'en'
        ? true
        : false;
  }

  OpenPopup(data) {
    //this.selectedPolicy = data;
    this.openPopUp = true;
   
  }
 closePopup(){
    this.openPopUp = false;
    this.clicked = false;
  }
  //on submitt popup
  manageUserLock(userId, toLock,lockedreason) {
    // alert(userId+toLock+lockedreason)
    this.clicked = true;
    if(toLock==false){
      lockedreason="";
    }
      this._adminPolicyService.manageUserLock(userId, toLock,lockedreason)
        .subscribe((data: CommonResponse<boolean>) => {
         
          if (data.data == true) {
            this.userModel.isLocked = toLock ? true : false;
            this.userModel.LockedReason=this.lockedreason;
            this._adminPolicyService.getUserDetailsBasedOnFilter(this.userModel.email, this.usersFilter.userId, this.usersFilter.mobile, this.usersFilter.sadadNo)
      .subscribe((data: CommonResponse<UserModel>) => {
       
        this.userModel = data.data;

        if (this.userModel == null) {
          this.firstTime = true;
          this._translate.get('common.noRecordsFound').subscribe(res => {
            this._toastrService.error(res);
          });
        }
        else {
          if (this.userModel.lockoutEnabled == true && new Date(this.userModel.lockoutEndDateUtc) > this.today) {
            this.userModel.isLocked = true;
          }
          else {
            this.userModel.isLocked = false;
          }
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
console.log(data.data);
             this.closePopup();
             if (toLock==true)
             this._toastrService.success("the User is locked successfully")
             else
             this._toastrService.success("the User is UNlocked successfully")
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

  userDetailsLazyLoad(event) {
    this.userModel = new UserModel();
    var isValid = this.AtLeastOneValidator();

    if (isValid == false) {

      var errorMessageEn = "Please fill at least one field";
      var errorMessageAr = "برجاء ملئ حقل واحد علي الأقل";
      this.firstTime = true;
      this._toastrService.error(this.isEnglish ? errorMessageEn : errorMessageAr);
      return;
    }

    this._adminPolicyService.getUserDetailsBasedOnFilter(this.usersFilter.email, this.usersFilter.userId, this.usersFilter.mobile, this.usersFilter.sadadNo)
      .subscribe((data: CommonResponse<UserModel>) => {
        this.userModel = data.data;

        if (this.userModel == null) {
          this.firstTime = true;
          this._translate.get('common.noRecordsFound').subscribe(res => {
            this._toastrService.error(res);
          });
        }
        else {
          if (this.userModel.lockoutEnabled == true && new Date(this.userModel.lockoutEndDateUtc) > this.today) {
            this.userModel.isLocked = true;
          }
          else {
            this.userModel.isLocked = false;
          }
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

  DeleteUser() {
    var mobile = document.getElementById('mobile') as HTMLInputElement;

    if (!mobile.value) {

      var errorMessageEn = "Please enter phone number";
      var errorMessageAr = "برجاء إدخال رقم الجوال";
      this.firstTime = true;
      this._toastrService.error(this.isEnglish ? errorMessageEn : errorMessageAr);
      return;
    }

    this._adminPolicyService.DeleteUser(this.usersFilter.mobile)
      .subscribe((data: CommonResponse<boolean>) => {
        if (data.data) {
          var errorMessageEn = "User has been deleted successsfully";
          var errorMessageAr = "تم حذف المستخدم بنجاح";
          this._toastrService.success(this.isEnglish ? errorMessageEn : errorMessageAr);
        } else {
          var errorMessageEn = "Can't delete this user";
          var errorMessageAr = "لا يمكن حذف هذا المستخدم";
          this._toastrService.error(this.isEnglish ? errorMessageEn : errorMessageAr);
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

  AtLeastOneValidator() {
    console.log('this.usersFilter ', this.usersFilter);
    // var email = document.getElementById('email') as HTMLInputElement;
    // var userId = document.getElementById('userId') as HTMLInputElement;
    // var mobile = document.getElementById('mobile') as HTMLInputElement;

    if (this.usersFilter.email || this.usersFilter.userId || this.usersFilter.mobile || this.usersFilter.sadadNo) {
      return true;
    }
    else {
      return false;
    }
  };

  showMakerPopup() {
    this.userEmail = this.userModel.email;
    this.userPhone=this.userModel.phoneNumber;
    this.openPpUp = true;
  }

  closeMakerModal() {
    this.openPpUp = false;
    this.clicked = false;
    this.userEmail = '';
    this.userPhone='';
  }

  UpdateEmail() {
    this.clicked = true;
if (this.userModel.email !== this.userEmail && this.userModel.phoneNumber !== this.userPhone ) {
      this._adminPolicyService.UpdateUserEmail(this.userEmail, this.userModel.id,this.userPhone).subscribe(data => {
        if (data.data.ErrorCode === 1) {
          this._toastrService.success(data.data.ErrorDescription);
          this.userModel.email = this.userEmail;
          this.userModel.phoneNumber = this.userPhone;
        } else if (data.data.ErrorCode === 3) {
          this.emailErrorDivMessage = (this.isEnglish) ? 'Email or Phone exist for another user' : 'البريد الإلكترونى او رقم الهاتف موجود لشخص آخر';
          this.emailErrorDiv = true;
          this.clicked = false;
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }

        if (data.data.ErrorCode !== 3) {
          this.openPpUp = false;
          this.clicked = false;
          this.emailErrorDivMessage = '';
          this.emailErrorDiv = false;
          this.userEmail = '';
        }
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }
    //mail updated only
    else if (this.userModel.email !== this.userEmail&&this.userModel.phoneNumber === this.userPhone){
      this.userPhone="";
      this._adminPolicyService.UpdateUserEmail(this.userEmail, this.userModel.id,this.userPhone).subscribe(data => {
        if (data.data.ErrorCode === 1) {
          this._toastrService.success(data.data.ErrorDescription);
          this.userModel.email = this.userEmail;
        } else if (data.data.ErrorCode === 3) {
          this.emailErrorDivMessage = (this.isEnglish) ? 'Email exist for another user' : 'البريد الإلكترونى موجود لشخص آخر';
          this.emailErrorDiv = true;
          this.clicked = false;
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }

        if (data.data.ErrorCode !== 3) {
          this.openPpUp = false;
          this.clicked = false;
          this.emailErrorDivMessage = '';
          this.emailErrorDiv = false;
          this.userEmail = '';
        }
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });

    }
    //phone updated only
    else if (this.userModel.email === this.userEmail&&this.userModel.phoneNumber !== this.userPhone){
      this.userEmail="";
      this._adminPolicyService.UpdateUserEmail(this.userEmail, this.userModel.id,this.userPhone).subscribe(data => {
        if (data.data.ErrorCode === 1) {
          this._toastrService.success(data.data.ErrorDescription);
          this.userModel.phoneNumber = this.userPhone;
        } else if (data.data.ErrorCode === 3) {
          this.emailErrorDivMessage = (this.isEnglish) ? 'PhoneNumber exist for another user' : 'رقم الهاتف موجود لشخص آخر';
          this.emailErrorDiv = true;
          this.clicked = false;
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }

        if (data.data.ErrorCode !== 3) {
          this.openPpUp = false;
          this.clicked = false;
          this.emailErrorDivMessage = '';
          this.emailErrorDiv = false;
          this.userEmail = '';
          this.userPhone = '';
        }
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }
    else {
      this.openPpUp = false;
      this.clicked = false;
      this.emailErrorDivMessage = '';
      this.emailErrorDiv = false;
      this.userEmail = '';
      this.userPhone = '';
    }
  }

  manageUserMobileVerification() {
    const model = new YakeenMobileVerificationModel();
    model.userId = this.userModel.id;
    model.email = this.userModel.email;
    model.setYakeenmobileVerification = false;
    this._adminPolicyService.manageMobileVerification(model).subscribe((data: CommonResponse<boolean>) => {
        if (data.data) {
          this.userModel.isPhoneVerifiedByYakeen = false;
          var errorMessageEn = "User has been updated successsfully";
          var errorMessageAr = "تم التحديث بنجاح";
          this._toastrService.success(this.isEnglish ? errorMessageEn : errorMessageAr);
        } else {
          var errorMessageEn = "Can't update this user";
          var errorMessageAr = "لم يتم التحديث";
          this._toastrService.error(this.isEnglish ? errorMessageEn : errorMessageAr);
        }
      },
        (error: any) => {
          this.firstTime = true;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error("Error happend, please try agina");
            });
          }
        }
      );
  }

}
