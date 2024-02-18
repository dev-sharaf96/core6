import { Component, OnInit } from '@angular/core';
import Slideout from 'slideout';
import { LocalizationService } from 'src/app/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  slideout: Slideout;
  isEnglish: boolean;
  constructor(private _localizationService: LocalizationService) { }
  ngOnInit() {
    this.isEnglish = this._localizationService.getCurrentLanguage().id === 2;
        this.slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'side': this.isEnglish ? 'left' : 'right'
    });
  }
  slidout() {
    this.slideout.close();
  }
}
