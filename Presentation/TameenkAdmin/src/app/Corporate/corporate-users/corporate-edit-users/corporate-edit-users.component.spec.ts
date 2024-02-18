import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateEditUsersComponent } from './corporate-edit-users.component';

describe('CorporateEditUsersComponent', () => {
  let component: CorporateEditUsersComponent;
  let fixture: ComponentFixture<CorporateEditUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateEditUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
