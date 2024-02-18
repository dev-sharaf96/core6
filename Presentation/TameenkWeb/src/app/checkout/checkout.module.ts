import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { ErrorComponent } from './error/error.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { ComprehensiveInfoComponent } from './additional-info/comprehensive-info/comprehensive-info.component';
import { TblInfoComponent } from './additional-info/tbl-info/tbl-info.component';
import { ProcessComponent } from './process/process.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { SummaryComponent } from './summary/summary.component';
import { UpgradeComponent } from './summary/upgrade/upgrade.component';
import { SadadComponent } from './payment-method/sadad/sadad.component';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ],
  declarations: [
    CheckoutComponent,
    ErrorComponent,
    AdditionalInfoComponent,
    ComprehensiveInfoComponent,
    TblInfoComponent,
    ProcessComponent,
    PaymentMethodComponent,
    SummaryComponent,
    UpgradeComponent,
    SadadComponent
  ]
})
export class CheckoutModule { }
