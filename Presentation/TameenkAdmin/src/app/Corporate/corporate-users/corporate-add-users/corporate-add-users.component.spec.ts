import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAddUsersComponent } from './corporate-add-users.component';

describe('CorporateAddUsersComponent', () => {
  let component: CorporateAddUsersComponent;
  let fixture: ComponentFixture<CorporateAddUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAddUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
