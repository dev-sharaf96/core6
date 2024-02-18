import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IIdNamePairModel, VehicleService, CommonResponse } from '../../core';

@Component({
  selector: 'app-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.css']
})
export class BodyTypeComponent implements OnInit {
  @Input() selectedValue: number;
  @Output() selectedValueChange = new EventEmitter();
  bodyTypes: IIdNamePairModel[] = [];
  constructor(private _vehicleServices: VehicleService) { }

  ngOnInit() {
    this._vehicleServices.getVehicleBodyTypes(0, Number.MAX_SAFE_INTEGER).subscribe(
      (data: CommonResponse<IIdNamePairModel[]>) => {
        this.bodyTypes = data.data;
      }
    );
  }
  changed() {
    this.selectedValueChange.emit(this.selectedValue);
  }

}
