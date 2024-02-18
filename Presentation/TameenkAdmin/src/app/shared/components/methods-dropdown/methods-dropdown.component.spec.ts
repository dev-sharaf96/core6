import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsDropdownComponent } from './methods-dropdown.component';

describe('MethodsDropdownComponent', () => {
  let component: MethodsDropdownComponent;
  let fixture: ComponentFixture<MethodsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
