import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TameenkUserComponent } from './tameenk-user.component';

describe('TameenkUserComponent', () => {
  let component: TameenkUserComponent;
  let fixture: ComponentFixture<TameenkUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TameenkUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TameenkUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
