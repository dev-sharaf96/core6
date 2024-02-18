import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPlateComponent } from './car-plate.component';

describe('CarPlateComponent', () => {
  let component: CarPlateComponent;
  let fixture: ComponentFixture<CarPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
