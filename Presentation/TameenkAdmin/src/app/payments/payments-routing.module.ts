import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { EdaatNotificationComponent } from './edaat-notification/edaat-notification.component';

const routes: Routes = [
{ path: '', component: PaymentsComponent },
{ path: 'edit/:ref', component: EditPaymentComponent },
{ path: 'edaat-notification', component: EdaatNotificationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
