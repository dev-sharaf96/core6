import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasedRoutingModule } from './purchased-routing.module';
import { PurchasedComponent } from './purchased.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PurchasedComponent],
  imports: [
    CommonModule,
    PurchasedRoutingModule,
    SharedModule
  ]
})
export class PurchasedModule { }
