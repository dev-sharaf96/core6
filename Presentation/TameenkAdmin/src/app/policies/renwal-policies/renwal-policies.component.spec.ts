import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenwalPoliciesComponent } from './renwal-policies.component';

describe('RenwalPoliciesComponent', () => {
  let component: RenwalPoliciesComponent;
  let fixture: ComponentFixture<RenwalPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenwalPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenwalPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
