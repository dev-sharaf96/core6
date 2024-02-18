import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OwnershipComponent } from './../ownership/ownership.component';
import { SharedModule } from '../shared/shared.module';
import { VehicleEditComponent } from './edit/vehicle-edit.component';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule
  ],
  declarations: [
    VehiclesComponent,
    VehicleEditComponent,OwnershipComponent
  ]
})
export class VehiclesModule { }
