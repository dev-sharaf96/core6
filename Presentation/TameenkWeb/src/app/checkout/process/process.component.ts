import { Component, OnInit, Input } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  @Input() qtRqstExtrnlId;
  @Input() referenceId;
  subClass;
  isAdditionalInfo = false;
  isPaymentMethod = false;
  constructor(private _router: Router) { }

  ngOnInit() {
    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.subClass = event.url.includes('payment-method') ? 'payment-method' : '';
      }
    });
  }
}
