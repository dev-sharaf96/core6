import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { CommonResponse, IIdNamePairModel } from '..';
import { DriversFilter } from 'src/app/drivers/drivers-filter';
import { Driver } from 'src/app/drivers/drivers-model';
import { Address } from 'src/app/core/models/Address.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { DriverAddresses } from '../models';

@Injectable()
export class DriverService extends ApiService {

  public driversFilter: DriversFilter = new DriversFilter();

  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.administrationUrl;

  }

  getDriversWithFilter(body, params) {
    return super.post<CommonResponse<Driver[]>>('driver/all', body, params);
  }

  UpdateDriver(body) {
    return super.post<CommonResponse<Driver[]>>('driver/editCity', body);
  }

  getDriversWithNIN(NIN) {
    let observe = super.get<CommonResponse<Driver[]>>(
      'driver/GetDriverWithNIN',
      `NIN=${NIN}`
    );
    return observe;
  }

  getDriverDetails(id) {
    return super.get<CommonResponse<Driver>>('driver/details', `id=${id}`);
  }

  getDriverWithAddresses(driverId) {
    return super.get<CommonResponse<DriverAddresses>>('driver/getDriverWithAddresses', `id=${driverId}`);
  }

  getDriverAddresses(driverId) {
    return super.get<CommonResponse<Address[]>>('driver/GetDriverAddress', `id=${driverId}`);
  }

  deleteDriverAddress(id) {
    return super.get<CommonResponse<boolean>>('Address/deleteDriverAddress', `id=${id}`);
  }

  getAddressDetails(id) {
    return super.get<CommonResponse<Address>>('Address/details', `id=${id}`);
  }

  updateDriverAddress(body) {
    return super.post<CommonResponse<Address[]>>('Address/editDriverAddress', body);
  }
  addDriverAddress(body) {
    return super.post<CommonResponse<Address[]>>('Address/addNewDriverAddress', body);
  }

  deleteDriversWithNIN(nin, lang) {
    return super.get<CommonResponse<boolean>>('driver/deleteDriverbyNin', `nin=${nin}&lang=${lang}`);
  }
}
