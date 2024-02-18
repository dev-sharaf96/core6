import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VehicleService, LocalizationService, PolicyService } from '../core';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [VehicleService, LocalizationService,PolicyService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



//   it('loadVehicleMakers should load vehicle makers', async () => {
//     fixture.detectChanges(); // ngOnInit()
//     let response = await component.loadVehicleMakers();
// console.log('test');
// console.log(response);
// expect(1).toBe(1);
//     // fixture.whenStable().then(() => { // wait for async getQuote
//     //   fixture.detectChanges();        // update view with quote
//     //   expect(component.allVehicleMakers.length).toBeGreaterThan(0);
//     // });
//   });

});
