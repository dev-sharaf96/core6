import { AdminPolicyService, CommonResponse, LocalizationService } from 'src/app/core';
import { Component, OnInit } from '@angular/core';

import { CarInfo } from './models/CarInfo';
import { RequestFilter } from './models/filterModel';
import { ToastrService } from 'ngx-toastr';
import { VehicleMakerService } from '../core/services/vehicle-maker.service';

@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.css']
})
export class OwnershipComponent implements OnInit { 
    modelFilter: RequestFilter={
        nationalId:null,
        vehicleId:null,
      };
      carInfo: any;
      myData = new Array<any>();
      selectedRequest;
      VechInfo:CarInfo[]=[];
     responseListCount=1;
      loading: boolean;
      isShow:boolean;
      firstTime: boolean;
      emptyStringValue = 'ــــــــــــــــــ';
      eventHolder;
      defaultSortField = 'ReferenceId';
      isEnglish: boolean;
      isEdit:boolean;
      today = new Date();
      constructor(
       private _vehicleService: VehicleMakerService,
        private _toastrService: ToastrService,
        private _localizationService: LocalizationService
      ) {}
    
      ngOnInit() {
       this.myData = new Array<any>();
       // this.checkoutsFilter = this._checkoutsService.checkoutsFilter;
       this.isShow=false;
        this.loading = false;
        this.firstTime = true;
        this.isEnglish = true;
        this.isEdit = false;
      }
      
      filterClick(e) {
        this.myData = new Array<any>();
        this.loading=true;
        this.isShow=true;
        console.log(this.modelFilter)
        e.reset();
      }
    
     PolicyNotificationLazyLoad(event) {
        this._vehicleService.getVehcileOwnerShip(this.modelFilter)
          .subscribe((data: CommonResponse<any>) => {
            this.myData.push(data.data);
            console.log(this.myData);
            this.isShow=false;        
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
    
  }


