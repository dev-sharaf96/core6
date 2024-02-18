import { RouterModule, Routes } from '@angular/router';

import { AddBenfitComponent } from './Add-Benfit/add-benfit.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { CancelledPoliciesComponent } from './cancelled-policies/cancelled-policies.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CheckoutPoliciesComponent } from './checkout-policies/checkout-policies.component';
import { ComprehensivePoliciesComponent } from './comprehensive-policies/comprehensive-policies.component';
import { DetailsComponent } from './success-policies/details/details.component';
import { EditComponent } from './failure-policies/edit/edit.component';
import { FailurePoliciesComponent } from './failure-policies/failure-policies.component';
import { GenerateComponent } from './generate/generate.component';
import { NajmWithPolicyResponseTimeComponent } from './najm-with-policy-response-time/najm-with-policy-response-time.component';
import { NgModule } from '@angular/core';
import { NotifecationComponent } from './Claims/notification/notifecation.component';
import { PoliciesComponent } from './policies.component';
import { PoliciesInfoComponent } from './policies-info/policies-info.component';
import { PolicyStatisticsReportComponent } from './policy-statistics-report/policy-statistics-report.component';
import { RegeneratePoliciesComponent } from './regenerate-policies/regenerate-policies.component';
import { RegistrationComponent } from './Claims/registration/registration.component';
import { RenewalDiscountComponent } from '../renewal-discount/renewal-discount.component';
import { RenwalPoliciesComponent } from './renwal-policies/renwal-policies.component';
import { ReuploadPolicyComponent } from './reupload-policy/reupload-policy.component';
import { SamaReportComponent } from '../sama-report/sama-report.component';
import { SamaStatisticsReportComponent } from './sama-statistics-report/sama-statistics-report.component';
import { StatusComponent } from './status/status.component';
import { StatusDetailsComponent } from './status/status-details/status-details.component';
import { StopSMSComponent } from './stop-sms/stop-sms.component';
import { SuccessPoliciesComponent } from './success-policies/success-policies.component';
import { RenewalPoliciesMessageComponent } from './renewal-policies-message/renewal-policies-message.component';
import { OwnDamageComponent } from './own-damage/own-damage.component';
import { PendingPoliciesComponent } from './pending-policies/pending-policies.component';
import { GetCustomersOverFivePolicyComponent } from './get-customers-over-five-policy/get-customers-over-five-policy.component';
import { RepeatedPoliciesWithFilterComponent } from './repeated-policies-with-filter/repeated-policies-with-filter.component';

const routes: Routes = [
  { path: '', component: PoliciesComponent, children: [
    { path: '', redirectTo: 'success', pathMatch: 'full' },

    { path: 'success', component: SuccessPoliciesComponent },
    { path: 'success/details/:ref', component: DetailsComponent, pathMatch: 'full' },

    { path: 'failure', component: FailurePoliciesComponent, pathMatch: 'full' },
    { path: 'failure/edit/:ref', component: EditComponent, pathMatch: 'full' },

    { path: 'comprehensive', component: ComprehensivePoliciesComponent },
    { path: 'comprehensive/details/:ref', component: DetailsComponent, pathMatch: 'full' },//path comprehensive

    { path: 'cancel', component: CancelledPoliciesComponent, pathMatch: 'full' },
    { path: 'generate', component: GenerateComponent, pathMatch: 'full' },
    { path: 'status', component: StatusComponent, pathMatch: 'full' },
    { path: 'status/details/:ref/:status', component: StatusDetailsComponent, pathMatch: 'full' },
    { path: 'checkout', component: CheckoutPoliciesComponent, pathMatch: 'full' },
    { path: 'regenerate', component: RegeneratePoliciesComponent, pathMatch: 'full' },
    { path: 'reupload', component: ReuploadPolicyComponent, pathMatch: 'full' },
    { path: 'success-new', component: PoliciesInfoComponent, pathMatch: 'full' },
    { path: 'sama-report', component: SamaReportComponent, pathMatch: 'full' },
    { path: 'sama-statistics-report', component: SamaStatisticsReportComponent,pathMatch: 'full'},

    { path: 'renewal-policies', component:RenwalPoliciesComponent,pathMatch: 'full'},
    { path: 'policy-najm-response-time', component:NajmWithPolicyResponseTimeComponent,pathMatch: 'full'},
    { path: 'renewalDiscount', component: RenewalDiscountComponent },

    { path: 'add-driver', component:AddDriverComponent,pathMatch: 'full'},
    { path: 'add-benefit', component:AddBenfitComponent,pathMatch: 'full'},
    { path: 'Claims-registration', component: RegistrationComponent,pathMatch: 'full'},
    { path: 'Claims-Notfication', component: NotifecationComponent,pathMatch: 'full'},
    { path: 'add-benefit', component:AddBenfitComponent,pathMatch: 'full'},
    { path: 'add-driver', component:AddDriverComponent,pathMatch: 'full'},
    { path: 'renewal-policies', component:RenwalPoliciesComponent,pathMatch: 'full'},
    { path: 'policy-najm-response-time', component:NajmWithPolicyResponseTimeComponent,pathMatch: 'full'},
    { path: 'renewalDiscount', component: RenewalDiscountComponent,pathMatch: 'full' },
    { path: 'GetAllPolicyStatistics', component: PolicyStatisticsReportComponent ,pathMatch: 'full'},
    { path: 'stop-sms', component: StopSMSComponent ,pathMatch: 'full'},
    { path: 'sama-checkout-details', component: CheckOutComponent ,pathMatch: 'full' },
    { path: 'send-renewal-message', component: RenewalPoliciesMessageComponent ,pathMatch: 'full'},
    { path: 'own-damage', component: OwnDamageComponent },
    { path: 'processingQueue', component: PendingPoliciesComponent },
    { path: 'get-customers-over-five-policy', component: GetCustomersOverFivePolicyComponent ,pathMatch: 'full' },
    { path: 'repeated-policies-with-filter', component: RepeatedPoliciesWithFilterComponent ,pathMatch: 'full'}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
