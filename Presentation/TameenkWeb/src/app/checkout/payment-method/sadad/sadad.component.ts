import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core';

@Component({
  selector: 'app-sadad',
  templateUrl: './sadad.component.html',
  styleUrls: ['./sadad.component.css']
})
export class SadadComponent implements OnInit {
  SadadData: any;
  constructor(private _paymentService: PaymentService) { }

  ngOnInit() {
    this.SadadData = this._paymentService.SadadData;
  }

}
