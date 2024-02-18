import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { CommonResponse, IIdNamePairModel, Address } from '../models';
import { Observable, of, Subject } from '../../../../node_modules/rxjs';
import { ICity } from '../models/city.model';
import { LocalizationService } from './localization.service';
import { concatMap, map, flatMap, tap } from '../../../../node_modules/rxjs/operators';
import { Region } from '../models/region.model';

@Injectable()
export class AddressService extends ApiService {

  private cities: ICity[] = [];
  private regions: Region[] = [];

  citiesIdNamePair = new Subject<CommonResponse<IIdNamePairModel[]>>();
  regionsIdNamePair = new Subject<CommonResponse<IIdNamePairModel[]>>();


  constructor(private _injector: Injector) {
    super(_injector);
    this.apiUrl = environment.inquiryUrl;
  }


  getAllCitiyIdNamePair(language = ''): Observable<CommonResponse<IIdNamePairModel[]>> {
    let observe = super.get<CommonResponse<ICity[]>>('Address/all-cities');
    var dd =observe.pipe(
      map(e => {
        this.cities = e.data;
        let result = new CommonResponse<IIdNamePairModel[]>();
        result.data = this.createCitiesPair();
        result.totalCount = result.data.length;
        return result;
      }))

    return dd;
  }

  getAllRegionIdNamePair(): Observable<CommonResponse<IIdNamePairModel[]>> {
    let observe = super.get<CommonResponse<Region[]>>('Address/all-regions');
    var dd =observe.pipe(
      map(e => {
        this.regions = e.data;
        let result = new CommonResponse<IIdNamePairModel[]>();
        result.data = this.createRegionsPair();
        result.totalCount = result.data.length;
        return result;
      }))

    return dd;
  }

  private createCitiesPair(): IIdNamePairModel[] {
    let lang = this._localizationService.getCurrentLanguage().twoLetterIsoCode;

    let citiesPairs: IIdNamePairModel[] = [];
    for (let i = 0; i < this.cities.length; i++) {
      const city = this.cities[i];
      citiesPairs.push({ id: city.code, name: lang == 'ar' ? city.arabicDescription : city.englishDescription });
    }
    return citiesPairs;
  }

  private createRegionsPair(): IIdNamePairModel[] {
    let RegionPairs: IIdNamePairModel[] = [];
    for (let i = 0; i < this.regions.length; i++) {
      const region = this.regions[i];
      RegionPairs.push({ id: region.id, name: region.name });
    }
    return RegionPairs;
  }

  /**
 * Get all cities
 */
  private getAllCities(): Observable<CommonResponse<ICity[]>> {
    //return cached cities if they was loaded before
    if (this.cities.length) {
      let result = new CommonResponse<ICity[]>();
      result.data = this.cities;
      result.totalCount = this.cities.length;
      return of<CommonResponse<ICity[]>>(result);
    }
    let observe = super.get<CommonResponse<ICity[]>>('inquiry/all-cities');
    observe.subscribe((data: CommonResponse<ICity[]>) => {
      this.cities = data.data;
    }, (error: any) => { }
    );
    return observe;
  }

}
