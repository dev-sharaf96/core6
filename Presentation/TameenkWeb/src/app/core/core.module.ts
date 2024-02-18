import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthenticatedComponent } from './header/authenticated/authenticated.component';
import { NotAuthenticatedComponent } from './header/not-authenticated/not-authenticated.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [HeaderComponent, FooterComponent, AuthenticatedComponent, NotAuthenticatedComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule { }
