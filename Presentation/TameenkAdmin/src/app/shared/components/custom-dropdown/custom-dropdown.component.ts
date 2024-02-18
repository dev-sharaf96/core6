import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  IIdNamePairModel,
} from "src/app/core";

@Component({
  selector: "app-custom-dropdown",
  templateUrl: "./custom-dropdown.component.html",
  styleUrls: ["./custom-dropdown.component.css"],
})
export class CustomDropdownComponent implements OnInit {
  @Input() selectedValue;
  @Input() options: IIdNamePairModel[] = [];

  @Output() selectedValueChange = new EventEmitter();
  stat: IIdNamePairModel = new IIdNamePairModel();
  
  constructor() {}
  ngOnInit() {}

  changed() {
    this.selectedValue = this.stat.id;
    this.selectedValueChange.emit(this.selectedValue);
  }
}
