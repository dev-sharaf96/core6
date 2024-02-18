import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from '../../../core/models';
import { LocalizationService } from '../../../core/services';
import { CorporateService } from '../../../core/services/corporate.service';
import { GeneratePolicyRes } from '../../../policies/generate/generate-policy';
import { CorporateUserFilter } from '../../corporate-users/models/corporate-user-filter';
import { CorporateUserModel } from '../../corporate-users/models/corporate-user-model';

@Component({
  selector: 'app-corporate-account-users',
  templateUrl: './corporate-account-users.component.html',
  styleUrls: ['./corporate-account-users.component.css']
})
export class CorporateAccountUsersComponent implements OnInit {
  filterModel = new CorporateUserFilter();
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
  accountId: string;

  constructor(private _localizationService: LocalizationService,
    private _corporateService: CorporateService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.loading = false;
    this.accountId = this._route.snapshot.paramMap.get('id');
    if (this.accountId) {
      this.filterModel.accountId = +this.accountId;
      this._corporateService.getAllCorporateUsersWithFilter(this.filterModel,`pageIndex=1&pageSize=10`).subscribe(data => {
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
      });
    } else {
      this.users = [];
    }
  }

  filterClick(e) {
    e.reset();
  }

  requestsLazyLoad(event) {
    this.clicked = true;
    this.loading = true;
    this.eventHolder = event;
    this._corporateService.getAllCorporateUsersWithFilter(this.filterModel, `pageIndex=${(event.first / event.rows) + 1}&pageSize=${event.rows}`)
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
