import { TestBed } from '@angular/core/testing';

import { AdminPolicyService } from './admin-policy.service';

describe('AdminPolicyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPolicyService = TestBed.get(AdminPolicyService);
    expect(service).toBeTruthy();
  });
});
