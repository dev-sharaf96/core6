import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleModelsDropdownComponent } from './vehicle-models-dropdown.component';

describe('VehicleModelsDropdownComponent', () => {
  let component: VehicleModelsDropdownComponent;
  let fixture: ComponentFixture<VehicleModelsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleModelsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleModelsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
