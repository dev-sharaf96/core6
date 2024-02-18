import { Component, OnInit, Input } from '@angular/core';
import { CheckoutResponse, LocalizationService } from 'src/app/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
@Input() checkoutDetails: CheckoutResponse;
isEnglish: boolean;
  constructor(private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().id === 2;
  }

}
