import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InquiryService, LocalizationService, InquiryWorkflowService, InitInquiryResponseModel } from 'src/app/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  @Output() nextStep = new EventEmitter();
  @Output() prevStep = new EventEmitter();
  inquiryModel: InitInquiryResponseModel;

  brakingSystems;
  cruiseControlTypes;
  parkingSensors;
  cameraTypes;
  transimissionTypes;
  parkingLocations;

  years: any[] = [];
  currentYear: number = new Date().getFullYear();

  constructor(
    private _inquiryService: InquiryService,
    private _inquiryWorkflowService: InquiryWorkflowService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.inquiryModel = this._inquiryWorkflowService.inquiry;
    this.generateYears(1900, this.currentYear + 1);

    this._inquiryService.getTransimissionTypes().subscribe(data => (this.transimissionTypes = data.data),(error: any) => error);
    this._inquiryService.getParkingLocations().subscribe(data => (this.parkingLocations = data.data),(error: any) => error);
    this._inquiryService.getBrakingSystems().subscribe(data => (this.brakingSystems = data.data),(error: any) => error);
    this._inquiryService.getCruiseControlTypes().subscribe(data => (this.cruiseControlTypes = data.data),(error: any) => error);
    this._inquiryService.getParkingSensors().subscribe(data => (this.parkingSensors = data.data),(error: any) => error);
    this._inquiryService.getCameraTypes().subscribe(data => (this.cameraTypes = data.data),(error: any) => error);
  }

  generateYears(min, max) {
    this.years = [];
    for (let i = min; i <= max; i++) {
      this.years.push(i);
    }
  }

  next(form: any) {
    // if form is valid
    if (form.valid) {
      this.nextStep.emit();
    }
  }
  prev() {
    this.prevStep.emit();
  }
}