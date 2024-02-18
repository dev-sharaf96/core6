import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BCareWithdrawalComponent } from './bcare-withdrawal.component';

describe('BCareWithdrawalComponent', () => {
  let component: BCareWithdrawalComponent;
  let fixture: ComponentFixture<BCareWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BCareWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BCareWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
