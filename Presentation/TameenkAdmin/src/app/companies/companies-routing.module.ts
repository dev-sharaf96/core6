import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { TestInsuranceCompanyComponent } from './test-insurance-company/test-insurance-company.component';

const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'test', component: TestInsuranceCompanyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
