import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PolicyService } from '../core/services';
import { CommonResponse, NajmStatistics, IPolicy } from '../core/models';
import { ToastrService } from 'ngx-toastr';
import { NajmResponseFilter } from './najm-filter';
import { NajmResponse } from './najm-model';
import { NajmService } from '../core/services/najm.service';

@Component({
  selector: 'app-najm',
  templateUrl: './najm.component.html',
  styleUrls: ['./najm.component.css']
})

export class NajmComponent implements OnInit {
  najmResponseFilter: NajmResponseFilter;
  najmResponses: NajmResponse[];
  najmResponse: NajmResponse = new NajmResponse();
  najmResponsesCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'policyHolderNin';
  isEnglish: boolean;
  isEdit:boolean;
  openPpUp: boolean = false;
  clicked = false;


  constructor(
    private _najmService: NajmService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.najmResponseFilter = this._najmService.najmResponseFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = true;
    this.isEdit = false;
  }
  filterClick(e) {
    e.reset();
  }
  najmResponsesLazyLoad(event) {
    this.eventHolder = event;
    this.loading = true;
    this._najmService.getNajmResponsesWithFilter(this.najmResponseFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<NajmResponse[]>) => {
          this.najmResponses = data.data;
          this.najmResponsesCount = data.totalCount;
          this.firstTime = false;
          this.loading = false;
        },
        (error: any) => {
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

  deleteNajmResponse(id) {
    if(confirm("Are you sure to delete ?")){
    this._najmService.deleteNajmResponse(id).subscribe((data: CommonResponse<boolean>) => {
      this.najmResponsesLazyLoad(this.eventHolder);
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }
}

  EditNajmResponse(_id: any) {
    this.najmResponse = this.najmResponses.filter(a => a.id == _id)[0];
    console.log('EditNajmResponse --> this.najmResponse');
    console.log(this.najmResponse);

    this.openPpUp = true;
  }

  closeEmailModal(){
    this.openPpUp = false;
    this.clicked = false;
  }

  UpdateNajmResponse() {
    console.log('UpdateNajmResponse --> this.najmResponse');
    console.log(this.najmResponse);
    this.clicked = true;
    this._najmService.UpdateNajmResponse(this.najmResponse).subscribe(data => {
      if (data.data.errorCode === 1) {
        this._toastrService.success(data.data.errorDescription);
        this.closeEmailModal();
        this.najmResponsesLazyLoad(this.eventHolder);
      } else {
        this._toastrService.error(data.data.errorDescription);
      }
      this.clicked = false;
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.description, item.code);
        });
      }
      this.clicked = false;
    });
  }
}
