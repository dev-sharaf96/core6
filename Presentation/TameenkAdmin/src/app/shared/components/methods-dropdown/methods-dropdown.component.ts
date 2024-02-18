import { CommonResponse, IIdNamePairModel, LocalizationService } from '../../../core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { RequestsService } from '../../../core/services/requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-methods-dropdown',
  templateUrl: './methods-dropdown.component.html',
  styleUrls: ['./methods-dropdown.component.css']
})
export class MethodsDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Input() serviceType = '';
  @Output() selectedValueChange = new EventEmitter();
  methods: IIdNamePairModel[];
  method: IIdNamePairModel = new IIdNamePairModel();
  constructor(private _requestsService: RequestsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    var getMethods = new Observable<CommonResponse<string[]>>();
    if (this.serviceType == ''){
      getMethods = this._requestsService.getRequestMethods();
    } else if (this.serviceType === 'sms') {
      getMethods = this._requestsService.getSMSLogMethods();
    } else if (this.serviceType === 'checkoutRequestLogMethods') {
      getMethods = this._requestsService.getCheckoutRequestLogMethods();
    } 
    else {
      getMethods = this._requestsService.getRequestMethodsNew();
    }
    getMethods.subscribe((data: CommonResponse<string[]>) => {
      this.methods = [];
      // this.methods = data.data;
      if (this.serviceType == '' || this.serviceType == 'sms' || 'checkoutRequestLogMethods') {
        this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
          ? this.methods.unshift({ id: null, name: 'all' })
          : this.methods.unshift({ id: null, name: 'الكل' });
      }

      data.data.forEach(d => {
        this.methods.push({ id: d, name: d });
      });

      this.method = this.methods.find((c) => c.id === this.selectedValue);
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
    this.selectedValue = this.method.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
