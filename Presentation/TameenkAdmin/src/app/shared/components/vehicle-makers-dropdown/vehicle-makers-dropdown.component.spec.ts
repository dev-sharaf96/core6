import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMakersDropdownComponent } from './vehicle-makers-dropdown.component';

describe('VehicleMakersDropdownComponent', () => {
  let component: VehicleMakersDropdownComponent;
  let fixture: ComponentFixture<VehicleMakersDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMakersDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMakersDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
