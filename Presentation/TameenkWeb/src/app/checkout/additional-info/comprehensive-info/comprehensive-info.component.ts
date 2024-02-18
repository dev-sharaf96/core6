import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { CheckoutResponse } from 'src/app/core';
@Component({
  selector: 'app-comprehensive-info',
  templateUrl: './comprehensive-info.component.html',
  styleUrls: ['./comprehensive-info.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ComprehensiveInfoComponent implements OnInit {
  @Input() checkoutModel: CheckoutResponse;
  @Output() marked = new EventEmitter();
  imgAgreementCheckbox = false;
  agreementCheckbox = false;
  constructor() { }

  ngOnInit() {
    $('.fileupload input[type=file]').on('change', function () {
      const that = <HTMLInputElement>this;
      const oFReader = new FileReader();
      oFReader.readAsDataURL($(that)[0].files[0]);
      oFReader.onload = function (oFREvent: FileReaderEvent) {
          $(that).closest('div').find('.preview-upload')
          .html('<img src="' + oFREvent.target.result + '" style="border: solid 1px #22d022;" />');
      };
      $('[src*="' + $(that).attr('target') + '"]').show();
  });
  }
  checkagreement(e) {
    this.agreementCheckbox = e.target.checked;
    if (this.agreementCheckbox) {
      if (this.imgAgreementCheckbox) {
        this.marked.emit(true);
      }
    } else {
      this.marked.emit(false);
    }
  }

  checkImgAgreement(e) {
    this.imgAgreementCheckbox = e.target.checked;
    if (this.imgAgreementCheckbox) {
      if (this.agreementCheckbox) {
        this.marked.emit(true);
      }
    } else {
      this.marked.emit(false);
    }
  }
}
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
