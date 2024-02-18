import { TestBed, inject } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizationService } from '.';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonResponse, IIdNamePairModel } from '../models';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('vehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [VehicleService,
        LocalizationService
      ]
    });
  });

  it('should be created', (done) => {
    let service = TestBed.get(VehicleService);
    expect(service).toBeTruthy();
    done();
  });

  it('getVehicleBodyTypes should return data', (done) => {
    let service: VehicleService = TestBed.get(VehicleService);
    service.getVehicleBodyTypes(0, Number.MAX_SAFE_INTEGER).subscribe((data) => {
      expect(data.data.length).toBeGreaterThanOrEqual(0);
      done();
    },
      (error) => {
        done();
      }
    );
  });

  it('getVehicleMakers should return data', (done) => {
    let service: VehicleService = TestBed.get(VehicleService);
    service.getVehicleMakers(0, Number.MAX_SAFE_INTEGER).subscribe((data) => {
      expect(data.data.length).toBeGreaterThanOrEqual(0);
      done();
    },
      (error) => {
        done();
      }
    );
  });

  it('getVehicleMakerModels should return data', (done) => {
    let service: VehicleService = TestBed.get(VehicleService);
    service.getVehicleMakerModels(1, 0, Number.MAX_SAFE_INTEGER).subscribe((data) => {
      expect(data.data.length).toBeGreaterThanOrEqual(0);
      done();
    },
      (error) => {
        done();
      }
    );
  });


  it('getVehicleMakerModels with fake maker code should return no elements', (done) => {
    let service: VehicleService = TestBed.get(VehicleService);
    service.getVehicleMakerModels(-1111, 0, Number.MAX_SAFE_INTEGER).subscribe((data) => {
      expect(data.data.length).toEqual(0);
      done();
    },
      (error: CommonResponse<boolean>) => {
        done();
      }
    );
  });


  it('getVehicleMakerModels with should return 4 elements with maker code = 1', (done) => {
    let service: VehicleService = TestBed.get(VehicleService);
    service.getVehicleMakerModels(1, 0, Number.MAX_SAFE_INTEGER).subscribe((data) => {
      expect(data.data.length).toEqual(4);
      done();
    },
      (error: CommonResponse<boolean>) => {
        done();
      }
    );
  });

});
