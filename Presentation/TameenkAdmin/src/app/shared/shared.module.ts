import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyUpdateRequestStatusPipe } from './pipes/updated-status.pipe';
import { ProductsDropdownComponent } from './components/products-dropdown/products-dropdown.component';
import { InsuranceCompaniesComponent } from './components/insurance-companies/insurance-companies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityDropdownComponent } from './components/city-dropdown/city-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { NajmStatusComponent } from './components/najm-status/najm-status.component';
import { LoaderComponent } from './components/loader/loader.component';
import { VehicleMakersDropdownComponent } from './components/vehicle-makers-dropdown/vehicle-makers-dropdown.component';
import { VehicleModelsDropdownComponent } from './components/vehicle-models-dropdown/vehicle-models-dropdown.component';
import { PolicyStatusDropdownComponent } from './components/policy-status.dropdown/policy-status.dropdown.component';
import { MethodsDropdownComponent } from './components/methods-dropdown/methods-dropdown.component';
import { StatusDropdownComponent } from './components/status-dropdown/status-dropdown.component';
import { PaymentMethodDropdownComponent } from './components/payment-method-dropdown/payment-method-dropdown.component';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DataTablesModule } from 'angular-datatables';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule, InputSwitchModule, CalendarModule, ChartModule, FileUploadModule, GrowlModule } from 'primeng/primeng';
import { PromotionProgramDdlComponent } from './promotion-program-ddl/promotion-program-ddl.component';
import { CompaniesComponent } from './components/companies/companies.component';

import { MustMatchDirective } from './directives/must-match.directive';
import { CheckboxModule } from 'primeng/checkbox';
import { CompanyNameDirective } from './directives/company-name.directive';
import { ChannelsDropdownComponent } from './components/channels-dropdown/channels-dropdown.component';
import { TicketStatusDropdownComponent } from './components/ticket-status-dropdown/ticket-status-dropdown.component';
import { TicketTypeDropdownComponent } from './components/ticket-type-dropdown/ticket-type-dropdown.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    TranslateModule,
    RouterModule,
    TableModule,
    DataTablesModule,
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    CheckboxModule
  ],
  declarations: [
    PolicyUpdateRequestStatusPipe,
    ProductsDropdownComponent,
    InsuranceCompaniesComponent,
    CityDropdownComponent,
    NajmStatusComponent,
    LoaderComponent,
    VehicleMakersDropdownComponent,
    VehicleModelsDropdownComponent,
    PolicyStatusDropdownComponent,
    MethodsDropdownComponent,
    StatusDropdownComponent,
    PaymentMethodDropdownComponent,
    HeaderComponent,
    PromotionProgramDdlComponent,
    CompaniesComponent,
    MustMatchDirective,
    CompanyNameDirective,
    ChannelsDropdownComponent,
    TicketStatusDropdownComponent,
    TicketTypeDropdownComponent,
    CustomDropdownComponent
  ],
  exports: [
    PolicyUpdateRequestStatusPipe,
    ProductsDropdownComponent,
    InsuranceCompaniesComponent,
    CityDropdownComponent,
    NajmStatusComponent,
    LoaderComponent,
    VehicleMakersDropdownComponent,
    VehicleModelsDropdownComponent,
    PolicyStatusDropdownComponent,
    MethodsDropdownComponent,
    StatusDropdownComponent,
    PaymentMethodDropdownComponent,
    HeaderComponent,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    MustMatchDirective,
    CheckboxModule,
    PromotionProgramDdlComponent,
    CompaniesComponent,
    CompanyNameDirective,
    CalendarModule,
    DropdownModule,
    ChartModule,
    FileUploadModule,
    GrowlModule,
    ChannelsDropdownComponent,
    TicketStatusDropdownComponent,
    TicketTypeDropdownComponent,
    CustomDropdownComponent
  ]
})
export class SharedModule {}
