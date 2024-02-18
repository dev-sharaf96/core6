import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgServiceRequestTimeComponent } from './avg-service-request-time.component';

describe('AvgServiceRequestTimeComponent', () => {
  let component: AvgServiceRequestTimeComponent;
  let fixture: ComponentFixture<AvgServiceRequestTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgServiceRequestTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgServiceRequestTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
