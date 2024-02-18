import { TestBed } from '@angular/core/testing';

import { AdminPagesService } from './admin-pages.service';

describe('AdminPagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPagesService = TestBed.get(AdminPagesService);
    expect(service).toBeTruthy();
  });
});
