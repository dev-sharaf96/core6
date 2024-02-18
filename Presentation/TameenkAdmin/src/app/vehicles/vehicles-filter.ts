export class VehiclesFilter {
  chassisNumber: string;
  sequenceNumber: string;
  customCardNumber: string;
  vehicleModelCode: number;
  vehicleMakerCode: number;
  carPlateNumber: number;
    constructor(
      chassisNumber?: string,
      sequenceNumber?: string,
      customCardNumber?: string,
      vehicleModelCode?: number,
      vehicleMakerCode?: number,
      carPlateNumber?: number
    ) {
      this.chassisNumber = chassisNumber || '';
      this.sequenceNumber = sequenceNumber || '';
      this.customCardNumber = customCardNumber || '';
      this.vehicleModelCode = vehicleModelCode || null;
      this.vehicleMakerCode = vehicleMakerCode || null;
      this.carPlateNumber = carPlateNumber || null;
    }
}
