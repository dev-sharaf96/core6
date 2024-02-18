import { Component, OnInit } from '@angular/core';
import { CommonResponse, LocalizationService, ApproveMoiService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { Moi } from './moi.model';
import { MoiFilter } from './moi-filter.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-approve-moi',
  templateUrl: './approve-moi.component.html',
  styleUrls: ['./approve-moi.component.css']
})
export class ApproveMoiComponent implements OnInit {
  approveFilter: MoiFilter;
  approveRequests: Moi[];
  approveRequestsCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'Id';
  isEnglish: boolean;
  selectedRequest;
  selectedEmail;
  approveRequestsExcel = [];
  today = new Date();
  status = [
    { name: 'All', code: '1' },
    { name: 'Approved ', code: '2' },
    { name: 'Pending', code: '3' }
  ];
  constructor(
    private _approveMoiService: ApproveMoiService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.approveFilter = this._approveMoiService.approveFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;

  }
  changeStatus(id, status) {
    this.eventHolder = event;
    this.loading = true;
    this._approveMoiService.changeMoiStatus(`id=${id}&approved=${status}`)
      .subscribe((data: CommonResponse<any[]>) => {
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
      );
  }

  showImg(id: number,email:string) {
    this.loading = true;
    this._approveMoiService.getImage(`id=${id}`)
      .subscribe((data: CommonResponse<string>) => {
        this.loading = false;
        var imageBase64String = data.data;
        if(imageBase64String != ''){
          this.selectedRequest = this.getImage(imageBase64String);
          this.selectedEmail = email;
        }
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
      );
  }

  filterClick(e) {
    e.reset();
  }

getImage(base64) {
  return 'data:image/jpg;base64,' + base64;
}

delete(id,unSubscribe) {
    this.eventHolder = event;
    this.loading = true;
    this._approveMoiService.delete(`id=${id}&unSubscribe=${unSubscribe}`)
      .subscribe((data: CommonResponse<boolean>) => {
        this.loading = false;
        this.approveRequestsLazyLoad(this.eventHolder);
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
      );
  }

  approveRequestsLazyLoad(event) {
    let status: any = this.status[0];
    if (this.approveFilter.approveStatus !== null)
      status = this.approveFilter.approveStatus;
    console.log(status);
    console.log(this.approveFilter.approveStatus);
    this.eventHolder = event;
    this.loading = true;
    this._approveMoiService.getMoiRequests(`pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}&filter=${status.code}&clientEmail=${this.approveFilter.clientEmail}`)
      .subscribe((data: CommonResponse<any[]>) => {
        this.approveRequests = data.data;
        this.approveRequestsCount = data.totalCount;
        this.loading = false;
        this.firstTime = false;
      }, (error: any) => {
        this.loading = false;
        this.firstTime = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
      );
  }
}
