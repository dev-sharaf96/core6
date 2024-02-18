import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './pages/page/page.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { AdminGuard } from '../core/guards';
import { SettingComponent } from './setting/setting.component';
import { TameenkUsersComponent } from './tameenk-users/tameenk-users.component';
import { TameenkUserComponent } from './tameenk-users/tameenk-user/tameenk-user.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivateChild: [AdminGuard],
    children: [{
        path: '',
        pathMatch: 'full',
        redirectTo: 'pages'
      }, {
        path: 'pages',
        component: PagesComponent
      }, {
        path: 'pages/page',
        component: PageComponent,
        pathMatch: 'full'
      }, {
        path: 'pages/page/:id',
        component: PageComponent,
        pathMatch: 'full'
      }, {
        path: 'userPages',
        component: UserPagesComponent,
        pathMatch: 'full'
      }, {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full'
      }, {
        path: 'users/user',
        component: UserComponent,
        pathMatch: 'full'
      }, {
        path: 'users/user/:id',
        component: UserComponent,
        pathMatch: 'full'
      }, {
        path: 'setting',
        component: SettingComponent,
        pathMatch: 'full'
      }
      , {
        path: 'TameenkUsers',
        component: TameenkUsersComponent,
        pathMatch: 'full'
      }, {
        path: 'TameenkUsers/user',
        component: TameenkUserComponent,
        pathMatch: 'full'
      }, {
        path: 'TameenkUsers/user/:id',
        component: TameenkUserComponent,
        pathMatch: 'full'
      }
    ]
  }, {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
