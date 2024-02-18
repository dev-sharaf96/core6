import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NajmWithPolicyResponseTimeComponent } from './najm-with-policy-response-time.component';

describe('NajmWithPolicyResponseTimeComponent', () => {
  let component: NajmWithPolicyResponseTimeComponent;
  let fixture: ComponentFixture<NajmWithPolicyResponseTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NajmWithPolicyResponseTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NajmWithPolicyResponseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
