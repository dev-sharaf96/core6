import { TestBed } from '@angular/core/testing';

import { AutoleaseService } from './autolease.service';

describe('AutoleaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoleaseService = TestBed.get(AutoleaseService);
    expect(service).toBeTruthy();
  });
});
