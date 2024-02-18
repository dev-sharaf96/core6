import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DriverService } from 'src/app/core/services/driver.service';
import {
  CommonResponse,
  InsuranceCompanyService,
  VehicleService,
  IIdNamePairModel, 
  AddressService,
  Address} from 'src/app/core';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  @Input() Data :Address;
  address: Address = new Address();

  constructor(
    private _driverService: DriverService,
    private _router: Router,
    private route: ActivatedRoute,
    private _addressService: AddressService, private _toastrService: ToastrService) { }
  

  ngOnInit() {
  }

}
