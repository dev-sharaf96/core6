import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Output() showpopup = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  showDialog(status) {
    this.showpopup.emit(status);
  }
}
