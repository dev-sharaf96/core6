import { CommissionComponent } from './commission/commission.component';
import { AuthGuard, PagesGuard } from "./core/guards";
import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccessDeniedComponent } from "./access-denied/access-denied.component";
import { AddCorporateAccountComponent } from "./Corporate/corporate-accounts/add-corporate-account/add-corporate-account.component";
import { AddPromotinComponent } from "./promotion-program/add-promotin/add-promotin.component";
import { AddPromotionProgramCodeComponent } from "./promotion-program-code/add-promotion-program-code/add-promotion-program-code.component";
import { AddPromotionProgramDomainComponentComponent } from "./promotion-program-domain/add-promotion-program-domain-component/add-promotion-program-domain-component.component";
import { AddUserComponent } from "./AutoLease/autolease-users/add-user/add-user.component";
import { AdminComponent } from "./admin/admin.component";
import { ApproveMoiComponent } from "./approve-moi/approve-moi.component";
import { AutoleaseUsersComponent } from "./AutoLease/autolease-users/autolease-users.component";
import { AvgServiceRequestTimeComponent } from "src/app/avg-response-time/avg-service-request-time/avg-service-request-time.component";
import { CancellationComponent } from "src/app/cancellation/cancellation.component";
import { CheckoutRequestLogComponent } from "./request-logs/checkout-request-log/checkout-request-log.component";
import { CheckoutRequestLogDetailsComponent } from "./request-logs/checkout-request-log/checkout-request-log-details/checkout-request-log-details.component";
import { ClientsComponent } from "./clients/clients.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { CorporateAccountUsersComponent } from "./Corporate/corporate-accounts/corporate-account-users/corporate-account-users.component";
import { CorporateAccountsComponent } from "./Corporate/corporate-accounts/corporate-accounts.component";
import { CorporateAddUsersComponent } from "./Corporate/corporate-users/corporate-add-users/corporate-add-users.component";
import { CorporateEditUsersComponent } from "./Corporate/corporate-users/corporate-edit-users/corporate-edit-users.component";
import { CorporateUsersComponent } from "./Corporate/corporate-users/corporate-users.component";
import { CreateTicketComponent } from "./ticket/create-ticket/create-ticket.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditCorporateAccountComponent } from "./Corporate/corporate-accounts/edit-corporate-account/edit-corporate-account.component";
import { EditPromotionDomainComponent } from "./promotion-program-domain/edit-promotion-domain/edit-promotion-domain.component";
import { EditUserComponent } from "./AutoLease/autolease-users/edit-user/edit-user.component";
import { EsalInvoicesComponent } from "./esal-invoices/esal-invoices.component";
import { FinanceComponent } from "./finance/finance.component";
import { InquiryRequestLogComponent } from "./request-logs/inquiry-request-log/inquiry-request-log.component";
import { InquiryRequestLogDetailsComponent } from "./request-logs/inquiry-request-log/inquiry-request-log-details/inquiry-request-log-details.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { LoginComponent } from "./login/login.component";
import { LogsComponent } from "./logs/logs.component";
import { NajmComponent } from "./najm/najm.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { OccupationComponent } from "./occupation/occupation.component";
import { OfferListComponent } from "./offers/offer-list.component";
import { PolicyNotificationLogComponent } from "./request-logs/policy-notification-log/policy-notification-log.component";
import { ProfileComponent } from "./profile/profile.component";
import { PromotionProgramApprovalsComponent } from "./promotion-program/promotion-program-approvals/promotion-program-approvals.component";
import { PromotionProgramCodeComponent } from "./promotion-program-code/promotion-program-code.component";
import { PromotionProgramCodeDetailsComponent } from "./promotion-program-code/promotion-program-code-details/promotion-program-code-details.component";
import { PromotionProgramComponent } from "./promotion-program/promotion-program.component";
import { PromotionProgramDomainComponent } from "./promotion-program-domain/promotion-program-domain.component";
import { PromotionProgramNationalidsComponent } from "./promotion-program/promotion-program-nationalids/promotion-program-nationalids.component";
import { QuotationRequestLogComponent } from "./request-logs/quotation-request-log/quotation-request-log.component";
import { QuotationRequestLogDetailsComponent } from "./request-logs/quotation-request-log/quotation-request-log-details/quotation-request-log-details.component";
import { ReportsComponent } from "./reports/reports.component";
import { RequestCounterComponent } from "./request-counter/request-counter.component";
import { RequestPerCompanyComponent } from "./Request-Per-Comany/request-per-company/request-per-company.component";
import { RequestsComponent } from "./requests/requests.component";
import { RequestsNewComponent } from "./requests-new/requests-new.component";
import { ServiceRequestComponent } from "./service-request/service-request.component";
import { SmsLogComponent } from "./request-logs/sms-log/sms-log.component";
import { TicketComponent } from "./ticket/ticket.component";
import { TicketDetailsComponent } from "./ticket/ticket-details/ticket-details.component";
import { UpdateRequestComponent } from "./request-counter/update-request/update-request.component";
import { UploadPromotionDiscountSheetComponent } from "./promotion-program/upload-promotion-discount-sheet/upload-promotion-discount-sheet.component";
import { UsersComponent } from "./users/users.component";
import { VehicleLimitComponent } from "./vehicles/vehicle-limit/vehicle-limit.component";
import { VehicleMakerComponent } from "./vehicle-maker/vehicle-maker.component";
import { VehicleMakerDetailsComponent } from "./vehicle-maker/vehicle-maker-details/vehicle-maker-details.component";
import { YakeenCityCenterComponent } from "./yakeen-city-center/yakeen-city-center.component";
import { YakeenCityCenterListingComponent } from "./yakeen-city-center/yakeen-city-center-listing/yakeen-city-center-listing.component";
import{BankAccountsComponent} from"../app/AutoleasingWallet/autoleasing-wallet/bank-accounts.component";
import { BCareWithdrawalComponent } from './bcare-withdrawal/bcare-withdrawal/bcare-withdrawal.component';
import { OldQuotationLogComponent } from './request-logs/old-quotation-log/old-quotation-log.component';
import { WareefCategoryComponent } from "./wareef-category/wareef-category.component";
import { WareefComponent } from './wareef/wareef.component';
import { WareefDiscountsComponent } from "./wareef-discounts/wareef-discounts.component";
import { WareefDescriptionComponent } from "./wareef-description/wareef-description.component";
import { UploadWareefDiscountComponent } from "./upload-wareef-discount/upload-wareef-discount.component";
import { BlockUsersComponent } from './block-users/block-users/block-users.component';
import { ClaimsFollowUpComponent } from "./leasing-claims/followUp/claims-followUp.component";
import { ClaimsDetailsComponent } from "./leasing-claims/claims-details/claim-details.component";
import { AppNotificationsComponent } from './request-logs/app-notifications/app-notifications.component';
import { SmsRenewalLogComponent } from "./request-logs/sms-renewal-log/sms-renewal-log.component";
import { OldLogsComponent } from './old-logs/old-logs.component';
import { GetVehicleInfoByCustomTwoComponent } from './yakeen/get-vehicle-info-by-custom-two/get-vehicle-info-by-custom-two.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard, PagesGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
        pathMatch: "full",
      },
      {
        path: "najm",
        component: NajmComponent,
        pathMatch: "full",
      },
      {
        path: "request_counter",
        component: RequestCounterComponent,
        pathMatch: "full",
      },
      {
        path: "notif_center",
        component: NotificationsComponent,
        pathMatch: "full",
      },
      {
        path: "reports",
        component: ReportsComponent,
        pathMatch: "full",
      },
      {
        path: "invoice",
        component: InvoiceComponent,
        pathMatch: "full",
      },
      {
        path: "esal",
        component: EsalInvoicesComponent,
        pathMatch: "full",
      },
      {
        path: "clients",
        component: ClientsComponent,
        pathMatch: "full",
      },
      {
        path: "logs",
        component: LogsComponent,
        pathMatch: "full",
      },
      {
        path: "contact_us",
        component: ContactUsComponent,
        pathMatch: "full",
      },
      {
        path: "profile",
        component: ProfileComponent,
        pathMatch: "full",
      },
      {
        path: "finance",
        component: FinanceComponent,
        pathMatch: "full",
      },
      {
        path: "requests",
        component: RequestsComponent,
        pathMatch: "full",
      },
      {
        path: "avg-service-request-time",
        component: AvgServiceRequestTimeComponent,
        pathMatch: "full",
      },
      {
        path: "request-Per-Comany",
        component: RequestPerCompanyComponent,
        pathMatch: "full",
      },
      {
        path: "cancellation",
        component: CancellationComponent,
        pathMatch: "full",
      },
      {
        path: "requests-new",
        component: RequestsNewComponent,
        pathMatch: "full",
      },
      {
        path: "logs-old",
        component: OldLogsComponent,
        pathMatch: "full",
      },
      {
        path: "update_request",
        component: UpdateRequestComponent,
        pathMatch: "full",
      },
      {
        path: "promotion",
        component: PromotionProgramComponent,
        pathMatch: "full",
      },
      {
        path: "promotion/addPromotion",
        component: AddPromotinComponent,
        pathMatch: "full",
      },
      {
        path: "promotion/addPromotion/:id",
        component: AddPromotinComponent,
        pathMatch: "full",
      },
      {
        path: "promotion/addPromotionProgramNins/:id",
        component: PromotionProgramNationalidsComponent,
        pathMatch: "full",
      },
      {
        path: "PromotionProgramCode",
        component: PromotionProgramCodeComponent,
        pathMatch: "full",
      },
      {
        path: "PromotionProgramCode/addCode",
        component: AddPromotionProgramCodeComponent,
        pathMatch: "full",
      },
      {
        path: "promotion/PromotionProgramDomain/:id",
        component: PromotionProgramDomainComponent,
        pathMatch: "full",
      },
      {
        path: "promotion/PromotionProgramDomain/addPromotionDomai/:id",
        component: AddPromotionProgramDomainComponentComponent,
        pathMatch: "full",
      },
      {
        path: "promotion/PromotionProgramCodeDetails/:id",
        component: PromotionProgramCodeDetailsComponent,
        pathMatch: "full",
      },
      {
        path: "promotion/editDomain/:id",
        component: EditPromotionDomainComponent,
        pathMatch: "full",
      },
      {
        path: "approve-moi",
        component: ApproveMoiComponent,
        pathMatch: "full",
      },
      {
        path: "Wareef",
        component: WareefComponent,
        pathMatch: "full",
      },
      {
        path: "WareefCategory",
        component: WareefCategoryComponent,
        pathMatch: "full",
      },
      {
        path: "wareefDiscount",
        component: WareefDiscountsComponent,
        pathMatch: "full",
      },
      {
        path: "wareefDescription",
        component: WareefDescriptionComponent,
        pathMatch: "full",
      },
      {
        path: "UploadWareefDiscount",
        component: UploadWareefDiscountComponent,
        pathMatch: "full",
      },
      {
        path: "ClaimsFollowUp",
        component: ClaimsFollowUpComponent,
        pathMatch: "full",
      },
      {
        path: "ClaimsFollowUp/details/:id",
        component: ClaimsDetailsComponent,
        pathMatch: "full",
      },
      {
        path: "policies",
        loadChildren: "./policies/policies.module#PoliciesModule",
      },
      {
        path: "vehicles",
        loadChildren: "./vehicles/vehicles.module#VehiclesModule",
      },
      {
        path: "drivers",
        loadChildren: "./drivers/drivers.module#DriversModule",
      },

      {
        path: "companies",
        loadChildren: "./companies/companies.module#CompaniesModule",
      },
      {
        path: "payments",
        loadChildren: "./payments/payments.module#PaymentsModule",
      },
      {
        path: "checkouts",
        loadChildren: "./checkouts/checkouts.module#CheckoutsModule",
      },
      {
        path: "requestLogs",
        component: CheckoutRequestLogComponent,
        pathMatch: "full",
      },
      {
        path: "requestLogs/checkoutRequestLog",
        component: CheckoutRequestLogComponent,
        pathMatch: "full",
      },
      {
        path: "requestLogs/policy-notification-log",
        component:PolicyNotificationLogComponent,
        pathMatch: "full",
      },
      {
        path: "requests-new/old-quotations",
        component:OldQuotationLogComponent,
        pathMatch: "full",
      },
      {
        path: "requestLogs/checkoutRequestLog/details/:id",
        component: CheckoutRequestLogDetailsComponent,
        pathMatch: "full",
      },
      {
        path: "requestLogs/inquiryRequestLog",
        component: InquiryRequestLogComponent,
        pathMatch: "full",
      },
      {
        path: "requestLogs/inquiryRequestLog/details/:id",
        component: InquiryRequestLogDetailsComponent,
        pathMatch: "full",
      },
      {
        path: "requestLogs/quotationRequestLog",
        component: QuotationRequestLogComponent,
        pathMatch: "full",
      },
      {
        path: "requestLogs/quotationRequestLog/details/:id",
        component: QuotationRequestLogDetailsComponent,
        pathMatch: "full",
      },
      {
        path: "requestLogs/smsLog",
        component: SmsLogComponent,
        pathMatch: "full",
      },
     {path: "requestLogs/sms-renewal-log",
      component: SmsRenewalLogComponent,
       pathMatch: "full",
       },
      {
        path: "requestLogs/appNotifications",
        component: AppNotificationsComponent,
        pathMatch: "full",
      },
      {
        path: "users",
        component: UsersComponent,
        pathMatch: "full",
      },
      {
        path: "vehicleLimit",
        component: VehicleLimitComponent,
        pathMatch: "full",
      },
      {
        path: "service-request",
        component: ServiceRequestComponent,
        pathMatch: "full",
      },
      {
        path: "tickets",
        component: TicketComponent,
        pathMatch: "full",
      },
      {
        path: "tickets/createTicket",
        component: CreateTicketComponent,
        pathMatch: "full",
      },
      {
        path: "tickets/details/:ticketId",
        component: TicketDetailsComponent,
        pathMatch: "full",
      },
      {
        path: "vehicleMaker",
        component: VehicleMakerComponent,
        pathMatch: "full",
      },
      {
        path: "blockedUsers",
        component: BlockUsersComponent,
        pathMatch: "full",
      },
      {
        path: "vehicleMaker/details/:makerCode",
        component: VehicleMakerDetailsComponent,
        pathMatch: "full",
      },
      {
        path: "allYakeenCityCenter",
        component: YakeenCityCenterListingComponent,
        pathMatch: "full",
      },
      {
        path: "Offers",
        component: UploadPromotionDiscountSheetComponent,
        pathMatch: "full",
      },
      {
        path: "occupation",
        component: OccupationComponent,
        pathMatch: "full",
      },
      {
        path: "usersAutolease",
        component: AutoleaseUsersComponent,
        pathMatch: "full",
      },
      {
        path: "usersAutolease/user",
        component: AddUserComponent,
        pathMatch: "full",
      },
      {
        path: "usersAutolease/user/:id",
        component: EditUserComponent,
        pathMatch: "full",
      },
      {
        path: "offers-list",
        component: OfferListComponent,
        pathMatch: "full",
      },
      {
        path: "corporate",
        component: CorporateUsersComponent,
        pathMatch: "full",
      },
      {
        path: "corporate/user",
        component: CorporateAddUsersComponent,
        pathMatch: "full",
      },
      {
        path: "corporate/user/:id",
        component: CorporateEditUsersComponent,
        pathMatch: "full",
      },
      {
        path: "corporate/account",
        component: CorporateAccountsComponent,
        pathMatch: "full",
      },
      {
        path: "corporate/account/new",
        component: AddCorporateAccountComponent,
        pathMatch: "full",
      },
      {
        path: "corporate/account/:id",
        component: EditCorporateAccountComponent,
        pathMatch: "full",
      },
      {
        path: "corporate/account/accountUsers/:id",
        component: CorporateAccountUsersComponent,
        pathMatch: "full"
      },
      {
        path: "promotion/approvals",
        component: PromotionProgramApprovalsComponent,
        pathMatch: "full"
      },
      {
        path: "commission",
        component: CommissionComponent,
        pathMatch: "full",
      },
      {
        path: "withdrawal",
        component: BCareWithdrawalComponent,
        pathMatch: "full",
      },
      {
        path: "yakeen-getVehicleInfoByCustomTwo",
        component: GetVehicleInfoByCustomTwoComponent,
        pathMatch: "full",
      }
    ],
  },
  {
    path: "s",
    loadChildren: "./settings/settings.module#SettingsModule",
    canActivate: [AuthGuard],
  },
  // Access Denied
  {
    path: "access_denied",
    component: AccessDeniedComponent,
  },
  // otherwise Not Found
  {
    path: "**",
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  static components = [
    DashboardComponent,
    NajmComponent,
    RequestCounterComponent,
    NotificationsComponent,
    ReportsComponent,
    ClientsComponent,
    LogsComponent,
    ContactUsComponent,
    ProfileComponent,
    FinanceComponent,
    UpdateRequestComponent,
    LoginComponent,
    AdminComponent,
    NotFoundComponent,
    InvoiceComponent,
    RequestsComponent,
    PromotionProgramComponent,
    AddPromotinComponent,
    PromotionProgramCodeComponent,
    AddPromotionProgramCodeComponent,
    PromotionProgramDomainComponent,
    AddPromotionProgramDomainComponentComponent,
    PromotionProgramCodeDetailsComponent,
    EditPromotionDomainComponent,
    AccessDeniedComponent,
    ApproveMoiComponent,
    CheckoutRequestLogComponent,
    CheckoutRequestLogDetailsComponent,
    InquiryRequestLogComponent,
    InquiryRequestLogDetailsComponent,
    QuotationRequestLogComponent,
    QuotationRequestLogDetailsComponent,
    SmsLogComponent,
    SmsRenewalLogComponent,
    UsersComponent,
    VehicleLimitComponent,
    EsalInvoicesComponent,
    RequestsNewComponent,
    ServiceRequestComponent,
    TicketComponent,
    TicketDetailsComponent,
    CreateTicketComponent,
    VehicleMakerComponent,
    VehicleMakerDetailsComponent,
    YakeenCityCenterComponent,
    YakeenCityCenterListingComponent,
    UploadPromotionDiscountSheetComponent,
    OccupationComponent,
    PromotionProgramNationalidsComponent,
    AutoleaseUsersComponent,
    AddUserComponent,
    EditUserComponent,
    OfferListComponent,
    CorporateUsersComponent,
    CorporateAddUsersComponent,
    CorporateEditUsersComponent,
    CorporateAccountsComponent,
    AddCorporateAccountComponent,
    EditCorporateAccountComponent,
    CorporateAccountUsersComponent,
    AvgServiceRequestTimeComponent,
    CancellationComponent,
    RequestPerCompanyComponent,
    CommissionComponent,
    PolicyNotificationLogComponent,
    BankAccountsComponent
  ];
}
