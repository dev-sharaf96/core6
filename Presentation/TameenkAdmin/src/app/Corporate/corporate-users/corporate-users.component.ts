import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../../core/services';
import { CorporateUserFilter } from './models/corporate-user-filter';
import { CorporateUserModel } from './models/corporate-user-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CorporateService } from '../../core/services/corporate.service';
import { CommonResponse } from '../../core/models';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';


@Component({
  selector: 'app-corporate-users',
  templateUrl: './corporate-users.component.html',
  styleUrls: ['./corporate-users.component.css']
})
export class CorporateUsersComponent implements OnInit {
  usersFilter = new CorporateUserFilter();
  users: CorporateUserModel[];
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
    private _corporateService: CorporateService,
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
    this._corporateService.getAllCorporateUsersWithFilter(this.usersFilter, `pageIndex=${(event.first / event.rows) + 1}&pageSize=${event.rows}`)
    .subscribe((data: CommonResponse<CorporateUserModel[]>) => {
          if (data.data.length > 0) {
            const uesrsData = data.data;
            uesrsData.forEach(user => {
              if (user.isActive === true) {
                user.isActive = true;
              } else {
                user.isActive = false;
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
    this._router.navigate(['/corporate/user'], { queryParams: { userId: userID } });
  }

  manageUserActive(userId, active) {
    if (confirm('Are you sure ?')) {
      this.clicked = true;
      this.loading = true;
      let lockedUser = new CorporateUserModel();
      lockedUser.userId = userId;
      lockedUser.lang = this.isEnglish ? 'en' : 'ar';
      this._corporateService.manageUserLock(lockedUser)
        .subscribe((data: CommonResponse<GeneratePolicyRes>) => {
          if (data.data.ErrorCode !== 1) {
            this.clicked = false;
            this.loading = false;
            this._toastrService.error(data.data.ErrorDescription);
          } else {
            this.users.filter(a => a.userId === userId).map(a => a.isActive = !active);
            this.clicked = false;
            this.loading = false;
          }
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
