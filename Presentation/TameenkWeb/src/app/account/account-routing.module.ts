import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { VerifyComponent } from './verify/verify.component';
const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'register', component: AccountComponent},
      { path: 'login', component: AccountComponent}
    ]
  },
  { path: 'verify', component: VerifyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
