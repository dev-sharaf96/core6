import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse, LocalizationService } from '../core';
import { OccupationService } from '../core/services/occupation.service';
import { OccupationFilter } from './occupation-filter';
import { OccupationListing } from './occupation-listing';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css']
})
export class OccupationComponent implements OnInit {
  occupationFilter: OccupationFilter = new OccupationFilter();
  occupations: OccupationListing[];
  newOccupation = new OccupationListing();
  occupationsCount;
  isEnglish: boolean;
  isEdit: boolean;
  loading: boolean;
  eventHolder;
  emptyStringValue = 'ــــــــــــــــــ';
  clicked = false;
  openPpUp = false;
  actionName = 'add';
  codeErrorDiv = false;
  codeErrorDivMessage = '';

  constructor(
    private _occupationService: OccupationService,
    private _localizationService: LocalizationService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.initializeOccupatios();
  }

  filterClick(e) {
    e.reset();
  }

  requestsLazyLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    this._occupationService.getOccupationsWithFilter(this.occupationFilter.code,
      this.occupationFilter.description, pageIndex, pageInSize)
    .subscribe((data: CommonResponse<OccupationListing[]>) => {
          if (data.data.length > 0) {
            this.occupations = data.data;
          } else {
            this.occupations = [];
          }
          this.occupationsCount = data.totalCount;
          this.loading = false;
        }, (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        });
  }

  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      this._occupationService.getOccupationsAsExcel(this.occupationFilter.code, this.occupationFilter.description).subscribe((data) => {
        if (data.data) {
          FileSaver.saveAs('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data.data,
           'requests-Log.xlsx');
        }
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      });
    }
  }

  showOccupationPopup(action, occupationId?: number) {
    this.codeErrorDiv = false;
    this.codeErrorDivMessage = '';
    this.actionName = action;
    if (action === 'edit') {
      this.loading = true;
      this.isEdit = true;
      this._occupationService.getOccupationDetailsById(occupationId).subscribe(data => {
        if (data.data) {
          this.newOccupation = data.data;
          this.openPpUp = true;
        } else {
          this.openPpUp = false;
        }
      });
    } else {
      this.isEdit = false;
      this.openPpUp = true;
    }
    this.loading = false;
  }

  closeOccupationModal() {
    this.openPpUp = false;
    this.clicked = false;
  }

  initializeOccupatios() {
    this.loading = true;
    this.occupations = [];
    this.occupationsCount = 0;
    this._occupationService.getOccupationsWithFilter('', '', 0, 10).subscribe((newdata: CommonResponse<OccupationListing[]>) => {
      if (newdata.data.length > 0) {
        this.occupations = newdata.data;
      } else {
        this.occupations = [];
      }
      this.occupationsCount = newdata.totalCount;
      this.loading = false;
    });
  }

  AddOrUpdateOccupation() {
    this.clicked = true;

    if (this.actionName === 'add') {
      this._occupationService.checkOccupationCode(this.newOccupation).subscribe(checkdata => {
        if (checkdata.data === true) {
          this.codeErrorDivMessage = (this.isEnglish) ? 'Code exist for another occupation' : 'هذا الرمز موجود لوظيفة أخرى';
          this.codeErrorDiv = true;
          this.clicked = false;
        } else {
          this._occupationService.addOrupdateOccupation(this.newOccupation, `action=${this.actionName}`).subscribe(data => {
            if (data.data.ErrorCode === 1) {
              this.initializeOccupatios();
              this._toastrService.success(data.data.ErrorDescription);
            } else {
              this._toastrService.error(data.data.ErrorDescription);
            }
            this.openPpUp = false;
            this.clicked = false;
            this.codeErrorDiv = false;
            this.codeErrorDivMessage = '';
            this.newOccupation = new OccupationListing();
          }, (error: any) => {
            if (error.errors) {
              error.errors.forEach(item => {
                this._toastrService.error(item.description, item.code);
              });
            }
          });
        }
      });
    } else {
      this._occupationService.addOrupdateOccupation(this.newOccupation, `action=${this.actionName}`).subscribe(data => {
        if (data.data.ErrorCode === 1) {
          this.initializeOccupatios();
          this._toastrService.success(data.data.ErrorDescription);
        } else {
          this._toastrService.error(data.data.ErrorDescription);
        }
        this.openPpUp = false;
        this.clicked = false;
        this.codeErrorDiv = false;
        this.codeErrorDivMessage = '';
        this.newOccupation = new OccupationListing();
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }
  }
}
