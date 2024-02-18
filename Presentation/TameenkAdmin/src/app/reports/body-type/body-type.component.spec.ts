import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTypeComponent } from './body-type.component';
import { DropdownModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { VehicleService, LocalizationService } from '../../core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('BodyTypeComponent', () => {
  let component: BodyTypeComponent;
  let fixture: ComponentFixture<BodyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyTypeComponent ],
      imports: [ BrowserAnimationsModule, DropdownModule, FormsModule, HttpClientModule, RouterTestingModule, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })],
      providers: [VehicleService, LocalizationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
