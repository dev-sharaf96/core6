import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyNotificationLogComponent } from './policy-notification-log.component';

describe('PolicyNotificationLogComponent', () => {
  let component: PolicyNotificationLogComponent;
  let fixture: ComponentFixture<PolicyNotificationLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyNotificationLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyNotificationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
