import { Component, OnInit, Input } from '@angular/core';
import { QuotationService, IProduct } from 'src/app/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  @Input() qtRqstExtrnlId;
  product: IProduct;
  triesCount = 1;
  constructor(private _quotationService: QuotationService) { }

  ngOnInit() {
    const tries = setInterval(() => {
      if (this.triesCount < 3) {
        this.getLowestComprehensivePrice();
      } else {
        clearInterval(tries);
      }
      this.triesCount += 1;
    }, 3000);
    this.getLowestComprehensivePrice();
  }
  getLowestComprehensivePrice() {
    this._quotationService.getLowestProduct(this.qtRqstExtrnlId).subscribe(data => {
      this.product = data.data;
    }, (err) => err);
   }
}
