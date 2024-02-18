import { Component, OnInit } from '@angular/core';
import { YakeenCityCenterFilter } from '../yakeen-city-center-filter';
import { YakeenCityCenterListing } from '../yakeen-city-center-listing';
import { YakeenCityCenterService } from '../../core/services/yakeen-city-center.service';
import { ToastrService } from 'ngx-toastr';
import { LocalizationService, CommonResponse } from '../../core';
import * as FileSaver from 'file-saver';
import { YakeenCityCenter } from '../yakeen-city-center';
import { data } from 'jquery';

@Component({
  selector: 'app-yakeen-city-center-listing',
  templateUrl: './yakeen-city-center-listing.component.html',
  styleUrls: ['./yakeen-city-center-listing.component.css']
})
export class YakeenCityCenterListingComponent implements OnInit {
  citiesFilter: YakeenCityCenterFilter = new YakeenCityCenterFilter();
  cities: YakeenCityCenterListing[];
  citiesCount;
  loading: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  isEnglish: boolean;
  newCity = new YakeenCityCenter();
  openPpUp = false;
  clicked = false;

  constructor(
    private _yakeenCityCenterService: YakeenCityCenterService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.loading = true;
    this.InitializePage();
  }

  filterClick(e) {
    e.reset();
  }

  requestsLazyLoad(event) {
    this.loading = true;
    this.eventHolder = event;
    const pageIndex = (event.first / event.rows);
    const pageInSize = (event.rows);
    this._yakeenCityCenterService.getAllWithFilter(this.citiesFilter.cityId, this.citiesFilter.cityName, this.citiesFilter.zipCode,
                                                   this.citiesFilter.elmCode, pageIndex, pageInSize)
    .subscribe((data: CommonResponse<YakeenCityCenterListing[]>) => {
          if (data.data.length > 0) {
            this.cities = data.data;
          } else {
            this.cities = [];
          }
          this.citiesCount = data.totalCount;
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

  InitializePage() {
    this.cities = [];
    this.citiesCount = 0;
    this._yakeenCityCenterService.getAllWithFilter(0, '', 0, 0, 0, 10).subscribe((newdata: CommonResponse<YakeenCityCenterListing[]>) => {
      if (newdata.data.length > 0) {
        this.cities = newdata.data;
        } else {
          this.cities = [];
        }
        this.citiesCount = newdata.totalCount;
        this.loading = false;
      });
  }

  exportCsv() {
    if (!this.loading) {
      this.loading = true;
      this._yakeenCityCenterService.getCitiesExcel(this.citiesFilter.cityId, this.citiesFilter.cityName, this.citiesFilter.zipCode,
                                                   this.citiesFilter.elmCode).subscribe((data) => {
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

  AddYakeenCityCenterModel() {
    this.clicked = true;
    this._yakeenCityCenterService.addNewYakeenCityCenter(this.newCity).subscribe(data => {
      if (data.data.ErrorCode === 1) {
        this.InitializePage();
        this._toastrService.success(data.data.ErrorDescription);
      } else {
        this._toastrService.error(data.data.ErrorDescription);
      }
      this.clicked = false;
      this.openPpUp = false;
      this.newCity = new YakeenCityCenter();
    }, (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.description, item.code);
        });
      }
    });
  }

}
