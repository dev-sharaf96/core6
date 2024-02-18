import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAccountUsersComponent } from './corporate-account-users.component';

describe('CorporateAccountUsersComponent', () => {
  let component: CorporateAccountUsersComponent;
  let fixture: ComponentFixture<CorporateAccountUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAccountUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAccountUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
