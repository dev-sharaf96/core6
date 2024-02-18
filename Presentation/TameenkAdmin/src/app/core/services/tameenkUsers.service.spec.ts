import { TestBed } from '@angular/core/testing';

import { TameenkUsersService } from './tameenkUsers.service';

describe('TameenkUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TameenkUsersService = TestBed.get(TameenkUsersService);
    expect(service).toBeTruthy();
  });
});
