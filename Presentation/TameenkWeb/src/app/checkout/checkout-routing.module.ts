import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ErrorComponent } from './error/error.component';
import { SadadComponent } from './payment-method/sadad/sadad.component';

const routes: Routes = [
  {
    path: '', component: CheckoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'additional-info' },
      { path: 'additional-info', component: AdditionalInfoComponent },
      { path: 'payment-method', children: [
        { path: '', component: PaymentMethodComponent },
        { path: 'sadad', component: SadadComponent }
      ] },
      { path: 'error', component: ErrorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
