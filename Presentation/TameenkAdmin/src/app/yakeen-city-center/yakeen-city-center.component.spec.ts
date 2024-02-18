import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YakeenCityCenterComponent } from './yakeen-city-center.component';

describe('YakeenCityCenterComponent', () => {
  let component: YakeenCityCenterComponent;
  let fixture: ComponentFixture<YakeenCityCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YakeenCityCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YakeenCityCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
