import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, PromotionService } from '../../core';
import { PromotionProgramNationaidsModel } from './promotion-program-nationaids-model';

@Component({
  selector: 'app-promotion-program-nationalids',
  templateUrl: './promotion-program-nationalids.component.html',
  styleUrls: ['./promotion-program-nationalids.component.css']
})
export class PromotionProgramNationalidsComponent implements OnInit {
  load: boolean;
  firstTime: boolean;
  eventHolder;
  promotionProgramId;
  promotionProgramNationalIds: PromotionProgramNationaidsModel[];

  constructor(private _activatedRoute: ActivatedRoute,
    private _promotionService: PromotionService,
    private _translate: TranslateService,
    private _toastrService: ToastrService) { }

  ngOnInit() {
    this.load = true;
    this.firstTime = true;
    this.promotionProgramId = this._activatedRoute.snapshot.paramMap.get('id');
    //this.getPromotionNationalIds();
  }

  //requestsLazyLoad(event) {
  //  this.eventHolder = event;
  //  this.load = true;
  //  this._requestsService.getAllServicesWithFilter(this.requestsFilter,
  //      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
  //      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`
  //      ).subscribe((data: CommonResponse<RequestModel[]>) => {
  //        if (data.data.length > 0) {
  //          this.requests = data.data;
  //        } else {
  //          this.requests = [];
  //        }
  //        this.requestsCount = data.totalCount;
  //        this.firstTime = false;
  //        this.load = false;
  //      }, (error: any) => {
  //        this.firstTime = false;
  //        this.load = false;
  //        if (error.errors) {
  //          error.errors.forEach(item => {
  //            this._toastrService.error(item.code, item.description);
  //          });
  //        }
  //      });
  //}

  getPromotionNationalIds(event) {
    this.eventHolder = event;
    this.load = true;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    this._promotionService.getAllPromotionNationalIdsByProgramId(this.promotionProgramId, pageIndex, pageInSize).subscribe(
      (result: CommonResponse<PromotionProgramNationaidsModel[]>) => {
        this.promotionProgramNationalIds = result.data;
        this.load = false;
        this.firstTime = false;
      } ,
     (error) => { this.load = false; this.firstTime = false; });
  }

  Delete(id) {
    if (confirm("Are you sure ?")){
      this._promotionService.deleteNinFromPromotinProgram(id)
        .subscribe((data: CommonResponse<boolean>) => {
          if (data.data === true) {
            this._translate.get('common.deleteDone').subscribe(res => {
              this._toastrService.success(res);
            });
          } else {
            this._translate.get('common.deleteFailed').subscribe(res => {
              this._toastrService.error(res);
            });
          }
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

}
