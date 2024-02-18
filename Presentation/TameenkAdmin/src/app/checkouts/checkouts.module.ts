import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutsRoutingModule } from './checkouts-routing.module';
import { CheckoutsComponent } from './checkouts.component';
import { SharedModule } from '../shared/shared.module';
import { CheckoutsService } from '../core/services/checkouts.service';
import { CheckoutsEditComponent } from './checkouts-edit/checkouts-edit.component';

@NgModule({
  declarations: [CheckoutsComponent, CheckoutsEditComponent],
  imports: [
    CommonModule,
    CheckoutsRoutingModule,
    SharedModule
  ]
  ,
  providers : [
    CheckoutsService
  ]
})
export class CheckoutsModule { }
