import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLimitComponent } from './vehicle-limit.component';

describe('VehicleLimitComponent', () => {
  let component: VehicleLimitComponent;
  let fixture: ComponentFixture<VehicleLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
