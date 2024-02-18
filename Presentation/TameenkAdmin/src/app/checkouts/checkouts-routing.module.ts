import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutsComponent } from './checkouts.component';
import { CheckoutsEditComponent } from './checkouts-edit/checkouts-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutsComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:referenceId',
    component: CheckoutsEditComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutsRoutingModule { }
