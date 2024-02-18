import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.tabs li').on('click', function () {
        $('#' + $(this).data('link')).addClass('active').siblings().removeClass('active');
        $(this).removeClass('not-now').siblings().addClass('not-now');
        $('html, body').animate({
          scrollTop: $('#' + $(this).data('link')).offset().top - 160
        }, 1000);
      });
      $('.top-slider a, .scroll-down a').on('click', function (e) {
        e.preventDefault();
        if ($(this).attr('href') !== '#') {
          $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 160
          }, 1000);
        }
      });
    });
  }

}
