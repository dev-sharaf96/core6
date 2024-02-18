// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  quotationApiUrl: '//test.bcare.com.sa/QuotationApi/api/',
  policyApiUrl: '//test.bcare.com.sa/PolicyApi/api/',
  inquiryApiUrl: '//test.bcare.com.sa/InquiryApi/api/',
  administrationApiUrl: '//test.bcare.com.sa/AdministrationApi/api/',
  identityApiUrl: '//test.bcare.com.sa/IdentityApi/api/',
  paymentApiUrl: '//test.bcare.com.sa/Payment/api/',
  accessTokenUrl: '/home/GetAccessToken',
  checkoutPath: '/ShoppingCart/AddItemToCart',
  QuotationSearchResult: '/Quotation/SearchResult?qtRqstExtrnlId=',
  pageSize: 5,
  defaultPaging: ''
};
environment.defaultPaging = '&pageIndx=0&pageSize=${environment.pageSize}';
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
