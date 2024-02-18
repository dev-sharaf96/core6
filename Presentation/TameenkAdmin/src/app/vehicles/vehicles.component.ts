import { Component, OnInit } from '@angular/core';

import {
  InsuranceCompanyService,
  LocalizationService,
  CommonResponse
} from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { VehiclesFilter } from './vehicles-filter';
import { Router } from '@angular/router';
import { Vehicle } from './vehicles-model';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehiclesFilter: VehiclesFilter;
  vehicles: Vehicle[];
  vehiclesCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'id';
  isEnglish: boolean;
  today = new Date();
  isSearch = false;
  constructor(
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.vehiclesFilter = this._insuranceCompanyService.vehiclesFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
        ? true
        : false;
  }
  deleteVehicle(id) {
    this._insuranceCompanyService.deleteVehicle(id).subscribe((data: CommonResponse<boolean>) => {
      this.vehiclesLazyLoad(this.eventHolder);
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }

  filterClick(e) {
    this.isSearch = true;
    if (this.vehiclesFilter.sequenceNumber) {
      e.reset();
    } else {
  this.isSearch = false;
      const desc = (this.isEnglish) ? 'Please Enter Sequence number or Custom number' : 'من فضلك أدخل الرقم التسلسلي / الرقم الجمركي';
      this._toastrService.error(desc);
    }
  }

  vehiclesLazyLoad(event) {
    if (
      event.sortField === 'insuredFullNameAr' ||
      event.sortField === 'insuredFullNameEn'
    ) {
      this.vehicles = this.vehicles.sort((a, b) => {
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
    this._insuranceCompanyService.getVehiclesWithFilter(this.vehiclesFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<Vehicle[]>) => {
          this.vehicles = data.data;
          this.vehiclesCount = data.totalCount;
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
