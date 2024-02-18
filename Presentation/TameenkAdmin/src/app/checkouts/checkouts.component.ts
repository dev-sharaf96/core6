import { Component, OnInit } from '@angular/core';

import { CheckoutsFilter } from './checkouts-filter';
import { CheckoutsModel } from './checkouts-model';
import { CheckoutsService } from '../core/services/checkouts.service';
import { CommonResponse } from '../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.css']
})
export class CheckoutsComponent implements OnInit {
  checkoutsFilter: CheckoutsFilter;
  checkoutsList: CheckoutsModel[];
  checkout: CheckoutsModel;
  checkoutsListCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'ReferenceId';
  isEnglish: boolean;
  isEdit:boolean;
  today = new Date();
  isSearch = false;
  constructor(
    private _checkoutsService: CheckoutsService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.checkoutsFilter = this._checkoutsService.checkoutsFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = true;
    this.isEdit = false;
  }
  
  filterClick(e) {
    this.isSearch = true;
    e.reset();
  }

  checkoutsLazyLoad(event) {
    
    this._checkoutsService.getCheckoutsWithFilter(this.checkoutsFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<CheckoutsModel[]>) => {
          this.checkoutsList = data.data;
          this.checkoutsListCount = data.totalCount;
          this.firstTime = false;
          this.loading = false;
         this.isSearch = false;
        },
        (error: any) => {
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


}
