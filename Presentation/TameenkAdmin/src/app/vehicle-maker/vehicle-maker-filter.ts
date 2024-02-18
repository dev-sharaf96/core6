export class VehicleMakerFilter {
  makerCode: string;
  makerDescription: string;
  constructor(
    makerCode?: string,
    makerDescription?: string,
  ) {
    this.makerCode = makerCode || '';
    this.makerDescription = makerDescription || '';
  }
}
