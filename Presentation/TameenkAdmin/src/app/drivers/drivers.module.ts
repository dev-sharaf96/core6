import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversRoutingModule } from './drivers-routing.module';
import { DriversComponent } from './drivers.component';
import { SharedModule } from '../shared/shared.module';
import { DriverService } from '../core/services/driver.service';
import { DriverEditComponent } from './edit/driver-edit.component';
import { AddressEditComponent } from './address/edit/address-edit.component';
import { AddressAddComponent } from './address/add/address-add.component';

@NgModule({
  imports: [
    CommonModule,
    DriversRoutingModule,
    SharedModule
  ],
  declarations: [
    DriversComponent,
    DriverEditComponent,
    AddressEditComponent,
    AddressAddComponent
  ],
  providers : [
    DriverService
  ]
})
export class DriversModule { }
