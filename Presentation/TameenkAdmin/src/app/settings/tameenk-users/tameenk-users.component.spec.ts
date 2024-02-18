import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TameenkUsersComponent } from './tameenk-users.component';

describe('TameenkUsersComponent', () => {
  let component: TameenkUsersComponent;
  let fixture: ComponentFixture<TameenkUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TameenkUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TameenkUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
