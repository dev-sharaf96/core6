import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedPoliciesWithFilterComponent } from './repeated-policies-with-filter.component';

describe('RepeatedPoliciesWithFilterComponent', () => {
  let component: RepeatedPoliciesWithFilterComponent;
  let fixture: ComponentFixture<RepeatedPoliciesWithFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatedPoliciesWithFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatedPoliciesWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
