import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoleaseUsersComponent } from './autolease-users.component';

describe('AutoleaseUsersComponent', () => {
  let component: AutoleaseUsersComponent;
  let fixture: ComponentFixture<AutoleaseUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoleaseUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoleaseUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
