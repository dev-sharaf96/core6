import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// import ngx-translate and the http loader
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from './core';
import { StartupService } from './core/services';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptor } from './core/helpers';
import { HttpCancelInterceptor } from './core/helpers';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCancelInterceptor, multi: true },
    StartupService,
    // Provider for APP_INITIALIZER
    { provide: APP_INITIALIZER, useFactory: startupServiceFactory, deps: [StartupService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
