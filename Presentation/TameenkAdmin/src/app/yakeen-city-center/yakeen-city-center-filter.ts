export class YakeenCityCenterFilter {
  cityId: number;
  cityName: string;
  zipCode: number;
  elmCode: number;
  constructor(
    cityId?: number,
    cityName?: string,
    zipCode?: number,
    elmCode?: number
  ) {
    this.cityId = cityId || 0;
    this.cityName = cityName || '';
    this.zipCode = zipCode || 0;
    this.elmCode = elmCode || 0;
  }
}
