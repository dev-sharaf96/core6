import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tbl-info',
  templateUrl: './tbl-info.component.html',
  styleUrls: ['./tbl-info.component.css']
})
export class TblInfoComponent implements OnInit {
  @Output() marked = new EventEmitter();
  agreementCheckbox = false;
  constructor() { }

  ngOnInit() {
  }
  checkagreement(e) {
    this.marked.emit(e.target.checked);
  }
}
