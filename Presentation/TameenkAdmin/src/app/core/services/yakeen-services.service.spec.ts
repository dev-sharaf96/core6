import { TestBed } from '@angular/core/testing';

import { YakeenServicesService } from './yakeen-services.service';

describe('YakeenServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YakeenServicesService = TestBed.get(YakeenServicesService);
    expect(service).toBeTruthy();
  });
});
