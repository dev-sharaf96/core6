import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalPoliciesMessageComponent } from './renewal-policies-message.component';

describe('RenewalPoliciesMessageComponent', () => {
  let component: RenewalPoliciesMessageComponent;
  let fixture: ComponentFixture<RenewalPoliciesMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalPoliciesMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalPoliciesMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
