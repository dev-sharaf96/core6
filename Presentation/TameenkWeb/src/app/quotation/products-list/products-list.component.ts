import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from 'src/app/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnChanges {
  @Input() products: IProduct[];
  @Input() quotationRequestId;
  @Input() isDone;
  @Input() recalled;
  @Input() companyInfo;
  @Output() getCompany = new EventEmitter();
  comparProducts = [];
  getCheckout = false;
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recalled']) {
      if (changes['recalled'].currentValue === true) {
        this.comparProducts = [];
      }
    }
  }
  sendCompanyId(e) {
    this.getCompany.emit(e);
  }
  productsComparison(e) {
    this.comparProducts = this.comparProducts.concat(e);
  }
  deleteProduct(e) {
    this.comparProducts = this.comparProducts.filter(obj => {
      return obj.id !== e.id;
    });
  }
}
