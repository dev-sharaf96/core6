import { TestBed } from '@angular/core/testing';

import { ApproveMoiService } from './approve-moi.service';

describe('ApproveMoiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApproveMoiService = TestBed.get(ApproveMoiService);
    expect(service).toBeTruthy();
  });
});
