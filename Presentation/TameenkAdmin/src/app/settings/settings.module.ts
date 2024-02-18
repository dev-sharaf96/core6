import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { PageComponent } from './pages/page/page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserPagesComponent } from './user-pages/user-pages.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { SettingComponent } from './setting/setting.component';
import { TameenkUsersComponent } from './tameenk-users/tameenk-users.component';
import { TameenkUserComponent } from './tameenk-users/tameenk-user/tameenk-user.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  declarations: [
    SettingsComponent,
    PagesComponent,
    PageComponent,
    NavbarComponent,
    UserPagesComponent,
    ProfileComponent,
    UsersComponent,
    UserComponent,
    SettingComponent,
    TameenkUsersComponent,
    TameenkUserComponent
  ]
})
export class SettingsModule { }
