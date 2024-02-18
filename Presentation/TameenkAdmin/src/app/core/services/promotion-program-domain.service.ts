import { PromotionProgramDomain } from '../models/promotion-program-domain.model';
import { Injectable , Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { CommonResponse } from 'src/app/core';



@Injectable({
  providedIn: 'root'
})
export class PromotionProgramDomainService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);

    this.apiUrl = environment.promotionProgramDomainUrl + 'PromotionDomian/';
  }

  addPromotionDomain(body) {
    return super.post('add', body);
  }

  editPromotionDomain(body)
  {
    return super.post('updatePromotionDomain', body);

  }

  getPromotionDomainById(body)
  {

    return super.get<CommonResponse<PromotionProgramDomain>>('details','id='+ body);

  }
  getAllPromotionDomains()
  {
    return super.get<CommonResponse<PromotionProgramDomain[]>>('promotion-Domain');
  }
  getAllPromotionDomainsByProgramId(body)
  {
    return super.get<CommonResponse<PromotionProgramDomain[]>>('promotionDomainsByProgramId', 'id='+ body);

  }
  changeDomainStatus(id , status)
  {
    return super.get<CommonResponse<PromotionProgramDomain[]>>('changeStatus', 'id='+ id +"&status=" + status);

  }
}
