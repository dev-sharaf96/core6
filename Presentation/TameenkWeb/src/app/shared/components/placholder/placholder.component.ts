import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-placholder',
  templateUrl: './placholder.component.html',
  styleUrls: ['./placholder.component.css']
})
export class PlacholderComponent implements OnInit {
@Input() width;
@Input() height;

  constructor() { }

  ngOnInit() { }

}
