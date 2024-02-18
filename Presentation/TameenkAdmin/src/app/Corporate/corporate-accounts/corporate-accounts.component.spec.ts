import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAccountsComponent } from './corporate-accounts.component';

describe('CorporateAccountsComponent', () => {
  let component: CorporateAccountsComponent;
  let fixture: ComponentFixture<CorporateAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
