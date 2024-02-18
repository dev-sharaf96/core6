import { EdaatNotificationComponent } from './edaat-notification/edaat-notification.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PaymentsRoutingModule,
      SharedModule
  ],
  declarations: [
    PaymentsComponent,
    EditPaymentComponent,
    EdaatNotificationComponent
  ]
})
export class PaymentsModule { }
