import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriversComponent } from './drivers.component';
import { DriverEditComponent } from './edit/driver-edit.component';
import { AddressEditComponent } from './address/edit/address-edit.component';
import { AddressAddComponent } from './address/add/address-add.component';

const routes: Routes = [
  {
    path: '',
    component: DriversComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:driverId',
    component: DriverEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'address/edit/:Id',
    component: AddressEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'address/add/:driverId',
    component: AddressAddComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
