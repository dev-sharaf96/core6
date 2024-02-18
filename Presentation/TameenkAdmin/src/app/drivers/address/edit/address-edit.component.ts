import { ActivatedRoute, Router } from '@angular/router';
import {
  CommonResponse,
  IIdNamePairModel,
  InsuranceCompanyService,
  VehicleService
} from 'src/app/core';
import { Component, Input, OnInit } from '@angular/core';

import { Address } from 'src/app/core/models/Address.model';
import { AddressService } from 'src/app/core/services/address.service';
import { DriverService } from 'src/app/core/services/driver.service';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {
  @Input() Data :Address;
  address: Address = new Address();
  addresses: Address[];
  isEdit:boolean;
  eventHolder;
  addressesCount;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _addressService: AddressService,
    private _driverService: DriverService,

    private _toastrService: ToastrService) { }
    
  ngOnInit() {
    const Id = this.route.snapshot.paramMap.get('Id');

    this._driverService.getAddressDetails(Id).subscribe(address=> {
      this.address = address.data;
    });
    
    this.isEdit = true;
  }

  onSubmit(form) {
  
    if (form.valid) {

      this._driverService.updateDriverAddress(this.address).subscribe(data => {
        this._router.navigate(['/admin/drivers/edit/',this.address.driverId]);
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