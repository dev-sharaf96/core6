import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';

import { PopupComponent } from './components/popup/popup.component';
import { CarPlateComponent } from './components/car-plate/car-plate.component';
import { PlacholderComponent } from './components/placholder/placholder.component';
import { NumberDirective } from './directives/number.directive';
import { FloatedLabelDirective } from './directives/focus-blur.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './pages/terms-condition/terms-condition.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ErrorComponent } from './pages/error/error.component';
import { RouterModule } from '@angular/router';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { PagerComponent } from './components/pager/pager.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true
    })
  ],
  declarations: [
    PopupComponent,
    CarPlateComponent,
    PlacholderComponent,
    NumberDirective,
    FloatedLabelDirective,
    LoaderComponent,
    NotFoundComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    ContactUsComponent,
    CaptchaComponent,
    ErrorComponent,
    PagerComponent,
    LoadingComponent,
    NotificationComponent
  ],
  exports: [
    PopupComponent,
    CarPlateComponent,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    PlacholderComponent,
    NumberDirective,
    FloatedLabelDirective,
    LoaderComponent,
    TranslateModule,
    NotFoundComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    ContactUsComponent,
    RouterModule,
    CaptchaComponent,
    PagerComponent,
    LoadingComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
