import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsEditComponent } from './checkouts-edit.component';

describe('CheckoutsEditComponent', () => {
  let component: CheckoutsEditComponent;
  let fixture: ComponentFixture<CheckoutsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
