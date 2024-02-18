import { TestBed } from '@angular/core/testing';

import { VehicleMakerService } from './vehicle-maker.service';

describe('VehicleMakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleMakerService = TestBed.get(VehicleMakerService);
    expect(service).toBeTruthy();
  });
});
