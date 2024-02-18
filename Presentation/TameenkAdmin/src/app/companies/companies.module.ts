import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { SharedModule } from '../shared/shared.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { FormEditAddComponent } from './form-edit-add/form-edit-add.component';
import { TestInsuranceCompanyComponent } from './test-insurance-company/test-insurance-company.component';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule
  ],
  declarations: [
    CompaniesComponent,
    AddComponent,
    EditComponent,
    FormEditAddComponent,
    TestInsuranceCompanyComponent
  ]
})
export class CompaniesModule { }
