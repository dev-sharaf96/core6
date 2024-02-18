import { ActivatedRoute, Router } from '@angular/router';
import {
  Address,
  AddressService,
  CommonResponse,
  IIdNamePairModel,
  InsuranceCompanyService,
  VehicleService
} from 'src/app/core';
import { Component, Input, OnInit } from '@angular/core';

import { Driver } from '../drivers-model';
import { DriverService } from 'src/app/core/services/driver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css']
})
  export class DriverEditComponent implements OnInit {
  @Input() Data :Driver;
  driver: Driver = new Driver();
  addresses: Address[];
  driverCities: IIdNamePairModel[];
  driverWorkCities: IIdNamePairModel[];
  city = new IIdNamePairModel();
  workCity = new IIdNamePairModel();
  isEdit:boolean;
  modelyears: number[] = [];
  eventHolder;
  addressesCount;
  loading: boolean;
   _driverId;
  isSearch = false;

  constructor(
    private _driverService: DriverService,
    private _router: Router,
    private route: ActivatedRoute,
    private _addressService: AddressService, private _toastrService: ToastrService) { }
    
  ngOnInit() {
    this.loading = true;

    const driverId = this.route.snapshot.paramMap.get('driverId');
    this._driverId = driverId;

    // this._driverService.getDriverWithAddresses(driverId).subscribe(driver=> {
    //   this.driver = driver.data.driver;
    //   this.addresses = driver.data.address;
  
    // });

    this._driverService.getDriverDetails(driverId).subscribe(driver=> {
      this.driver = driver.data;
    });


    // this._addressService.getAllCitiyIdNamePair().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
    //   this.driverCities = [];
    //   this.driverWorkCities = [];
    //   this.driverCities = data.data;
    //   this.driverWorkCities = data.data;
    // },
    //   (error: any) => {
    //     if (error.errors) {
    //       error.errors.forEach(item => {
    //         this._toastrService.error(item.code, item.description);
    //       });
    //     }
    //   });
      
       this.isEdit = true;
      
  }

  onSubmit(form) {
  
    if (form.valid) {
      let city:any;

     city = this.driver.cityId;
     this.driver.cityId = city.id;

     city = this.driver.workCityId;
     this.driver.workCityId = city.id;

      this._driverService.UpdateDriver(this.driver).subscribe(data => {
        this._router.navigate(['/admin/drivers']);
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }
  }


  // getVehicleMakerModels(makerId) {
  //   this._vehicleService.getVehicleMakerModels(makerId).subscribe(data => {
  //     this.driverWorkCities = data.data;
  //     //this.model = this.driverWorkCities.find((model) => model.id === this.driver.vehicleModelCode);
  //   });
  // }
 
  // changeCityCode() {
  //   this.driver.CityId = this.city.id;
  //   this.driver.City = this.city.name;
  //   //this.getVehicleMakerModels(this.driver.vehicleMakerCode);
  // }
  // changeWorkCityCode() {
  //   this.driver.WorkCityId = this.workCity.id;
  //   this.driver.WorkCity = this.workCity.name;
  // }

  AddressLoad(event) {
  
    this.loading = true;
    const driverId = this.route.snapshot.paramMap.get('driverId');
    this.eventHolder = event;
    this._driverService.getDriverAddresses(driverId)
      .subscribe((data: CommonResponse<Address[]>) => {
          this.addresses = data.data;
          this.addressesCount = data.data.length;
          this.loading = false;
         
        },
        (error: any) => {
          this.loading = false;
          if (error.errors) {
            error.errors.forEach(item => {
              this._toastrService.error(item.code, item.description);
            });
          }
        }
      );
  }
  
  deleteDriverAddress(id) {
    if(confirm("Are you sure to delete ?")){
    this.isSearch = true;
    this._driverService.deleteDriverAddress(id).subscribe((data: CommonResponse<boolean>) => {
      this.AddressLoad(this.eventHolder);
      this.isSearch = false;
      }, (error: any) => {
        if (error.errors) {
          this.isSearch = false;
          error.errors.forEach(item => {
            this._toastrService.error(item.code, item.description);
          });
        }
      }
    );
  }
}
}
