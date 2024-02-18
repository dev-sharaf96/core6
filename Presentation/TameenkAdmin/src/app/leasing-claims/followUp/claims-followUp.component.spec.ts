import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsFollowUpComponent } from './claims-followUp.component';

describe('ClaimsFollowUpComponent', () => {
  let component: ClaimsFollowUpComponent;
  let fixture: ComponentFixture<ClaimsFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
