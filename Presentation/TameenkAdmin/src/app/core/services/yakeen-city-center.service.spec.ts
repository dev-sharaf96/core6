import { TestBed } from '@angular/core/testing';

import { YakeenCityCenterService } from './yakeen-city-center.service';

describe('YakeenCityCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YakeenCityCenterService = TestBed.get(YakeenCityCenterService);
    expect(service).toBeTruthy();
  });
});
