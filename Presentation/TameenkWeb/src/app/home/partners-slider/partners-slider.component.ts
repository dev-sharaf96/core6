import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-partners-slider',
  templateUrl: './partners-slider.component.html',
  styleUrls: ['./partners-slider.component.css']
})
export class PartnersSliderComponent implements OnInit {
  sliderConfig;
  slides = [
    { img: 'assets/imgs/insurerlogos/Sagr.png', alt: 'AlSagr Insurance' },
    { img: 'assets/imgs/insurerlogos/Solidarity.png', alt: 'سوليدرتي للتأمين' },
    { img: 'assets/imgs/insurerlogos/Alalamiya.png', alt: 'العالمية للتأمين' },
    { img: 'assets/imgs/insurerlogos/MedGulf.png', alt: 'ميدغلف للتأمين' },
    { img: 'assets/imgs/insurerlogos/GGI.png', alt: 'شركه الخليجيه للتأمين' },
    { img: 'assets/imgs/insurerlogos/ACIG.png', alt: 'أسيج للتأمين' },
    { img: 'assets/imgs/insurerlogos/ArabianShield.png', alt: 'الدرع العربي للتأمين' },
    { img: 'assets/imgs/insurerlogos/Ahlia.png', alt: 'الأهلية للتأمين' },
    { img: 'assets/imgs/insurerlogos/AICC.png', alt: 'العربية للتأمين' },
    { img: 'assets/imgs/insurerlogos/TUIC.png', alt: 'الاتحاد التجاري للتأمين' },
    { img: 'assets/imgs/insurerlogos/Tawuniya.png', alt: 'التعاونية للتأمين' },
    { img: 'assets/imgs/insurerlogos/Wala.png', alt: 'ولاء للتأمين' },
    { img: 'assets/imgs/insurerlogos/Salama.png', alt: 'سلامه للتأمين' },
    { img: 'assets/imgs/insurerlogos/GulfUnion.png', alt: 'اتحاد الخليج للتأمين التعاوني' },
    { img: 'assets/imgs/insurerlogos/UCA.png', alt: 'المتحده للتامين التعاوني' },
  ];







  constructor() { }

  ngOnInit() {
    $(function () {
      (<any>jQuery('.partners-slider')).slick({
        dots: false,
        rtl: true,
        slidesToShow: 7,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: document.getElementById('prev-comp'),
        prevArrow: document.getElementById('next-comp'),
        appendDots: $('.arrows-move'),
        swipeToSlide: true,
        infinite: true,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 6
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            arrows: false
          }
        }
        ]
      });
    });
  }
}
