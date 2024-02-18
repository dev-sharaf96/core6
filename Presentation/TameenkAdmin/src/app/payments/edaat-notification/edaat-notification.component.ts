import { PaymentsService } from 'src/app/core/services/payments.service';
import { CommonResponse, LocalizationService } from 'src/app/core';
import { EdaatNotificationOutput } from './edaat-notification-model';
import { EdaatFilter } from './edaat-notification-filter';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edaat-notification',
  templateUrl: './edaat-notification.component.html',
  styleUrls: ['./edaat-notification.component.css']
})

export class EdaatNotificationComponent implements OnInit {
  edaatFilter: EdaatFilter;
  edaatResult: EdaatNotificationOutput[];
  count;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'ReferenceId';
  isEnglish: boolean;

  constructor(
    private _edaatService: PaymentsService,
    private _toastrService: ToastrService,
    private _translate: TranslateService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.edaatFilter = this._edaatService.edaatFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
  }


  filterClick(e) {
    e.reset();
  }

  paymentsLazyLoad(event) {
    if (event.sortField === 'paymentDate' || event.sortField === 'paymentDate') {
      this.edaatResult = this.edaatResult.sort((a, b) => {
        if (event.sortOrder === 1) {
          return a[event.sortField].localeCompare(b[event.sortField]);
        } else {
          return b[event.sortField].localeCompare(a[event.sortField]);
        }
      });
      return;
    }
    this.eventHolder = event;
    this.loading = true;
    this._edaatService.getEdaatNotificationWithFilter(this.edaatFilter,`pageIndex=${event.first / event.rows}&pageSize=${event.rows}`)
      .subscribe((data: CommonResponse<EdaatNotificationOutput[]>) => {
        this.edaatResult = data.data;
        this.count = data.totalCount;
        this.firstTime = false;
        this.loading = false;
      }, (error: any) => {
        this.firstTime = false;
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
