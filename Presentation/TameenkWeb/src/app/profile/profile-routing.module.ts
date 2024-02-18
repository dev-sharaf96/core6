import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { InformationComponent } from './information/information.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { QuotationsComponent } from './statistics/quotations/quotations.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { PurchasesLogComponent } from './purchases-log/purchases-log.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { SummaryComponent } from './statistics/summary/summary.component';
import { PoliciesComponent } from './products/policies/policies.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: InformationComponent},
      { path: 'statistics', component: StatisticsComponent, children: [
        { path: '', component: SummaryComponent},
        { path: 'quotations', component: QuotationsComponent}
      ]
    },
      { path: 'notifications', component: NotificationsComponent},
      { path: 'bankAccounts', component: BankAccountsComponent},
      { path: 'vehicles', component: VehiclesComponent},
      { path: 'purchases', component: PurchasesLogComponent},
      { path: 'addresses', component: AddressesComponent},
      { path: 'products', component: ProductsComponent, children: [
        { path: '', component: PoliciesComponent },
        { path: 'edit/:id', component: EditProductComponent }
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
