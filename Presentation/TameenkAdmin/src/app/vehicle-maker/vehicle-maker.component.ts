import { Component, OnInit } from '@angular/core';
import { VehicleMakerFilter } from './vehicle-maker-filter';
import { VehicleMakerModel } from './vehicle-maker-model';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService, CommonResponse, IIdNamePairModel } from '../core';
import * as FileSaver from 'file-saver';
import { VehicleMakerService } from '../core/services/vehicle-maker.service';

@Component({
  selector: 'app-vehicle-maker',
  templateUrl: './vehicle-maker.component.html',
  styleUrls: ['./vehicle-maker.component.css']
})
export class VehicleMakerComponent implements OnInit {
  makerFilter: VehicleMakerFilter = new VehicleMakerFilter();
  makers: VehicleMakerModel[];
  makersCount;
  loading: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  newMaker = new VehicleMakerModel();
  openPpUp = false;
  clicked = false;
  codeErrorDiv = false;
  codeErrorDivMessage = '';

  constructor(
    private _vehicleService: VehicleMakerService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.loading = true;
    this.InitializeMakersList();
  }

  filterClick(e) {
    e.reset();
  }

  requestsLazyLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    this._vehicleService.getVehicleMakersWithFilter(this.makerFilter.makerCode, this.makerFilter.makerDescription,
                                                    pageIndex, pageInSize)
    .subscribe((data: CommonResponse<VehicleMakerModel[]>) => {
          if (data.data.length > 0) {
            this.makers = data.data;
          } else {
            this.makers = [];
          }
          this.makersCount = data.totalCount;
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
      this._vehicleService.getVehicleMakresExcel(this.makerFilter.makerCode, this.makerFilter.makerDescription).subscribe((data) => {
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

  showMakerPopup() {
    this.openPpUp = true;
  }

  closeMakerModal() {
    this.openPpUp = false;
    this.clicked = false;
  }

  InitializeMakersList() {
    this.makers = [];
    this.makersCount = 0;
    this._vehicleService.getVehicleMakersWithFilter('', '', 0, 10).subscribe((newdata: CommonResponse<VehicleMakerModel[]>) => {
      if (newdata.data.length > 0) {
        this.makers = newdata.data;
        } else {
          this.makers = [];
        }
        this.makersCount = newdata.totalCount;
        this.loading = false;
      });
  }

  AddMakerModel() {
    this.clicked = true;
    this._vehicleService.checkMakerCode(this.newMaker).subscribe(checkdata => {
      if (checkdata.data === true) {
        this.codeErrorDivMessage = (this.isEnglish) ? 'Code exist for another maker' : 'هذا الرمز موجود لصانع آخر';
        this.codeErrorDiv = true;
        this.clicked = false;
      } else {
        this._vehicleService.addNewMaker(this.newMaker).subscribe(data => {
          if (data.data.ErrorCode === 1) {
            this.InitializeMakersList();
            this._toastrService.success(data.data.ErrorDescription);
          } else {
            this._toastrService.error(data.data.ErrorDescription);
          }
          this.openPpUp = false;
          this.clicked = false;
          this.codeErrorDivMessage = '';
          this.codeErrorDiv = false;
          this.newMaker = new VehicleMakerModel();
        }, (error: any) => {
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.description, item.code);
            });
          }
        });
      }
    });
  }

  // onBlurEvent(event) {
  //   console.log('event');
  //   console.log(event);
  //   if (event.target.value) {
  //     if (event.target.id === 'code') {
  //       this.codeErrorDiv = false;
  //     } else if (event.target.id === 'englishDescription') {
  //       this.englishDescriptionErrorDiv = false;
  //     } else if (event.target.id === 'arabicDescription') {
  //       this.arabicDescriptionErrorDiv = false;
  //     }
  //   }
  // }

}
