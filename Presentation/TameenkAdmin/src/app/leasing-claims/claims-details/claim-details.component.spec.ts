import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsDetailsComponent } from './claim-details.component';

describe('ClaimsDetailsComponent', () => {
  let component: ClaimsDetailsComponent;
  let fixture: ComponentFixture<ClaimsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});