import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-refund-confirm',
  templateUrl: './refund-confirm.component.html',
  styleUrls: ['./refund-confirm.component.css']
})
export class RefundConfirmComponent implements OnInit, OnDestroy {
  referenceId: string;
  @Input() showConfirm: Subject<string>;
  @Output() close = new EventEmitter();
  @Output() refundConfirmed = new EventEmitter();
  visible: boolean = false;
  constructor() { }

  ngOnInit() {
    // listen to the caller to show the component
    if (this.showConfirm) {
      this.showConfirm.subscribe(data => {
        this.referenceId = data;
        this.visible = true;
      });
    }
  }
  ngOnDestroy() {
    if (this.showConfirm) {
      this.showConfirm.unsubscribe();
    }
  }

  closePopup() {
    this.visible = false;
    this.close.emit();
  }
  refund() {
    this.visible = false;
    this.refundConfirmed.emit(this.referenceId);
  }
}
