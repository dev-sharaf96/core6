import { CommonResponse, InsuranceCompanyService, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { VehiclesFilter } from '../vehicles-filter';

@Component({
  selector: 'app-vehicle-limit',
  templateUrl: './vehicle-limit.component.html',
  styleUrls: ['./vehicle-limit.component.css']
})
export class VehicleLimitComponent implements OnInit { 
  vehiclesFilter: VehiclesFilter;
  firstTime: boolean;
  emptyStringValue = 'ــــــ';
  eventHolder;
  defaultSortField = 'Id';
  isEnglish: boolean;
  isEdit: boolean;
  today = new Date();
  constructor(
    private _insuranceCompanyService: InsuranceCompanyService,
    private _toastrService: ToastrService,
    private _translate: TranslateService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.vehiclesFilter = new VehiclesFilter();
    this.firstTime = true;
    this.isEnglish =
      this._localizationService.getCurrentLanguage().twoLetterIsoCode == 'en'
        ? true
        : false;
  }

  deleteVehicleRequests() {
    if(confirm("Are you sure ?")){
    this._insuranceCompanyService.deleteVehicleRequests(this.vehiclesFilter.sequenceNumber)
      .subscribe((data: CommonResponse<boolean>) => {
        if (data.data == true) {
          this._translate.get('common.deleteDone').subscribe(res => {
            this.firstTime = true;
            this._toastrService.success(res);
          });
        }
        else {
          this._translate.get('common.deleteFailed').subscribe(res => {
            this._toastrService.error(res);
          });
        }


      },
        (error: any) => {
          this.firstTime = true;
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
