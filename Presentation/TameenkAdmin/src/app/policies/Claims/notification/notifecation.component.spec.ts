import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifecationComponent } from './notifecation.component';

describe('NotifecationComponent', () => {
  let component: NotifecationComponent;
  let fixture: ComponentFixture<NotifecationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifecationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifecationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
