import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import  * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, LocalizationService } from 'src/app/core';
import { BlockUsersService } from 'src/app/core/services/block-users.service';
import { AddBlockedUsersModel } from './Models/AddBlockedUsersModel';
import { AdministrationResponseOutput, AdministrationResponseOutputList, dataList } from './Models/AdministrationResponseOutput';
import { BlockedUsers } from './Models/BlockedUsers';
import { BlockedUsersFilter } from './Models/BlockedUsersFilter';

@Component({
  selector: 'app-block-users',
  templateUrl: './block-users.component.html',
  styleUrls: ['./block-users.component.css']
})
export class BlockUsersComponent implements OnInit {
  blockedUsersFilter: BlockedUsersFilter;
  responsedata=null;
  blockedUsers:any;
  blockedUser: BlockedUsers;
  usersCount;
  addBlockedUser = new AddBlockedUsersModel();
  eventHolder;
  submitted = false;
  firstTime: boolean;
  loading: boolean;
  isEnglish: boolean;
  today = new Date();
  isSearch = false;
  result: any;
  success = false;
  clicked = false;
  openPopUp = false;
  request: any;
  emptyStringValue = 'ــــــ';
  ninError = false;
  ninErrorMessage = '';
  Isloading:boolean;
  reasonError = false;
  reasonErrorMessage = '';
  
  
  addBlockForm = new FormGroup({
    nationalId: new FormControl('', [Validators.required]),
    blockReason: new FormControl('', [Validators.required])
  });

  constructor(
    private _blockUsersService: BlockUsersService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private _router: Router,
    private _translate: TranslateService
    )
     { }

    ngOnInit() {
      this.Isloading=false;
      this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
      this.firstTime = true;
      this.blockedUsersFilter = new BlockedUsersFilter();
      this.blockedUsersFilter.lang = this.isEnglish? "en" : "ar";
      this.InitializeUsersList();
   }

  filterClick(e) {
    this.Isloading=true;
    this.loading = true;
    console.log(this.blockedUsersFilter)
    e.reset();
  }

  requestsLazyLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    this.blockedUsersFilter.pageIndex = 1;
    this.blockedUsersFilter.pageSize = 10;
    this._blockUsersService.getBlockedUsersWithFilter(this.blockedUsersFilter)
    .subscribe((data: any) => {
          if (1 > 0) {
            this.blockedUsers = data.data.data;
            this.usersCount = data.data.totalCount;
          } else {
            this.blockedUsers = [];
          }
          this.Isloading=false;
          this.usersCount = data.data.totalCount;
          this.loading = false;
        }, (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error("Error in loading blocked users data");
            });
          }
        });
  }



  InitializeUsersList() {
    this.blockedUsers = [];
    this.usersCount = 0;
    this.blockedUsersFilter.isExport = false;
    this.blockedUsersFilter.pageIndex = 1;
    this.blockedUsersFilter.pageSize = 10;
    this._blockUsersService.getBlockedUsersWithFilter(this.blockedUsersFilter)
      .subscribe((data: CommonResponse<AdministrationResponseOutputList>) => {
        if (1 > 0) {
          this.responsedata=data.data;
          this.blockedUsers = data.data.data;
          this.usersCount = data.data.totalCount;
          } else {
            this.blockedUsers = [];
          }
          this.Isloading=false;
          this.usersCount = data.data.totalCount;
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
        },
        (error: any) => {
          this.Isloading=false;
          this.firstTime = false;
          this.loading = false;
          this.isSearch = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }


  showAddPopup() {
    this.openPopUp = true;
  }

  closeAddPopup() {
    this.openPopUp = false;
    this.clicked = false;
  }



 AddBlockUserModel()
  {
    this.clicked = true;
    this.submitted = true;
   this.addBlockedUser.lang=this.blockedUsersFilter.lang;
   this.addBlockedUser.nationalId=this.addBlockForm.controls["nationalId"].value;
   this.addBlockedUser.blockReason=this.addBlockForm.controls["blockReason"].value;
   if(this.addBlockForm.controls["blockReason"].value == null)
   { this.reasonError = true; this.reasonErrorMessage = (this.isEnglish) ? 'block reason is required' : 'سبب الحظر مطلوب';}
  if(this.checkIfNinExistInList()) {
    this.ninError = true;
   this.ninErrorMessage = (this.isEnglish) ? 'National Id already exists' : 'رقم الهوية هذا موجود بالفعل';
   return ;
  }

  this._blockUsersService.postBlockedUser(this.addBlockedUser).subscribe((data: any) => {
    this._router.navigate(['/admin/blockedUsers']);
    console.log(data);
    if (data.data.ErrorCode == 1) {
      this.request = data.data;
      this.success = true;
      this.addBlockForm.reset();
      this.InitializeUsersList();
    }
    else {
      this._toastrService.error(data.data.ErrorDescription);
    }
    this.openPopUp = false;
    this.clicked = false;
  }, (error: any) => {
    if (error.errors) {
      error.errors.forEach(item => {
        this._toastrService.error("cannot add new user");
      });
    }
  });

  }

checkIfNinExistInList() {
    const nin = this.blockedUsers.filter(a => a.NationalId == this.addBlockForm.controls["nationalId"].value);

    return (nin && nin.length > 0);
  }


  DeleteUser(Id) {
    if(confirm('Are You Sure ?')) {
      this.loading = true;
      this._blockUsersService.deleteBlockedUser(Id,this.blockedUsersFilter.lang).subscribe((data: CommonResponse<any>) => {
        if (data.data.ErrorCode == 1) {
          this._translate.get('common.deleteDone').subscribe(res => {
            this._toastrService.success("Deleted Successully");
            this.InitializeUsersList();
          });

        } else {
          this._translate.get('common.deleteFailed').subscribe(res => {
            this._toastrService.error(res);
          });
        }

        this.loading = false;
      }, (error: any) => {
        if (error.errors) {
          this.loading = false;
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
    }
  }


  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      this.blockedUsersFilter.isExport = true;
      this._blockUsersService.getBlockedUsersWithFilter(this.blockedUsersFilter).subscribe((data) => {
        if (data.data) {
          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
           'blockedUsers.xlsx');
        }
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error("Error in exporting data");
          });
        }
      });
    }
    this.blockedUsersFilter.isExport=false;
  }


  // EditBlockedQuotation()
//   {
//     debugger;
//     this.submitted = true;
//     if (this.editBlockForm.invalid) {
//         return;
//     }
//     if(this.submitted)
//     {
//       this.editBlockedUser = new EditBlockedUserModel()
//       {
//         nationalId: this.editBlockForm.controls["nationalId"].value
//       }

//       this._blockUsersService.updateBlockedUser(this.editBlockedUser).subscribe((data: CommonResponse<AdministrationResponseOutput>)=> {

//         console.log(data);
//         if (data.data.ErrorCode == 1) {
//           this.result = data.data;
//           this.success = true;
//           this._toastrService.success("Blocked user is edited ")
//         }
//         else {
//           this._toastrService.error(data.data.ErrorDescription);
//         }

//       }, (error: any) => {
//         if (error.errors) {
//           error.errors.forEach(item => {
//             this._toastrService.error("Blocked user not edited");
//           });
//         }
//       });
//     }


//   }




}


