import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IIdNamePairModel, LocalizationService, CommonResponse, CheckoutsService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-channels-dropdown',
  templateUrl: './channels-dropdown.component.html',
  styleUrls: ['./channels-dropdown.component.css']
})
export class ChannelsDropdownComponent implements OnInit {

  @Input() selectedValue; 
  @Output() selectedValueChange = new EventEmitter();
  channels: IIdNamePairModel[];
  channel: IIdNamePairModel = new IIdNamePairModel();
  constructor(private _checkoutsService: CheckoutsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    this._checkoutsService.getChannels().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.channels = [];
      this.channels = data.data;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      ? this.channels.unshift({id: null, name: 'all'})
      : this.channels.unshift({id: null, name: 'الكل'});
      this.channel = this.channels.find((c) => c.id === this.selectedValue);
    },
    (error: any) => {
      if (error.errors) {
        error.errors.forEach(item => {
          this._toastrService.error(item.code, item.description);
        });
      }
    });
  }
  changed() {
    this.selectedValue = this.channel.id;
    this.selectedValueChange.emit(this.selectedValue);
  }

}
