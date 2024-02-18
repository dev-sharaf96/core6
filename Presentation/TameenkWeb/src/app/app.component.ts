import { Component, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from './core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loader = true;
  constructor(private _router: Router, private _localizationService: LocalizationService, private cdRef: ChangeDetectorRef) {
    _localizationService.configure();
    _router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader = true;
    }
    if (event instanceof NavigationEnd) {
      this.loader = false;
    }
    if (event instanceof NavigationCancel) {
      this.loader = false;
    }
    if (event instanceof NavigationError) {
      this.loader = false;
    }
    this.cdRef.detectChanges();
  }
}
