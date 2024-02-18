import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YakeenCityCenterListingComponent } from './yakeen-city-center-listing.component';

describe('YakeenCityCenterListingComponent', () => {
  let component: YakeenCityCenterListingComponent;
  let fixture: ComponentFixture<YakeenCityCenterListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YakeenCityCenterListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YakeenCityCenterListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
