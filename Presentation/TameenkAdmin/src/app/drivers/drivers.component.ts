import { CommonResponse, LocalizationService } from  'src/app/core';
import { Component, OnInit } from '@angular/core';

import { AddressService } from '../core/services/address.service';
import { Driver } from './drivers-model';
import { DriverService } from '../core/services/driver.service';
import { DriversFilter } from './drivers-filter';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  driversFilter: DriversFilter;
  drivers: Driver[];
  driver: Driver;
  driversCount;
  loading: boolean;
  firstTime: boolean;
  emptyStringValue = 'ــــــــــــــــــ';
  eventHolder;
  defaultSortField = 'nin';
  isEnglish: boolean;
  isEdit:boolean;
  today = new Date();
  isSearch = false;

  constructor(
    private _driverService: DriverService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit() {
    this.driversFilter = this._driverService.driversFilter;
    this.loading = true;
    this.firstTime = true;
    this.isEnglish = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ? true : false;
    this.isEdit = false;
  }

  filterClick(e) {
    this.isSearch = true;
    e.reset();
  }
  driversLazyLoad(event) {
    this._driverService.getDriversWithFilter(this.driversFilter,
      `pageIndex=${event.first / event.rows}&pageSize=${event.rows}&sortField=${
      event.sortField ? event.sortField : this.defaultSortField}&sortOrder=${event.sortOrder === 1 ? true : false}`)
      .subscribe((data: CommonResponse<Driver[]>) => {
          this.drivers = data.data;
          this.driversCount = data.totalCount;
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

GetdriversWithNIN(nin) {
    this.isSearch = true;
    this._driverService.getDriversWithNIN(nin)
      .subscribe((data: CommonResponse<Driver[]>) => {
     
          this.drivers = data.data;
          this.driversCount = data.totalCount;
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

  onEdit(driver){

    this.driver = driver;
    this.isEdit = true;
  }

  deleteDriver(nin: string) {
    if(confirm("Are you sure to delete ?")) {
      this.loading = true;
      this.isSearch = true;
      this._driverService.deleteDriversWithNIN(nin, this.isEnglish ? 'en' : 'ar').subscribe((data: CommonResponse<boolean>) => {
        this._toastrService.success(this.isEnglish ? 'Deleted successfully' : 'تم الحذف بنجاح');
        this.loading = false;
        this.isSearch = false;
        this.driversFilter = this._driverService.driversFilter;
        this.drivers = [];
        this.driversCount = 0;
      }, (error: any) => {
        this.firstTime = false;
        this.loading = false;
        this.isSearch = false;
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      })
    }
  }

}
