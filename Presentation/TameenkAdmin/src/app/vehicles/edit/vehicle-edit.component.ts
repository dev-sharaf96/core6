import { Component, OnInit } from '@angular/core';
import {
  CommonResponse,
  LocalizationService,
  InsuranceCompanyService,
  VehicleService,
  IIdNamePairModel } from 'src/app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from '../vehicles-model';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  isEn: boolean;
  vehicleMakers: IIdNamePairModel[];
  vehicleModels: IIdNamePairModel[];
  vehicleModelyears: IIdNamePairModel[] = [];
  vehicleModelyear = new IIdNamePairModel();
  maker = new IIdNamePairModel();
  model = new IIdNamePairModel();
  vehicleBreakingSystems: IIdNamePairModel[];
  breakingSystem = new IIdNamePairModel();
  vehicleSensors: IIdNamePairModel[];
  sensor = new IIdNamePairModel();
  vehicleCameraTypes: IIdNamePairModel[];
  cameraType = new IIdNamePairModel();
  vehicleColors: IIdNamePairModel[];
  color = new IIdNamePairModel();
  hijriMonthsAr = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادي الأول',
    'جمادي الثاني',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة'
  ];
  hijriMonthsEn = [
    'Muharram',
    'Safar',
    'Rabi’ al-awal',
    'Rabi’ al-thani',
    'Jumada al-awal',
    'Jumada al-thani',
    'Rajab',
    'Sha’aban',
    'Ramadan',
    'Shawwal',
    'Duh al-Qidah',
    'Duh al-Hijjah'
  ];

  hijrimonths: any = this._localizationService.getCurrentLanguage().id === 1
  ? this.hijriMonthsAr
  : this.hijriMonthsEn;
  years: number[] = [];
  months: any[] = [];
  dayes = Array.from(Array(31).keys());
  currentYear: number = new Date().getFullYear();
  minYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 50;
  maxYears: number = Math.round((this.currentYear - 622) * (33 / 32)) + 50;
  expiryDayValue;
  expiryMonthValue;
  expiryYearValue;
  expiryDate;
  modelyears: number[] = [];
  constructor(
    private _insuranceCompanyService: InsuranceCompanyService,
    private _vehicleService: VehicleService,
    private _router: Router,
    private route: ActivatedRoute,
    private _localizationService: LocalizationService, private _toastrService: ToastrService) { }
  ngOnInit() {
    this.isEn = this._localizationService.getCurrentLanguage().id === 2;
    const id = this.route.snapshot.paramMap.get('id');
    this.modelyears = this.generateYears(this.currentYear - 50, this.currentYear);
    this.modelyears.forEach((year, i) => {
      this.vehicleModelyears.push({ id: year, name: year.toString() });
    });
    this.dayes.shift();
        this.months = [];
        this.hijrimonths.forEach((month, i) => {
        this.months.push({ id: i + 1, name: i + 1 + ' - ' + month });
        });
        this.years = this.generateYears(this.minYears, this.maxYears);
    this._insuranceCompanyService.getVehicleDetails(id).subscribe(vehicle => {
      this.vehicle = vehicle.data;

      if (!this.vehicle.brakeSystemId || this.vehicle.brakeSystemId < 1) {
        this.vehicle.brakeSystemId = 0;
      }
      if (!this.vehicle.cruiseControlTypeId || this.vehicle.cruiseControlTypeId < 1) {
        this.vehicle.cruiseControlTypeId = 0;
      }
      if (!this.vehicle.parkingSensorId || this.vehicle.parkingSensorId < 1) {
        this.vehicle.parkingSensorId = 0;
      }
      if (!this.vehicle.cameraTypeId || this.vehicle.cameraTypeId < 1) {
        this.vehicle.cameraTypeId = 0;
      }

      if (this.vehicle.licenseExpiryDate != undefined && this.vehicle.licenseExpiryDate != null) {
        this.expiryDate = this.vehicle.licenseExpiryDate.split('-');
        this.expiryDayValue = this.expiryDate[0];
        this.expiryMonthValue = parseInt(this.expiryDate[1], 10);
        this.expiryYearValue = this.expiryDate[2];
      }

      this.vehicleModelyear = this.vehicleModelyears.find((year) => year.id === this.vehicle.modelYear);
      this._vehicleService.getVehicleMakers().subscribe(makers => {
        this.vehicleMakers = makers.data;
        this.maker = this.vehicleMakers.find((maker) => maker.id === this.vehicle.vehicleMakerCode);
        this.getVehicleMakerModels(this.vehicle.vehicleMakerCode);
      });
      this.getVehicleBreakingSystem();
      this.getVehicleSensor();
      this.getVehicleCameraType();
      this.getVehicleColors();

    }, (error) => error);
  }

  getVehicleBreakingSystem() {
    this._insuranceCompanyService.getVehicleBreakingSystem().subscribe(data => {
      this.vehicleBreakingSystems = data.data;
      (this.isEn) ? this.vehicleBreakingSystems.unshift({ id: 0, name: 'All' })
                  : this.vehicleBreakingSystems.unshift({ id: 0, name: 'الكل' });
      this.breakingSystem = this.vehicleBreakingSystems.find((model) => model.id === this.vehicle.brakeSystemId);
    });
  }

  getVehicleSensor() {
    this._insuranceCompanyService.getVehicleSensor().subscribe(data => {
      this.vehicleSensors = data.data;
      (this.isEn) ? this.vehicleSensors.unshift({ id: 0, name: 'All' })
                  : this.vehicleSensors.unshift({ id: 0, name: 'الكل' });
      this.sensor = this.vehicleSensors.find((model) => model.id === this.vehicle.parkingSensorId);
    });
  }

  getVehicleCameraType() {
    this._insuranceCompanyService.getVehicleCameraType().subscribe(data => {
      this.vehicleCameraTypes = data.data;
      (this.isEn) ? this.vehicleCameraTypes.unshift({ id: 0, name: 'All' })
                  : this.vehicleCameraTypes.unshift({ id: 0, name: 'الكل' });
      this.cameraType = this.vehicleCameraTypes.find((model) => model.id === this.vehicle.cameraTypeId);
    });
  }

  getVehicleColors() {
    this._insuranceCompanyService.getVehicleColors().subscribe(data => {
      this.vehicleColors = data.data;
      (this.isEn) ? this.vehicleColors.unshift({ id: 0, name: 'All' })
                  : this.vehicleColors.unshift({ id: 0, name: 'الكل' });
      this.color = this.vehicleColors.find((model) => model.name === this.vehicle.majorColor);
    });
  }

  changeBreakingSystemId() {
    this.vehicle.brakeSystemId = this.breakingSystem.id;
    this.breakingSystem = this.vehicleBreakingSystems.find((model) => model.id === this.vehicle.brakeSystemId);
  }

  changeParkingSensorId() {
    this.vehicle.parkingSensorId = this.sensor.id;
    this.sensor = this.vehicleSensors.find((model) => model.id === this.vehicle.parkingSensorId);
  }

  changeCameraTypeId() {
    this.vehicle.cameraTypeId = this.cameraType.id;
    this.cameraType = this.vehicleCameraTypes.find((model) => model.id === this.vehicle.cameraTypeId);
  }

  changeVehicleColor() {
    this.vehicle.majorColor = this.color.name;
    this.color = this.vehicleColors.find((model) => model.name === this.vehicle.majorColor);
  }

  onSubmit(form) {
    if (form.valid) {
      this._insuranceCompanyService.editVehicle(this.vehicle).subscribe(data => {
        this._router.navigate(['/admin/vehicles']);
      }, (error: any) => {
        if (error.errors) {
          error.errors.forEach(item => {
            this._toastrService.error(item.description, item.code);
          });
        }
      });
    }
  }


  getVehicleMakerModels(makerId) {
    this._vehicleService.getVehicleMakerModels(makerId).subscribe(data => {
      this.vehicleModels = data.data;
      this.model = this.vehicleModels.find((model) => model.id === this.vehicle.vehicleModelCode);
    });
  }
  generateYears(min, max) {
    const years = [];
    for (let i = min; i <= max; i++) {
      years.push(i);
    }
    return years;
  }
  changeMakerCode() {
    this.vehicle.vehicleMakerCode = this.maker.id;
    this.vehicle.vehicleMaker = this.maker.name;
    this.getVehicleMakerModels(this.vehicle.vehicleMakerCode);
  }
  changeModelCode() {
    this.vehicle.vehicleModelCode = this.model.id;
    this.vehicle.model = this.model.name;
  }
  changeModelYear() {
    this.vehicle.modelYear = this.vehicleModelyear.id;

  }
  getHijri() {
    if (this.expiryDayValue && this.expiryMonthValue && this.expiryYearValue) {
        this.vehicle.licenseExpiryDate = `${this.expiryDayValue}-${this.expiryMonthValue}-${this.expiryYearValue}`;
    }
  }
}
