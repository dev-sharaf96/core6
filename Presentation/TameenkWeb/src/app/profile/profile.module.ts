import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InformationComponent } from './information/information.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { QuotationsComponent } from './statistics/quotations/quotations.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchasesLogComponent } from './purchases-log/purchases-log.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ProductsComponent } from './products/products.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SummaryComponent } from './statistics/summary/summary.component';
import { PoliciesComponent } from './products/policies/policies.component';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgSelectModule
  ],
  declarations: [
    ProfileComponent,
    SidebarComponent,
    InformationComponent,
    StatisticsComponent,
    QuotationsComponent,
    NotificationsComponent,
    BankAccountsComponent,
    VehiclesComponent,
    PurchasesLogComponent,
    AddressesComponent,
    ProductsComponent,
    EditProductComponent,
    SummaryComponent,
    PoliciesComponent]
})
export class ProfileModule { }
