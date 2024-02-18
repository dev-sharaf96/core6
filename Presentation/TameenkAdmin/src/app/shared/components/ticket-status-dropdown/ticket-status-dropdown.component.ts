import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IIdNamePairModel, LocalizationService, CommonResponse } from '../../../core';
import { ToastrService } from 'ngx-toastr';
import { TicketServiceService } from '../../../core/services/ticket-service.service';

@Component({
  selector: 'app-ticket-status-dropdown',
  templateUrl: './ticket-status-dropdown.component.html',
  styleUrls: ['./ticket-status-dropdown.component.css']
})
export class TicketStatusDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  allStatus: IIdNamePairModel[];
  status: IIdNamePairModel = new IIdNamePairModel();
  currentlang: string;
  constructor(private _ticketService: TicketServiceService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.currentlang = (this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en') ? 'en' : 'ar';
    this._ticketService.getTicketStatus(this.currentlang).subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.allStatus = [];
      this.allStatus = data.data;
      this.currentlang === 'en' ? this.allStatus.unshift({id: null, name: 'all'}) : this.allStatus.unshift({id: null, name: 'الكل'});
      this.status = this.allStatus.find((c) => c.id === this.selectedValue);
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
    this.selectedValue = this.status.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
