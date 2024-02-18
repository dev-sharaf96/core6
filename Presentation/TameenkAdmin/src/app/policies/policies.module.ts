import { AddBenfitComponent } from './Add-Benfit/add-benfit.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { CancelledPoliciesComponent } from './cancelled-policies/cancelled-policies.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CheckoutPoliciesComponent } from './checkout-policies/checkout-policies.component';
import { CommonModule } from '@angular/common';
import { ComprehensivePoliciesComponent } from './comprehensive-policies/comprehensive-policies.component';
import { DetailsComponent } from './success-policies/details/details.component';
import { EditComponent } from './failure-policies/edit/edit.component';
import { FailurePoliciesComponent } from './failure-policies/failure-policies.component';
import { GenerateComponent } from './generate/generate.component';
import { NajmWithPolicyResponseTimeComponent } from './najm-with-policy-response-time/najm-with-policy-response-time.component';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotifecationComponent } from './Claims/notification/notifecation.component';
import { PoliciesComponent } from './policies.component';
import { PoliciesInfoComponent } from './policies-info/policies-info.component';
import { PoliciesRoutingModule } from './policies-routing.module';
import { PolicyStatisticsReportComponent } from './policy-statistics-report/policy-statistics-report.component';
import { RegeneratePoliciesComponent } from './regenerate-policies/regenerate-policies.component';
import { RegistrationComponent } from './Claims/registration/registration.component';
import { RenewalDiscountComponent } from '../renewal-discount/renewal-discount.component';
import { RenwalPoliciesComponent } from './renwal-policies/renwal-policies.component';
import { ReuploadPolicyComponent } from './reupload-policy/reupload-policy.component';
import { SamaReportComponent } from '../sama-report/sama-report.component';
import { SamaStatisticsReportComponent } from './sama-statistics-report/sama-statistics-report.component';
import { SharedModule } from '../shared/shared.module';
import { StatusComponent } from './status/status.component';
import { StatusDetailsComponent } from './status/status-details/status-details.component';
import { StopSMSComponent } from './stop-sms/stop-sms.component';
import { SuccessPoliciesComponent } from './success-policies/success-policies.component';
import { RenewalPoliciesMessageComponent } from './renewal-policies-message/renewal-policies-message.component';
import { OwnDamageComponent } from './own-damage/own-damage.component';
import { PendingPoliciesComponent } from './pending-policies/pending-policies.component';
import { GetCustomersOverFivePolicyComponent } from './get-customers-over-five-policy/get-customers-over-five-policy.component';
import { RepeatedPoliciesWithFilterComponent } from './repeated-policies-with-filter/repeated-policies-with-filter.component';

@NgModule({
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    SharedModule,
    NgSelectModule
],
  declarations: [
    PoliciesComponent,
    SuccessPoliciesComponent,
    FailurePoliciesComponent,
    EditComponent,
    DetailsComponent,
    GenerateComponent,
    CancelledPoliciesComponent,
    StatusComponent,
    StatusDetailsComponent,
    CheckoutPoliciesComponent,
    RegeneratePoliciesComponent,
    ReuploadPolicyComponent,
    PoliciesInfoComponent,
    ComprehensivePoliciesComponent,
    SamaReportComponent,
    SamaStatisticsReportComponent,

   RenwalPoliciesComponent,
   NajmWithPolicyResponseTimeComponent,
   RenewalDiscountComponent,
   RegistrationComponent,
   NotifecationComponent,
   AddBenfitComponent,
   AddDriverComponent,
   PolicyStatisticsReportComponent,
   StopSMSComponent,
   CheckOutComponent,
   RenewalPoliciesMessageComponent,
   OwnDamageComponent,
   PendingPoliciesComponent,
   GetCustomersOverFivePolicyComponent,
   RepeatedPoliciesWithFilterComponent
  ]
})
export class PoliciesModule {}
