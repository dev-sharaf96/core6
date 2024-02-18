import { errors } from "./errors";

export class CarInfo {
  Success: boolean;
  Error: errors;
  IsRegistered: boolean;
  Cylinders: number;
  LicenseExpiryDate: Date;
  LogId: number;
  MajorColor: string;
  MinorColor: string;
  ModelYear: number;
  PlateTypeCode: number;
  RegisterationPlace: string;
  BodyCode: number;
  Weight: number;
  Load: number;
  MakerCode: number;
  ModelCode: number;
  Maker: number;
  Model: number;
  ChassisNumber: number;
    constructor(
      Success?: boolean,
  Error?: errors,
  IsRegistered?: boolean,
  Cylinders?: number,
  LicenseExpiryDate?: Date,
  LogId?: number,
  MajorColor?: string,
  MinorColor?: string,
  ModelYear?: number,
  PlateTypeCode?: number,
  RegisterationPlace?: string,
  BodyCode?: number,
  Weight?: number,
  Load?: number,
  MakerCode?: number,
  ModelCode?: number,
  Maker?: number,
  Model?: number,
  ChassisNumber?: number
    ) {
      this.Success = Success || null;
      this.Error = Error || null;
      this.IsRegistered = IsRegistered || null;
      this.Cylinders = Cylinders || null;
      this.LicenseExpiryDate = LicenseExpiryDate || null;
      this.RegisterationPlace = RegisterationPlace || null;
      this.LogId = LogId || null;
      this.MajorColor = MajorColor || null;
      this.MinorColor = MinorColor || null;
      this.ModelYear = ModelYear || null;
      this.PlateTypeCode = PlateTypeCode || null;
      this.BodyCode = BodyCode || null;
      this.Weight = Weight || null;
      this.Load = Load || null;
      this.MakerCode = MakerCode || null;
      this.Maker = Maker || null;
      this.Model = Model || null;
      this.ModelCode = ModelCode || null;
      this.ChassisNumber = ChassisNumber || null;
    }
  }



