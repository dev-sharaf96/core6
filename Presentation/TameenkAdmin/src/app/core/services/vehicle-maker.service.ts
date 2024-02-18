import { Injectable, Injector } from '@angular/core';

import { ApiService } from './api.service';
import { CommonResponse } from '..';
import { GeneratePolicyRes } from '../../policies/generate/generate-policy';
import { Observable } from 'rxjs';
import { VehicleMakerModel } from '../../vehicle-maker/vehicle-maker-model';
import { VehicleMakerModels } from '../../vehicle-maker/vehicle-maker-models';
import { environment } from '../../../environments/environment';

@Injectable()
export class VehicleMakerService extends ApiService {

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl + 'vehicle/';
  }

  getVehicleMakersWithFilter(code, desc, pageIndex, pageSize)
                : Observable<CommonResponse<VehicleMakerModel[]>> {
    return super.get<CommonResponse<VehicleMakerModel[]>>('vehicle-makers-filter', `code=${code}&description=${desc}
                                                                      &pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getVehicleMakresExcel(code, desc): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('vehicle-makers-excel', `code=${code}&description=${desc}`);
  }

  getVehicleMakerDetails(id: number): Observable<CommonResponse<VehicleMakerModel>> {
    return super.get<CommonResponse<VehicleMakerModel>>('vehicle-makers-details', `id=${id}`);
  }

  getMakerModels(code, pageIndex, pageSize)
                : Observable<CommonResponse<VehicleMakerModels[]>> {
    return super.get<CommonResponse<VehicleMakerModels[]>>('vehicle-maker-models', `code=${code}
                                          &pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  addOrupdateMakerModel(body, params): Observable<CommonResponse<GeneratePolicyRes>> {
    return super.post<CommonResponse<GeneratePolicyRes>>('vehicle-makers-addOrUpdateModel', body, params);
  }

  getVehicleMakerModelDetails(code: number, makerCode: number): Observable<CommonResponse<VehicleMakerModels>> {
    return super.get<CommonResponse<VehicleMakerModels>>('vehicle-makermodel-details', `code=${code}&makerCode=${makerCode}`);
  }

  addNewMaker(body): Observable<CommonResponse<GeneratePolicyRes>> {
    return super.post<CommonResponse<GeneratePolicyRes>>('vehicle-makers-addNewMaker', body);
  }

  getMakerModelsWithFilter(code, makerCode, desc, pageIndex, pageSize)
                : Observable<CommonResponse<VehicleMakerModels[]>> {
    return super.get<CommonResponse<VehicleMakerModels[]>>('vehicle-maker-models-filter', `code=${code}&makerCode=${makerCode}&description=${desc}
                                                                      &pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getVehicleMakerModelsExcel(code, makerCode, desc): Observable<CommonResponse<string>> {
    return super.get<CommonResponse<string>>('vehicle-makerModels-excel', `code=${code}&makerCode=${makerCode}&description=${desc}`);
  }

  checkMakerCode(body): Observable<CommonResponse<boolean>> {
    return super.post<CommonResponse<boolean>>('vehicle-makers-checkMakerCode', body);
  }

  checkMakerModeCode(body): Observable<CommonResponse<boolean>> {
    return super.post<CommonResponse<boolean>>('vehicle-makers-checkMakerModelCode', body);
  }
  getVehcileOwnerShip(body) {
    return super.post<CommonResponse<any>>('ownerShip', body);
  }

}
