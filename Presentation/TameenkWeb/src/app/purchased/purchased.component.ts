import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchasedService } from '../core/services/purchased.service';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit {

  referenceId: string;
  data: any;
  constructor(private route: ActivatedRoute, private purchasedService: PurchasedService) { }

  ngOnInit() {
    this.referenceId = this.route.snapshot.queryParams['referenceId'];
    this.purchasedService.getPurchasedData(this.referenceId).subscribe(result => {
      this.data = result;
    });
  }
}
