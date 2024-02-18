import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  isEnglish;
  constructor(private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().id === 2;
    $(document).ready(function () {
      (<any>jQuery('.slider-steps')).slick({
        dots: false,
        rtl: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        nextArrow: document.getElementById('prev-step'),
        prevArrow: document.getElementById('next-step'),
        swipeToSlide: false
      });
    });
  }
}
