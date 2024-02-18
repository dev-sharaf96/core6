import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressRoutingModule } from './address-routing.module';
import { AddressEditComponent } from './edit/address-edit.component';
import { DriverService } from '../core/services/driver.service';


@NgModule({
  declarations: [AddressEditComponent],
  imports: [
    CommonModule,
    AddressRoutingModule
  ],
  providers : [
    DriverService
  ]
})
export class AddressModule { }
