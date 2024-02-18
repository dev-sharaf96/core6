import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMakerComponent } from './vehicle-maker.component';

describe('VehicleMakerComponent', () => {
  let component: VehicleMakerComponent;
  let fixture: ComponentFixture<VehicleMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
