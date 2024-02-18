import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalizationService, IIdNamePairModel } from 'src/app/core';

@Component({
  selector: 'app-status-dropdown',
  templateUrl: './status-dropdown.component.html',
  styleUrls: ['./status-dropdown.component.css']
})
export class StatusDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  status: IIdNamePairModel[];
  stat: IIdNamePairModel = new IIdNamePairModel();
  statusAr: IIdNamePairModel[] = [
    {id: null, name: 'الكل'},
    {id: 1, name: 'ناجحة'},
    {id: 2, name: 'غير ناجحة'},
  ];
  statusEn: IIdNamePairModel[] = [
    {id: null, name: 'All'},
    {id: 1, name: 'Success'},
    {id: 2, name: 'Fail'},
  ];
  constructor(private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.status = this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en' ?
    this.statusEn :
    this.statusAr;
  }
  changed() {
    this.selectedValue = this.stat.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
