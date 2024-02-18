import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMakerDetailsComponent } from './vehicle-maker-details.component';

describe('VehicleMakerDetailsComponent', () => {
  let component: VehicleMakerDetailsComponent;
  let fixture: ComponentFixture<VehicleMakerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleMakerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleMakerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
