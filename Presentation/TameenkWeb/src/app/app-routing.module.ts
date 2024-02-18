import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { ContactUsComponent } from './shared/pages/contact-us/contact-us.component';
import { AboutUsComponent } from './shared/pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './shared/pages/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './shared/pages/terms-condition/terms-condition.component';
import { ErrorComponent } from './shared/pages/error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CheckoutResolverService } from './core/helpers/checkout-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  }, {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [AuthGuard]
  }, {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  }, {
    path: 'quotation/:id',
    loadChildren: './quotation/quotation.module#QuotationModule'
  }, {
    path: 'checkout',
    loadChildren: './checkout/checkout.module#CheckoutModule',
    canActivate: [AuthGuard],
    resolve: {
      details: CheckoutResolverService
    }
  }, {
    path: 'purchased',
    loadChildren: './purchased/purchased.module#PurchasedModule'
  }, {
    path: 'contactUs',
    component: ContactUsComponent
  }, {
    path: 'aboutUs',
    component: AboutUsComponent
  }, {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent
  }, {
    path: 'termsCondition',
    component: TermsConditionComponent
  }, {
    path: 'error',
    component: ErrorComponent
  }, {
    path: 'notFound',
    component: NotFoundComponent
  }, { path: '**', redirectTo:  'notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
