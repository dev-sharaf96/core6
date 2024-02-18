import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input() insuranceTypeCode;
  @Input() vehicleAgencyRepair;
  @Input() deductibleValue;
  @Output() changeInsuranceType = new EventEmitter();
  @Output() changeRepairType = new EventEmitter();
  @Output() changeDeductibleValue = new EventEmitter();
  @Output() changeProductsSorting = new EventEmitter();
  ProductsSortingAsc;
  activeSorting = false;
  constructor() {}

  ngOnInit() {
    $('.select-list li').click(function () {
      $($(this).data('tohide')).removeClass('active');
      $(this).addClass('active').siblings().removeClass('active');
    });
  }

  submitInsuranceType(typeOfInsurance = null) {
    this.changeInsuranceType.emit(typeOfInsurance);
  }

  submitVehicleAgencyRepair(v) {
    this.changeRepairType.emit(v);
  }

  submitDeductibleValue(deductibleValue) {
    this.changeDeductibleValue.emit(parseInt(deductibleValue, 10));
  }

  submitProductsSorting(e) {
    this.changeProductsSorting.emit(e);
    this.ProductsSortingAsc = e ? true : false;
  }
}
