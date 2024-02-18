export const environment = {
  production: true,
  quotationApiUrl: '//test.bcare.com.sa/QuotationApi/api/',
  policyApiUrl: '//test.bcare.com.sa/PolicyApi/api/',
  inquiryApiUrl: '//test.bcare.com.sa/InquiryApi/api/',
  administrationApiUrl: '//test.bcare.com.sa/AdministrationApi/api/',
  identityApiUrl: '//test.bcare.com.sa/IdentityApi/api/',
  paymentApiUrl: '//test.bcare.com.sa/Payment/api/',
  accessTokenUrl: '/home/GetAccessToken',
  checkoutPath: '/ShoppingCart/AddItemToCart',
  QuotationSearchResult: '/Quotation/SearchResult?qtRqstExtrnlId=',
  pageSize: 15,
  defaultPaging: ''
};
environment.defaultPaging = '&pageIndx=0&pageSize=${environment.pageSize}';
