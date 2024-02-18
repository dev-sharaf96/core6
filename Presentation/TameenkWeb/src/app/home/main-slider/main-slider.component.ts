import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalizationService } from 'src/app/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css']
})
export class MainSliderComponent implements OnInit, OnDestroy {
  isEnglish;
  constructor(private _localizationService: LocalizationService) { }

  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().id === 2;
    $(function() {
      $('#slider.slides > div,.slider-steps .item').show();
      (<any>jQuery('.slider-imgs')).slick({
        dots: false,
        rtl: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
      });
    });
  }
  ngOnDestroy() {
    (<any>jQuery('.top-slider, .slider-imgs')).slick('slickPause');
  }

}
