import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
@Input() title;
@Input() ref;
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      // OPEN popup
      $('[data-popup-open]').on('click', function (e) {
        const targetedPopupClass = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targetedPopupClass + '"]').fadeIn(350);
        e.preventDefault();
      });
      // CLOSE popup
      $('[data-popup-close]').on('click', function (e) {
        const targetedPopupClass = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targetedPopupClass + '"]').fadeOut(350);
        e.preventDefault();
      });
      $(document).on('click', function (e) {
        if ($(e.target).is('.popup')) {
          if (!$(e.target).is('#plain-popup')) {
            $('[data-popup]').fadeOut(350);
          }
        }
      });
    });
  }

}
