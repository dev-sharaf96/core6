import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ApproveComponent } from "./request-counter/update-request/approve/approve.component";
import { AuthGuard } from "./core/guards";
import { BCareWithdrawalComponent } from './bcare-withdrawal/bcare-withdrawal/bcare-withdrawal.component';
import { BodyTypeComponent } from "./reports/body-type/body-type.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CaptchaComponent } from "./captcha/captcha.component";
import { CommissionComponent } from './commission/commission.component';
import { ConfirmComponent } from "./request-counter/update-request/confirm/confirm.component";
import { CoreModule } from "./core/core.module";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { PaymentComponent } from "./request-counter/update-request/payment/payment.component";
import { PromotionProgramApprovalsComponent } from "./promotion-program/promotion-program-approvals/promotion-program-approvals.component";
import { RefundConfirmComponent } from "./request-counter/refund-confirm/refund-confirm.component";
import { RejectComponent } from "./request-counter/update-request/reject/reject.component";
import { RequestLogsComponent } from "./request-logs/request-logs.component";
import { RequestLogsModule } from "./request-logs/request-logs.module";
import { SharedModule } from "./shared/shared.module";
import { TicketLogComponent } from "./ticket/ticket-log/ticket-log.component";
import { TimeAgoPipe } from "time-ago-pipe";
import { ToastrModule } from "ngx-toastr";
import { TokenInterceptor } from "./core/helpers";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService } from "@ngx-translate/core";
import { WareefCategoryComponent } from './wareef-category/wareef-category.component';
import { WareefComponent } from './wareef/wareef.component';
import { WareefDiscountsComponent } from './wareef-discounts/wareef-discounts.component';
import { WareefDescriptionComponent } from './wareef-description/wareef-description.component';
import { UploadWareefDiscountComponent } from './upload-wareef-discount/upload-wareef-discount.component';
import { BlockUsersComponent } from "./block-users/block-users/block-users.component";
import { ClaimsFollowUpComponent } from "./leasing-claims/followUp/claims-followUp.component";
import { ClaimsDetailsComponent } from "./leasing-claims/claims-details/claim-details.component";
import { OldLogsComponent } from './old-logs/old-logs.component';
import { GetVehicleInfoByCustomTwoComponent } from './yakeen/get-vehicle-info-by-custom-two/get-vehicle-info-by-custom-two.component';

/**
 * Load json translate files by httpLoader
 *
 * @export
 * @param {HttpClient} http
 * @returns
 */
//export function HttpLoaderFactory(http: HttpClient) {
// return new TranslateHttpLoader(http);
//}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    AppRoutingModule.components,
    CaptchaComponent,
    TicketLogComponent,
    RequestLogsComponent,
    BodyTypeComponent,
    RejectComponent,
    ApproveComponent,
    PaymentComponent,
    ConfirmComponent,
    RefundConfirmComponent,
    TimeAgoPipe,
    CommissionComponent,
    PromotionProgramApprovalsComponent,
    BCareWithdrawalComponent,
    WareefComponent,
    WareefCategoryComponent,
    WareefDiscountsComponent,
    WareefDescriptionComponent,
    UploadWareefDiscountComponent,
    BlockUsersComponent,
    ClaimsFollowUpComponent,
    ClaimsDetailsComponent,
    OldLogsComponent,
    GetVehicleInfoByCustomTwoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      progressBar: true,
    }),
    NgSelectModule,
    RequestLogsModule
  ],
  providers: [
    AuthGuard,
    TranslateService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    // other exported modules here
    TranslateModule,
    HttpClientModule,
    NgSelectModule,
  ],
})
export class AppModule {}