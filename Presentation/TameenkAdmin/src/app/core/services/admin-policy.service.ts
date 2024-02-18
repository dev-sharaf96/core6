import { CommonResponse, NajmStatus, PolicyStatus } from '../models';
import { Injectable, Injector } from '@angular/core';

import { ApiService } from './api.service';
import { DriverFilterResponseModel } from 'src/app/policies/add-driver/Models/DriversFilterResponse';
import { FailureFilter } from 'src/app/policies/failure-policies/failure-filter';
import { FailurePolicies } from 'src/app/policies/failure-policies/failure-policies';
import { GeneratePolicyRes } from 'src/app/policies/generate/generate-policy';
import { Observable } from 'rxjs';
import { PoliciesInfoListingModel } from '../../policies/policies-info/policies-info-listing-model';
import { PolicyFilter } from 'src/app/policies/check-out/PolicyFilter';
import { PolicyListing } from 'src/app/policies/policies-listing';
import { RenewalDiscountModel } from 'src/app/renewal-discount/Models/renewal-discount-model';
import { SamaReport } from 'src/app/finance/sama-report';
import { SamaReportListing } from '../../sama-report/sama-report-listing';
import { SamaReportResult } from 'src/app/finance/sama-report-result';
import { StatusFilter } from 'src/app/policies/status/status-filter';
import { SuccessFilter } from 'src/app/policies/success-policies/success-filter';
import { SuccessPolicies } from 'src/app/policies/success-policies/success-policies';
import { UserModel } from 'src/app/users/users-model';
import { additionalBenfitsResponseModel } from 'src/app/policies/Add-Benfit/Models/additionalBenfitsResponseModel';
import { benfitResponseModel } from 'src/app/policies/Add-Benfit/Models/benfitsResponseModel';
import { claimsResponseModel } from 'src/app/policies/Claims/registration/Model/claimsResponseModel';
import { customModel } from 'src/app/policies/Claims/registration/Model/customresponse';
import { environment } from 'src/environments/environment';
import { najmPolicyResponseModel } from './../../policies/najm-with-policy-response-time/models/najmResponeModel';
import { najmPolicyResponseOutput } from 'src/app/policies/najm-with-policy-response-time/models/najmResponseOutput';
import { notificationResponseModel } from 'src/app/policies/Claims/notification/Model/ResponseModel';
import { outputsModel } from 'src/app/policies/renwal-policies/Models/outputsModel';
import { policyNotificationResponseOutput } from 'src/app/request-logs/policy-notification-log/models/policyNotificationOutput';
import { samaResponseModel } from 'src/app/policies/sama-statistics-report/SamaStatistcsModel/samaResponseModel';
import { StopSMSModel } from 'src/app/policies/stop-sms/Models/stop-sms-model';
import { policyFilterOutPut } from 'src/app/policies/renewal-policies-message/Models/policyFilterOutPut';
import { WithdrawalListingModel } from 'src/app/bcare-withdrawal/bcare-withdrawal/Models/withdrawal-listing-model';
import { WithdrawalStatisticsModel } from 'src/app/bcare-withdrawal/bcare-withdrawal/Models/WithdrawalStatisticsModel';
import { OutputModel } from 'src/app/policies/pending-policies/Models/OutputModel';
import { StatusPolicies } from 'src/app/policies/status/policies-status';
import { OutputModelRepeated } from 'src/app/policies/repeated-policies-with-filter/Models/OutputModelRepeated';
import { OutPutData } from 'src/app/policies/get-customers-over-five-policy/Models/OutPutData';
import { OutPutResult } from 'src/app/policies/repeated-policies-with-filter/Models/OutPutresult';

//import { notificationResponseModel } from 'src/app/policies/Claims/notification/Model/ResponseModel';



