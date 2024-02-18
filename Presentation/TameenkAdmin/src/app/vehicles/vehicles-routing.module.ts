import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { OwnershipComponent } from '../ownership/ownership.component';
import { VehicleEditComponent } from './edit/vehicle-edit.component';
import { VehiclesComponent } from './vehicles.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:id',
    component: VehicleEditComponent,
    pathMatch: 'full'
  },
  {
    path: 'ownerShip',
    component: OwnershipComponent,
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
