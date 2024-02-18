import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, LocalizationService } from '../../core';
import { AutoleaseService } from '../../core/services/autolease.service';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { AutoleaseUserFilter } from './models/autolease-user-filter';
import { AutoleaseUserModel } from './models/autolease-user-model';

@Component({
  selector: 'app-autolease-users',
  templateUrl: './autolease-users.component.html',
  styleUrls: ['./autolease-users.component.css']
})
export class AutoleaseUsersComponent implements OnInit {
  usersFilter = new AutoleaseUserFilter();
  users: AutoleaseUserModel[];
  usersCount;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  isEdit: boolean;
  loading: boolean;
  clicked = false;
  today = new Date();

  constructor(private _localizationService: LocalizationService,
    private _autoLeaseService: AutoleaseService,
    private _toastrService: ToastrService,
     private _router: Router) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.loading = false;
  }

  filterClick(e) {
    e.reset();
  }

  requestsLazyLoad(event) {
    this.clicked = true;
    this.loading = true;
    this.eventHolder = event;
    this._autoLeaseService.getAllWithFilter(this.usersFilter, `pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
    .subscribe((data: CommonResponse<AutoleaseUserModel[]>) => {
          if (data.data.length > 0) {
            const uesrsData = data.data;
            uesrsData.forEach(user => {
              if (user.isLock === true && new Date(user.lockoutEndDateUtc) > this.today) {
                user.isLock = true;
              } else {
                user.isLock = false;
              }
            });
            this.users = uesrsData;
          } else {
            this.users = [];
          }

          this.usersCount = data.totalCount;
          this.loading = false;
          this.clicked = false;
        }, (error: any) => {
          this.loading = false;
          this.clicked = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        });
  }

  EditUser(userID) {
    console.log('userID ', userID);
    this._router.navigate(['/usersAutolease/user'], { queryParams: { userId: userID } });
  }

  manageUserLock(userId, toLock) {
    if (confirm('Are you sure ?')) {
      this.clicked = true;
      this.loading = true;
      let lockedUser = new AutoleaseUserModel();
      lockedUser.id = userId;
      lockedUser.isLock = toLock;
      lockedUser.lang = this.isEnglish ? 'en' : 'ar';
      this._autoLeaseService.lockUser(lockedUser)
        .subscribe((data: CommonResponse<GeneratePolicyRes>) => {
          console.log('manageUserLock ', data);
          if (data.data.ErrorCode !== 1) {
            this._toastrService.error(data.data.ErrorDescription);
          }

          this.users.filter(a => a.id === userId).map(a => a.isLock = toLock);
          this.clicked = false;
          this.loading = false;
        },
          (error: any) => {
            this.clicked = false;
            this.loading = false;
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.code, item.description);
              });
            }
          }
        );
    }
  }

}
