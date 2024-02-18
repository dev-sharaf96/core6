import { TestBed } from '@angular/core/testing';

import { WareefService } from './wareef.service';

describe('WareefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WareefService = TestBed.get(WareefService);
    expect(service).toBeTruthy();
  });
});
