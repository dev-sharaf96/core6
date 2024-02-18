import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IIdNamePairModel, LocalizationService, CommonResponse } from '../../../core';
import { TicketServiceService } from '../../../core/services/ticket-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket-type-dropdown',
  templateUrl: './ticket-type-dropdown.component.html',
  styleUrls: ['./ticket-type-dropdown.component.css']
})
export class TicketTypeDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  types: IIdNamePairModel[];
  type: IIdNamePairModel = new IIdNamePairModel();
  currentlang: string;
  constructor(private _ticketService: TicketServiceService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.currentlang = (this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en') ? 'en' : 'ar';
    this._ticketService.getTicketType(this.currentlang).subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.types = [];
      this.types = data.data;
      this.currentlang === 'en' ? this.types.unshift({id: null, name: 'all'}) : this.types.unshift({id: null, name: 'الكل'});
      this.type = this.types.find((c) => c.id === this.selectedValue);
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
    this.selectedValue = this.type.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
