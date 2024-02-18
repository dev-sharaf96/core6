
import { CommonResponse } from 'src/app/core';
import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { PromotionProgramCode } from '../models/promotion-program-code.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionProgramCodeService  extends ApiService{


  constructor(private _injector: Injector) {
    super(_injector);

    this.apiUrl = environment.promotionProgramUrl + 'promotion-code/';
  }

  addPromotionCode(body) {
    return super.post('add', body);
  }

  editPromotionCode(body)
  {
    return super.put('edit', body);

  }

  getPromotionCodeById(body)
  {

    return super.get<CommonResponse<PromotionProgramCode>>('details','id='+ body);

  }
  getAllPromotionCode()
  {
    return super.get<CommonResponse<PromotionProgramCode[]>>('promotion-codes');
  }
  getAllPromotionCodeByProgramId(body)
  {
    return super.get<CommonResponse<PromotionProgramCode[]>>('promotionDetails' ,'programId='+ body );

  }
}
