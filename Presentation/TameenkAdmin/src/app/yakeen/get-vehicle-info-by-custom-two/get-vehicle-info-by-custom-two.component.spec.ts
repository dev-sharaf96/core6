import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetVehicleInfoByCustomTwoComponent } from './get-vehicle-info-by-custom-two.component';

describe('GetVehicleInfoByCustomTwoComponent', () => {
  let component: GetVehicleInfoByCustomTwoComponent;
  let fixture: ComponentFixture<GetVehicleInfoByCustomTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetVehicleInfoByCustomTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetVehicleInfoByCustomTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
