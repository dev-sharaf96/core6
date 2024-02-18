import { CheckoutRequestLogComponent } from './checkout-request-log/checkout-request-log.component';
import { CheckoutRequestLogDetailsComponent } from './checkout-request-log/checkout-request-log-details/checkout-request-log-details.component';
import { CommonModule } from '@angular/common';
import { InquiryRequestLogComponent } from './inquiry-request-log/inquiry-request-log.component';
import { InquiryRequestLogDetailsComponent } from './inquiry-request-log/inquiry-request-log-details/inquiry-request-log-details.component';
import { NgModule } from '@angular/core';
import { PolicyNotificationLogComponent } from './policy-notification-log/policy-notification-log.component';
import { QuotationRequestLogComponent } from './quotation-request-log/quotation-request-log.component';
import { QuotationRequestLogDetailsComponent } from './quotation-request-log/quotation-request-log-details/quotation-request-log-details.component';
import { RequestLogsComponent } from './request-logs.component';
import { SharedModule } from '../shared/shared.module';
import { OldQuotationLogComponent } from './old-quotation-log/old-quotation-log.component';
import { AppNotificationsComponent } from './app-notifications/app-notifications.component';

@NgModule({
  declarations: [OldQuotationLogComponent, AppNotificationsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RequestLogsModule { }
