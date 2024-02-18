import { Promotion } from './../models/promotion.model';
import { CommonResponse } from 'src/app/core';
import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PromotionDiscountSheetModel } from '../../promotion-program/upload-promotion-discount-sheet/promotion-discount-sheet-model';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { OutputModel } from '../models/output-model';
import { PromotionProgramNationaidsModel } from '../../promotion-program/promotion-program-nationalids/promotion-program-nationaids-model';
import { ApprovalListingModel } from 'src/app/promotion-program/promotion-program-approvals/approval-listing-model';


@Injectable({
  providedIn: 'root'
})
export class PromotionService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);

    this.apiUrl = environment.promotionUrl + 'promotions/';
  }

  addPromotion(body) {
    return super.post('add', body);
  }

  editPromotion(body)
  {
    return super.post('updatePromotion', body);

  }

  getPromotionById(body)
  {

    return super.get<CommonResponse<Promotion>>('details','id='+ body);

  }
  getAllPromotion()
  {
    return super.get<CommonResponse<Promotion[]>>('getAllPromotions');
  }
  changeStatus(id , status)
  {

    return super.get<CommonResponse<Promotion[]>>('changeStatus' , 'id=' + id + "&status=" + status );
  }

  getPromotionDiscountsWithFilter(body, params): Observable<CommonResponse<PromotionDiscountSheetModel[]>> {
    return super.post<CommonResponse<PromotionDiscountSheetModel[]>>('promotion-discouns-with-filter', body, params);
  }
  exportPromotionDiscountsExcel(body): Observable<CommonResponse<string>> {
    return super.post<CommonResponse<string>>('promotion-discouns-excel', body);
  }

  uploadDataFile(body): Observable<CommonResponse<OutputModel>> {
    return super.post<CommonResponse<OutputModel>>('promotion-discouns-upload', body);
  }

  deletePromotionDiscount(promotionDiscountId): Observable<CommonResponse<GeneratePolicyRes>> {
    return super.get<CommonResponse<GeneratePolicyRes>>('promotion-discoun-delete', `id=${promotionDiscountId}`);
  }

  getAllPromotionNationalIdsByProgramId(programId, pageIndex, pageSize) {
    return super.get<CommonResponse<PromotionProgramNationaidsModel[]>>('promotionNationalIdsByProgramId',
    `id=${programId}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  deleteNinFromPromotinProgram(id: number) {
    return super.get<CommonResponse<boolean>>('deleteNinFromPromotinProgram', `rowId=${id}`);
  }

  getAllApprovalsWithFilter(body, params): Observable<CommonResponse<ApprovalListingModel[]>> {
    return super.post<CommonResponse<ApprovalListingModel[]>>('all-approvals-with-filter', body, params);
  }

  approvePromotionApproval(body) {
    return super.post<CommonResponse<boolean>>('approvePromotionApproval', body);
  }

  deletePromotionApproval(body) {
    return super.post<CommonResponse<boolean>>('deletePromotionApproval', body);
  }

  getImage(params) {
    return super.get<CommonResponse<string>>('getImage', params);
  }

}
