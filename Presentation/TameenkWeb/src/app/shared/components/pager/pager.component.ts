import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Output() paging = new EventEmitter();
  index = 1;
  pageSize = 5;
  totalPages: number;
  pages;
  constructor() { }

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.pages = Array.from(Array(this.totalPages).keys());
  }
  setPage(i) {
    this.index = i;
    this.paging.emit(`&pageIndx=${i - 1}&pageSize=${this.pageSize}`);
  }
}