@Injectable({
  providedIn: 'root'
})
export class AdminPolicyService extends ApiService {
  failurePoliciesSource: any;
  public successFilter: SuccessFilter = new SuccessFilter();
  public PolicyFilter: PolicyFilter = new PolicyFilter();
  public failureFilter: FailureFilter = new FailureFilter();
  public statusFilter: StatusFilter = new StatusFilter();

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'policy/';
  }

  getSuccessPolicyWithFilter(body): Observable<CommonResponse<PolicyListing[]>> {
    return super.post<CommonResponse<PolicyListing[]>>('success-policies-with-filter', body);
  }
  getFailurePolicyWithFilter(body): Observable<CommonResponse<PolicyListing[]>> {
    return super.post<CommonResponse<PolicyListing[]>>('fail-policies-with-filter', body);
  }
  setPolicyTries(ref: string): Observable<CommonResponse<boolean>> {
    return super.get<CommonResponse<boolean>>('set-policy-tries', `ReferenceId=${ref}`);
  }
  getSuccessDetails(ref): Observable<CommonResponse<SuccessPolicies>> {
    return super.get<CommonResponse<SuccessPolicies>>('success-details', `referenceId=${ref}`);
  }
  getSuccessDetailsForEdit(ref): Observable<CommonResponse<StatusPolicies>> {
    return super.get<CommonResponse<StatusPolicies>>('policy-GetDetailsToEditSuccessByRef', `referenceId=${ref}`);
  }
  getFailDetails(ref): Observable<CommonResponse<FailurePolicies>> {
    return super.get<CommonResponse<FailurePolicies>>('Fail-details', `referenceId=${ref}`);
  }
  editFailurePolicy(body): Observable<CommonResponse<boolean>> {
    return super.post<CommonResponse<boolean>>('edit-fail', body);
  }
  getPolicyStatus(): Observable<CommonResponse<PolicyStatus[]>> {
    return super.get<CommonResponse<PolicyStatus[]>>('policy-status');
  }
  downloadPolicyFile(fileId: string, referenceId: string): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('download-policy', `fileId=${fileId}&referenceId=${referenceId}`);
  }
  reDownloadPolicyFile(referenceId: string): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('re-download-policy', `referenceId=${referenceId}`);
  }
  reGeneratePolicy(referenceId: string): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('re-generate', `referenceId=${referenceId}`);
  }
  generatePolicyManually(body) {
    return super.post<CommonResponse<GeneratePolicyRes>>('generate-policy-manually', body, null);
  }
  getSamaReportWithFilter(body, params): Observable<CommonResponse<SamaReportResult>> {
    return super.post<CommonResponse<SamaReportResult>>('sama-report-with-filter', body, params);

  }
  getAllPolicyWithFilter(body, params): Observable<CommonResponse<SuccessPolicies[]>> {
    return super.post<CommonResponse<SuccessPolicies[]>>('all-policies-with-filter', body, params);
  }
  cancelPolicy(id , isCancelled) :Observable<CommonResponse<Boolean>>
  {
    console.log("Log Cancel" + id , + isCancelled);
    return super.get('cancel-policy' , 'id='+ id + '&isCancelled=' + isCancelled );

  }
  downloadInvoiceFile(referenceId: string): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('download-invoice', `referenceId=${referenceId}`);
  }
  getIncomeReportWithFilter(body): Observable<CommonResponse<SamaReportResult>> {
    return super.post<CommonResponse<SamaReportResult>>('income-report-with-filter', body);
  }
  getPolicyStatusWithFilter(body, params): Observable<CommonResponse<PolicyListing[]>> {
    return super.post<CommonResponse<PolicyListing[]>>('policies-status-with-filter', body, params);
  }

 getUserDetailsBasedOnFilter(email:string,userId:string, mobile : string, sadadNo : string) {
   return super.get<CommonResponse<UserModel>>('getUserInfoByEmail', `email=${email}&userId=${userId}&mobile=${mobile}&sadadNo=${sadadNo}`);
  }

  DeleteUser(mobile: string) {
    return super.get<CommonResponse<boolean>>('deleteUser', `mobile=${mobile}`);
  }


  manageUserLock(userId:string, toLock:boolean,LockedReason:string) {
    return super.get<CommonResponse<boolean>>('manageUserLock',`userId=${userId}&toLock=${toLock}&LockedReason=${LockedReason}`);
  }

  regeneratePolicy(referenceId:string) {
    return super.get<CommonResponse<boolean>>('regeneratePolicy', `referenceId=${referenceId}`);
  }

  reSendPolicyByMail(email: string, policyNo: string, fileId: string, referenceId: string, langCode: number) {
    return super.get<CommonResponse<boolean>>('reSendPolicyByMail', `email=${email}&policyNo=${policyNo}&fileId=${fileId}&referenceId=${referenceId}&langCode=${langCode}`);
  }

  getPolicyDetailsBypolicyNo(policyNo): Observable<CommonResponse<SuccessPolicies>> {
    return super.get<CommonResponse<SuccessPolicies>>('policy-detailsByPolicyNo', `policyNo=${policyNo}`);
  }

  reUploadPolicyTemplate(body) {
    return super.post<CommonResponse<GeneratePolicyRes>>('reUploadPolicyFile', body);
  }

  UpdateUserEmail(email: string, userId: string,phoneNumber:string) {
    return super.get<CommonResponse<GeneratePolicyRes>>('updateuserMail', `email=${email}&userId=${userId}&phoneNumber=${phoneNumber}`);
  }

  getAllNajmStatus() {
    return super.get<CommonResponse<NajmStatus[]>>('all-najm-status');
  }

  exportSuccessPoliciesInfoAsExcel(body, lang: string) {
    return super.post<CommonResponse<string>>('success-policiesInfo-excel', body, `lang=${lang}`);
  }
  getSuccessPoliciesInfoWithFilter(body, params): Observable<CommonResponse<PoliciesInfoListingModel[]>> {
    return super.post<CommonResponse<PoliciesInfoListingModel[]>>('success-policiesInfo-with-filter', body, params);
  }

  getSamaReporPagetWithFilter(body, params): Observable<CommonResponse<SamaReportListing[]>> {
    return super.post<CommonResponse<SamaReportListing[]>>('sama-report-policies-with-filter', body, params);
  }

  exportSamaReportExcel(body, lang: string) {
    return super.post<CommonResponse<string>>('sama-report-policies-excel', body, `lang=${lang}`);
  }

  SamaStatisticsReport(body, params): Observable<samaResponseModel> {
    return super.post<samaResponseModel>('SamaStatisticsReport', body, params);
  }

  SamaStatisticsExcelReport(body, params): Observable<samaResponseModel> {
    return super.post<samaResponseModel>('SamaStatisticsExcelReport', body, params);
  }
  renewalpolicies(body, params): Observable<CommonResponse<outputsModel>> {
    return super.post<CommonResponse<outputsModel>>('all-renewals-with-filter', body, params);
  }
  najmResponsepolicies(body,params): Observable<CommonResponse<najmPolicyResponseOutput>> {
    return super.post<CommonResponse<najmPolicyResponseOutput>>('getPolicyNajmResponseTime', body,params);
  };

  policiesNotifications(body,params): Observable<CommonResponse<policyNotificationResponseOutput>> {
     return super.post<CommonResponse<policyNotificationResponseOutput>>('getPolicyNotificationResponse',body,params);
   }

   getRenewalDiscountsWithFilter(body, params) : Observable<CommonResponse<RenewalDiscountModel[]>> {
    return super.post<CommonResponse<RenewalDiscountModel[]>>('renewal-discount-filter', body, params)
  }
  GetAllRenewalPhoneNumberWithFilter(body, params) : Observable<CommonResponse<StopSMSModel[]>> {
    return super.post<CommonResponse<StopSMSModel[]>>('renewal-stopsms-filter', body, params)
  }

  addNewRenewalDiscount(body): Observable<CommonResponse<boolean>> {
    return super.post<CommonResponse<boolean>>('renewal-discount-addNew', body);
  }
  AddNewRenewalStopPhone(mobilePhone:string): Observable<CommonResponse<boolean>> {
    return super.get<CommonResponse<boolean>>('renewal-stopsms-addNew', `mobilePhone=${mobilePhone}`);
  }

  manageRenewalDiscountActivation(body) {
    return super.post<CommonResponse<boolean>>('renewal-discount-activation', body);
  }

  deleteRenewalDiscount(body) {
    return super.post<CommonResponse<boolean>>('renewal-discount-delete', body);
  }


  getDriversData(body,params): Observable<DriverFilterResponseModel[]> {
    return super.post<DriverFilterResponseModel[]>('getVehiclePoliciesListWithFilterForAddDriver', body, params);
  }
  addDriverToPolicy(body): Observable<any[]> {
    return super.post<any[]>('adddriver', body);
  }
  pursheseDriverToPolicy(body): Observable<any[]> {
    return super.post<any[]>('purchaseDriver', body);
  }
  DeleteRenewalStopPhone(body) {
    return super.post<CommonResponse<boolean>>('renewal-stopsms-delete', body);
  }


  getBenefitData(body, params): Observable<benfitResponseModel[]> {
    return super.post<benfitResponseModel[]>('getVehiclePoliciesListWithFilterForAddBenefits', body, params);
  }
  addBenefit(body): Observable<CommonResponse<additionalBenfitsResponseModel>> {
    return super.post<CommonResponse<additionalBenfitsResponseModel>>('addBenefit', body);
  }
  purshedBenefit(body): Observable<additionalBenfitsResponseModel[]> {
    return super.post<additionalBenfitsResponseModel[]>('purchaseBenefit', body);
  }

  getFilterClaims(body, params): Observable<customModel[]> {
    return super.post<customModel[]>('getVehiclePolicyWithFilterForClaim', body, params);
  }
  SendClaims(body, params): Observable<claimsResponseModel[]> {
    return super.post<claimsResponseModel[]>('sendClaimRegistration', body, params);
  }
  sendClaimNotification(body, params): Observable<notificationResponseModel> {
    return super.post<notificationResponseModel>('sendClaimNotification', body, params);
  }

  getComprehinsivePolicyWithFilter(body, params): Observable<CommonResponse<PolicyListing[]>> {
    return super.post<CommonResponse<PolicyListing[]>>('comprehinsive-policies-with-filter', body, params);
  }
  getPolicyDetails(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('checkoutDetails', body);
  }


  getRenewalDataWithFilter(body) : Observable<CommonResponse<policyFilterOutPut>> {
    return super.post<CommonResponse<policyFilterOutPut>>('renewal-message-filter', body)
  }

  sendRenewalMessage(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('renewal-message-send', body);
  }

  getDiscountsType(): Observable<CommonResponse<any>> {
    return super.get<CommonResponse<any>>('GetDiscountType');
  }

  getOwnDamagePolicy(body): Observable<CommonResponse<any>> {
    return super.post<CommonResponse<any>>('OwnDamage', body);
  }

  sendOwnDamageMessage(body) {
    return super.post<CommonResponse<string>>('own-damage', body);
  }

  getBcareWithdrawalWithFilter(body) : Observable<CommonResponse<WithdrawalListingModel[]>> {
    return super.post<CommonResponse<WithdrawalListingModel[]>>('bcare-withdrawal-filter', body)
  }

  getCompitionStatistics(lang: string): Observable<CommonResponse<WithdrawalStatisticsModel>> {
    return super.post<CommonResponse<WithdrawalStatisticsModel>>('get-withdrawal-statistics', null, `lang=${lang}`);
  }

  getPolicyFromQueueWithFilter(body): Observable<OutputModel> {
    return super.post<OutputModel>('processing-queue', body);
  }

  getRepeatedPoliciesWithFilter(body): Observable<CommonResponse<OutPutResult>> {
    return super.post<CommonResponse<OutPutResult>>('check-all-repeated-policies-with-filter', body);
  }

  getDriverOverFivePolicies(body) {
    return super.post<CommonResponse<OutPutData>>('GetClientsWithOverFivePolicy', body);
  }

  manageMobileVerification(body): Observable<CommonResponse<boolean>> {
    return super.post<CommonResponse<boolean>>('manageUserMobileVerification', body);
  }
}
