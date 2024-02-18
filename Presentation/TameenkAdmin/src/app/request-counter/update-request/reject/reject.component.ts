import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css']
})
export class RejectComponent implements OnInit {
@Output() close = new EventEmitter();
@Output() reject = new EventEmitter();
  constructor() { }

  ngOnInit() { }
  closePopup() {
    this.close.emit();
  }
  rejectRequest() {
    this.reject.emit(2);
  }
}
