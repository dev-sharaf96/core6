import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressEditComponent } from './edit/address-edit.component';

const routes: Routes = [

  {
    path: 'edit/:Id',
    component: AddressEditComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
