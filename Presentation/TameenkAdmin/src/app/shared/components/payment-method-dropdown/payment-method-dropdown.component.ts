import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IIdNamePairModel, LocalizationService, CommonResponse } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentsService } from 'src/app/core/services/payments.service';

@Component({
  selector: 'app-payment-method-dropdown',
  templateUrl: './payment-method-dropdown.component.html',
  styleUrls: ['./payment-method-dropdown.component.css']
})
export class PaymentMethodDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Output() selectedValueChange = new EventEmitter();
  methods: IIdNamePairModel[];
  method: IIdNamePairModel = new IIdNamePairModel();
  constructor(private _paymentsService: PaymentsService,
    private _toastrService: ToastrService,
    private _localizationService: LocalizationService) { }

  ngOnInit() {
    this._paymentsService.getPaymentMethods().subscribe((data: CommonResponse<IIdNamePairModel[]>) => {
      this.methods = [];
      this.methods = data.data;
      this._localizationService.getCurrentLanguage().twoLetterIsoCode === 'en'
      ? this.methods.unshift({id: null, name: 'all'})
      : this.methods.unshift({id: null, name: 'الكل'});
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
