import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { Address } from 'src/app/core/models/Address.model';
import { AddressService } from 'src/app/core/services/address.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit {
  address: Address = new Address();
  driverId;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _addressService: AddressService,
    private _driverService: DriverService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.driverId = this.route.snapshot.paramMap.get('driverId');
  }

  onSubmit(form) {
   
    if (form.valid) {
      this.address.driverId = this.driverId;
      this._driverService.addDriverAddress(this.address).subscribe(data => {
        this._router.navigate(['/admin/drivers/edit/', this.address.driverId]);
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
